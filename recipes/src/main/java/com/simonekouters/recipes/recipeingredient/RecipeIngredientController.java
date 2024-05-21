package com.simonekouters.recipes.recipeingredient;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@CrossOrigin("${myApp.cors}")
@RequiredArgsConstructor
@RestController
@RequestMapping("recipeingredients")
public class RecipeIngredientController {
    private final RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping
    public Iterable<RecipeIngredient> getAllIngredients() {
        return recipeIngredientRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<RecipeIngredient> getIngredient(@PathVariable long id) {
        var possiblyExistingRecipeIngredient = recipeIngredientRepository.findById(id);
        if (possiblyExistingRecipeIngredient.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        RecipeIngredient recipeIngredient = possiblyExistingRecipeIngredient.get();
        return ResponseEntity.ok().body(recipeIngredient);
    }

    @PostMapping
    public ResponseEntity<?> addRecipeIngredient(@RequestBody RecipeIngredient recipeIngredient, UriComponentsBuilder ucb) {
        if (recipeIngredient.getIngredient() == null) {
            return ResponseEntity.badRequest().body("Ingredient can't be null");
        }
        if (recipeIngredient.getQuantity() == null) {
            return ResponseEntity.badRequest().body("Quantity can't be null");
        }
        if (recipeIngredient.getUnit() == null) {
            return ResponseEntity.badRequest().body("Unit can't be null");
        }
        RecipeIngredient newRecipeIngredient = new RecipeIngredient(recipeIngredient.getIngredient(), recipeIngredient.getQuantity(), recipeIngredient.getUnit());

        recipeIngredientRepository.save(newRecipeIngredient);

        URI locationOfNewRecipeIngredient = ucb.path("/recipeingredients/{id}").buildAndExpand(newRecipeIngredient.getId()).toUri();
        return ResponseEntity.created(locationOfNewRecipeIngredient).body(newRecipeIngredient);
    }
}
