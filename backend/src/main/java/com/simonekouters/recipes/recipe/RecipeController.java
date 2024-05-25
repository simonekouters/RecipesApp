package com.simonekouters.recipes.recipe;

import com.simonekouters.recipes.ingredient.Ingredient;
import com.simonekouters.recipes.ingredient.IngredientRepository;
import com.simonekouters.recipes.recipeingredient.RecipeIngredient;
import com.simonekouters.recipes.recipeingredient.RecipeIngredientDto;
import com.simonekouters.recipes.recipeingredient.RecipeIngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin("${myApp.cors}")
@RestController
@RequiredArgsConstructor
@RequestMapping("recipes")
public class RecipeController {
    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final IngredientRepository ingredientRepository;

    @GetMapping
    public Iterable<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable long id) {
        var possiblyExistingRecipe = recipeRepository.findById(id);
        if (possiblyExistingRecipe.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Recipe recipe = possiblyExistingRecipe.get();
        return ResponseEntity.ok().body(recipe);
    }

    @GetMapping("{id}/ingredients")
    public ResponseEntity<Iterable<RecipeIngredient>> getRecipeIngredients(@PathVariable long id) {
        var possiblyExistingRecipe = recipeRepository.findById(id);
        if (possiblyExistingRecipe.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Recipe recipe = possiblyExistingRecipe.get();
        var recipeIngredients = recipe.getIngredients();
        return ResponseEntity.ok().body(recipeIngredients);
    }

    @PostMapping
    public ResponseEntity<?> addRecipe(@RequestBody RecipeDto recipeDto, UriComponentsBuilder ucb) {
        if (recipeDto.title() == null) {
            return ResponseEntity.badRequest().body("Title can't be null");
        }
        if (recipeDto.recipeIngredients().isEmpty()) {
            return ResponseEntity.badRequest().body("A recipe needs ingredients");
        }
        if (recipeDto.steps().isEmpty()) {
            return ResponseEntity.badRequest().body("A recipe needs steps");
        }

        Recipe newRecipe = new Recipe(recipeDto.title());
        recipeRepository.save(newRecipe);

        for(String step : recipeDto.steps()) {
            newRecipe.addStep(step);
        }

        for (RecipeIngredientDto recipeIngredientDto : recipeDto.recipeIngredients()) {
            if (recipeIngredientDto.ingredient() == null) {
                return ResponseEntity.badRequest().body("Ingredient can't be null");
            }

            var possiblyExistingIngredient = ingredientRepository.findByName(recipeIngredientDto.ingredient().name());

            Ingredient ingredient;
            if (possiblyExistingIngredient.isPresent()) {
                ingredient = possiblyExistingIngredient.get();
            } else {
                if (recipeIngredientDto.ingredient().name() == null) {
                    return ResponseEntity.badRequest().body("Ingredient name can't be null");
                }
                ingredient = new Ingredient(recipeIngredientDto.ingredient().name());
            }

            if (recipeIngredientDto.quantity() == null) {
                return ResponseEntity.badRequest().body("Quantity should be a number");
            }
            if (recipeIngredientDto.unit() == null) {
                return ResponseEntity.badRequest().body("Unit can't be null");
            }

            RecipeIngredient newRecipeIngredient = new RecipeIngredient(ingredient, recipeIngredientDto.quantity(), recipeIngredientDto.unit(), newRecipe);
            newRecipe.addIngredient(newRecipeIngredient);
        }
        recipeRepository.save(newRecipe);

        URI locationOfNewRecipe = ucb.path("/recipes/{id}").buildAndExpand(newRecipe.getId()).toUri();
        return ResponseEntity.created(locationOfNewRecipe).body(RecipeDto.from(newRecipe));
    }
}
