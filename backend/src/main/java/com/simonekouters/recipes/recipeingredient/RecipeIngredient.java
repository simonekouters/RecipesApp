package com.simonekouters.recipes.recipeingredient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.simonekouters.recipes.ingredient.Ingredient;
import com.simonekouters.recipes.recipe.Recipe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;
    private String unit;

    @ManyToOne(cascade = CascadeType.ALL)
    private Ingredient ingredient;

    @JsonBackReference
    @ManyToOne
    private Recipe recipe;

    public RecipeIngredient(Ingredient ingredient, int quantity, String unit, Recipe recipe) {
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit;
        this.recipe = recipe;
    }
}
