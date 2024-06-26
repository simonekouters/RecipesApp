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

    @Override
    public void run(String... args) throws Exception {
        if (recipeRepository.count() == 0) {
            Recipe recipe1 = new Recipe("Apple pie");
            Recipe recipe2 = new Recipe("Tomato soup");

            RecipeIngredient recipeIngredient1 = new RecipeIngredient(new Ingredient("Salt"), 10, "grams", recipe1);
            RecipeIngredient recipeIngredient2 = new RecipeIngredient(new Ingredient("Sugar"), 100, "grams", recipe1);
            RecipeIngredient recipeIngredient3 = new RecipeIngredient(new Ingredient("Tomato"), 200, "grams", recipe2);

            recipe1.addIngredient(recipeIngredient1);
            recipe1.addIngredient(recipeIngredient2);
            recipe2.addIngredient(recipeIngredient3);

            recipe1.addStep("cut apples");
            recipe1.addStep("mix butter and sugar");
            recipe2.addStep("wash tomatoes");
            recipe2.addStep("cut tomatoes");

            recipeRepository.saveAll(List.of(recipe1, recipe2));

        }
    }
}
