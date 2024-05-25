package com.simonekouters.recipes.recipeingredient;

import com.simonekouters.recipes.ingredient.IngredientDto;
import com.simonekouters.recipes.recipe.RecipeDto;

public record RecipeIngredientDto(Integer quantity, String unit, IngredientDto ingredient, RecipeDto recipeDto) {
    public static RecipeIngredientDto from(RecipeIngredient recipeIngredient) {
        return new RecipeIngredientDto(recipeIngredient.getQuantity(), recipeIngredient.getUnit(),
                IngredientDto.from(recipeIngredient.getIngredient()), RecipeDto.from(recipeIngredient.getRecipe()));
    }
}
