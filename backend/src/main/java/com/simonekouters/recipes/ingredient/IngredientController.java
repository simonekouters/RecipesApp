package com.simonekouters.recipes.ingredient;

import com.simonekouters.recipes.exception.BadRequestException;
import com.simonekouters.recipes.exception.NotFoundException;
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
    public IngredientDto getIngredient(@PathVariable long id) {
        var possiblyExistingIngredient = ingredientRepository.findById(id);
        if (possiblyExistingIngredient.isEmpty()) {
            throw new NotFoundException();
        }
        Ingredient ingredient = possiblyExistingIngredient.get();
        return IngredientDto.from(ingredient);
    }

    @PostMapping
    public ResponseEntity<?> addIngredient(@RequestBody Ingredient ingredient, UriComponentsBuilder ucb) {
        if (ingredient.getName() == null) {
            throw new BadRequestException("Ingredient name can't be null");
        }
        Ingredient newIngredient = new Ingredient(ingredient.getName());
        ingredientRepository.save(newIngredient);

        URI locationOfNewIngredient = ucb.path("/ingredients/{id}").buildAndExpand(newIngredient.getId()).toUri();
        return ResponseEntity.created(locationOfNewIngredient).body(newIngredient);
    }
}
