package com.simonekouters.recipes.ingredient;

public record IngredientDto(String name) {
    public static IngredientDto from(Ingredient ingredient) {
        return new IngredientDto(ingredient.getName());
    }
}
