package com.simonekouters.recipes.recipeingredient;

import com.simonekouters.recipes.ingredient.Ingredient;
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
    private long Id;
    private Integer quantity;
    private String unit;
    @OneToOne(cascade = CascadeType.ALL)
    private Ingredient ingredient;

    public RecipeIngredient(Ingredient ingredient, Integer quantity, String unit) {
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit;
    }
}
