package com.simonekouters.recipes;

import com.simonekouters.recipes.ingredient.Ingredient;
import com.simonekouters.recipes.ingredient.IngredientRepository;
import com.simonekouters.recipes.recipe.Recipe;
import com.simonekouters.recipes.recipe.RecipeRepository;
import com.simonekouters.recipes.recipeingredient.RecipeIngredient;
import com.simonekouters.recipes.recipeingredient.RecipeIngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    @Override
    public void run(String... args) throws Exception {
        if (recipeRepository.count() == 0) {
            Recipe recipe1 = new Recipe("Apple pie");
            Recipe recipe2 = new Recipe("Tomato soup");
            recipeRepository.saveAll(List.of(recipe1, recipe2));
        }

        if (recipeIngredientRepository.count() == 0) {
            RecipeIngredient recipeIngredient1 = new RecipeIngredient(new Ingredient("Salt"), 10, "grams");
            RecipeIngredient recipeIngredient2 = new RecipeIngredient(new Ingredient("Sugar"), 100, "grams");
            recipeIngredientRepository.saveAll(List.of(recipeIngredient1, recipeIngredient2));
        }
    }
}
