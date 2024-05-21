package com.simonekouters.recipes.recipe;

import com.simonekouters.recipes.recipeingredient.RecipeIngredient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private String title;
    @OneToMany
    private Set<RecipeIngredient> ingredients;

    public Recipe(String title) {
        this.title = title;
    }
}
