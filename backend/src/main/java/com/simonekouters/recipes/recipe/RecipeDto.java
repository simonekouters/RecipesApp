package com.simonekouters.recipes.recipe;

import com.simonekouters.recipes.recipeingredient.RecipeIngredientDto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public record RecipeDto(String title, List<String> steps, Set<RecipeIngredientDto> recipeIngredients) {
    public static RecipeDto from(Recipe recipe) {
        return new RecipeDto(recipe.getTitle(), recipe.getSteps(), recipe.getIngredients().stream()
                .map(RecipeIngredientDto::from)
                .collect(Collectors.toSet()));
    }
}
