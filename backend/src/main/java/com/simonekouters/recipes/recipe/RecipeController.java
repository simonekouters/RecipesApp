package com.simonekouters.recipes.recipe;

import com.simonekouters.recipes.ingredient.Ingredient;
import com.simonekouters.recipes.ingredient.IngredientRepository;
import com.simonekouters.recipes.recipeingredient.RecipeIngredient;
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
    public ResponseEntity<?> addRecipe(@RequestBody Recipe recipe, UriComponentsBuilder ucb) {
        if (recipe.getTitle() == null) {
            return ResponseEntity.badRequest().body("Title can't be null");
        }
        if (recipe.getIngredients().isEmpty()) {
            return ResponseEntity.badRequest().body("A recipe needs ingredients");
        }

        Recipe newRecipe = new Recipe(recipe.getTitle());
        for (RecipeIngredient recipeIngredient : recipe.getIngredients()) {
            if (recipeIngredient.getIngredient() == null) {
                return ResponseEntity.badRequest().body("Ingredient can't be null");
            }

            var possiblyExistingIngredient = ingredientRepository.findByName(recipeIngredient.getIngredient().getName());

            Ingredient ingredient;
            if (possiblyExistingIngredient.isPresent()) {
                ingredient = possiblyExistingIngredient.get();
            } else {
                if (recipeIngredient.getIngredient().getName() == null) {
                    return ResponseEntity.badRequest().body("Ingredient name can't be null");
                }
                ingredient = new Ingredient(recipeIngredient.getIngredient().getName());
            }
            if (recipeIngredient.getQuantity() == null) {
                return ResponseEntity.badRequest().body("Quantity can't be null");
            }
            if (!recipeIngredient.getQuantity().toString().matches("-?\\d+(\\.\\d+)?")) {
                return ResponseEntity.badRequest().body("Quantity must be a number");
            }
            if (recipeIngredient.getUnit() == null) {
                return ResponseEntity.badRequest().body("Unit can't be null");
            }

            RecipeIngredient newRecipeIngredient = new RecipeIngredient(ingredient, recipeIngredient.getQuantity(), recipeIngredient.getUnit(), recipe);
            newRecipe.addIngredient(newRecipeIngredient);
        }
        recipeRepository.save(newRecipe);

        URI locationOfNewRecipe = ucb.path("/recipes/{id}").buildAndExpand(newRecipe.getId()).toUri();
        return ResponseEntity.created(locationOfNewRecipe).body(newRecipe);
    }
}
