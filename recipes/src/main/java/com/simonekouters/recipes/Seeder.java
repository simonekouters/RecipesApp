package com.simonekouters.recipes;

import com.simonekouters.recipes.recipe.Recipe;
import com.simonekouters.recipes.recipe.RecipeRepository;
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
            recipeRepository.saveAll(List.of(recipe1, recipe2));
        }
    }
}
