package com.simonekouters.recipes.recipe;

import com.simonekouters.recipes.recipeingredient.RecipeIngredientDto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public record RecipeDto(String title, List<String> steps, List<RecipeIngredientDto> ingredients, Long id) {
    public static RecipeDto from(Recipe recipe) {
       List<RecipeIngredientDto> ingredients = recipe.getIngredients().stream().map(RecipeIngredientDto::from).toList();
       return new RecipeDto(recipe.getTitle(), recipe.getSteps(), ingredients, recipe.getId());
    }
}
