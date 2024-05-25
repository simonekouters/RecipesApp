package com.simonekouters.recipes.recipeingredient;

import com.simonekouters.recipes.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@CrossOrigin("${myApp.cors}")
@RequiredArgsConstructor
@RestController
@RequestMapping("recipe-ingredients")
public class RecipeIngredientController {
    private final RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping
    public Iterable<RecipeIngredient> getAllIngredients() {
        return recipeIngredientRepository.findAll();
    }

    @GetMapping("{id}")
    public RecipeIngredientDto getIngredient(@PathVariable long id) {
        var possiblyExistingRecipeIngredient = recipeIngredientRepository.findById(id);
        if (possiblyExistingRecipeIngredient.isEmpty()) {
            throw new NotFoundException();
        }
        RecipeIngredient recipeIngredient = possiblyExistingRecipeIngredient.get();
        return RecipeIngredientDto.from(recipeIngredient);
    }
}
