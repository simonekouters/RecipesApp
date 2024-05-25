package com.simonekouters.recipes.recipe;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.simonekouters.recipes.recipeingredient.RecipeIngredient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    @Column(length = 5000)
    private List<String> steps = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private final Set<RecipeIngredient> ingredients = new HashSet<>();

    public Recipe(String title, List<String> steps) {
        this.title = title;
        this.steps = steps;
    }

    public void addIngredient(RecipeIngredient ingredient) {
        ingredient.setRecipe(this);
        ingredients.add(ingredient);
    }
}
