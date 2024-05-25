package com.simonekouters.recipes.recipeingredient;

import com.simonekouters.recipes.ingredient.IngredientDto;

public record RecipeIngredientDto(Integer quantity, String unit, IngredientDto ingredient, Long id) {
    public static RecipeIngredientDto from(RecipeIngredient recipeIngredient) {
        return new RecipeIngredientDto(recipeIngredient.getQuantity(), recipeIngredient.getUnit(),
                IngredientDto.from(recipeIngredient.getIngredient()), recipeIngredient.getId());
    }
}
