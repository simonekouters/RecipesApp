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
}
