package com.simonekouters.recipes.recipe;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("recipes")
public class RecipeController {
    private final RecipeRepository recipeRepository;

    @GetMapping
    public List<Recipe> getAllRecipes() {
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

    @PostMapping
    public ResponseEntity<?> addRecipe(@RequestBody Recipe recipe, UriComponentsBuilder ucb) {
        if (recipe.getTitle() == null) {
            return ResponseEntity.badRequest().body("Title can't be null");
        }
        Recipe newRecipe = new Recipe(recipe.getTitle());
        recipeRepository.save(newRecipe);

        URI locationOfNewRecipe = ucb.path("/recipes/{id}").buildAndExpand(newRecipe.getId()).toUri();
        return ResponseEntity.created(locationOfNewRecipe).body(newRecipe);
    }
}
