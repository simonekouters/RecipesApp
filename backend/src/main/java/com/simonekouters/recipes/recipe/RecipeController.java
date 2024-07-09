package com.simonekouters.recipes.recipe;

import com.simonekouters.recipes.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
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
    private final RecipeService recipeService;

    @GetMapping
    public List<RecipeDto> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return recipes.stream().map(RecipeDto::from).toList();
    }

    @GetMapping("{id}")
    public RecipeDto getRecipe(@PathVariable long id) {
        var recipe = recipeRepository.findById(id).orElseThrow(NotFoundException::new);
        return RecipeDto.from(recipe);
    }

    @PostMapping
    public ResponseEntity<?> addRecipe(@RequestBody RecipeDto recipeDto, UriComponentsBuilder ucb) {
        Recipe newRecipe = recipeService.createNewRecipe(recipeDto);

        URI locationOfNewRecipe = ucb.path("/recipes/{id}").buildAndExpand(newRecipe.getId()).toUri();
        return ResponseEntity.created(locationOfNewRecipe).body(RecipeDto.from(newRecipe));
    }
}
