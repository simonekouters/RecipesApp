package com.simonekouters.recipes.ingredient;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@CrossOrigin("${myApp.cors}")
@RequiredArgsConstructor
@RestController
@RequestMapping("ingredients")
public class IngredientController {
    private final IngredientRepository ingredientRepository;

    @GetMapping
    public Iterable<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Ingredient> getIngredient(@PathVariable long id) {
        var possiblyExistingIngredient = ingredientRepository.findById(id);
        if (possiblyExistingIngredient.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Ingredient ingredient = possiblyExistingIngredient.get();
        return ResponseEntity.ok().body(ingredient);
    }

    @PostMapping
    public ResponseEntity<?> addIngredient(@RequestBody Ingredient ingredient, UriComponentsBuilder ucb) {
        if (ingredient.getName() == null) {
            return ResponseEntity.badRequest().body("Ingredient name can't be null");
        }
        Ingredient newIngredient = new Ingredient(ingredient.getName());
        ingredientRepository.save(newIngredient);

        URI locationOfNewIngredient = ucb.path("/ingredients/{id}").buildAndExpand(newIngredient.getId()).toUri();
        return ResponseEntity.created(locationOfNewIngredient).body(newIngredient);
    }
}
