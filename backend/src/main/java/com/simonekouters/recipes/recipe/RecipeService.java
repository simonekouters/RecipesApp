package com.simonekouters.recipes.recipe;

import com.simonekouters.recipes.exception.BadRequestException;
import com.simonekouters.recipes.ingredient.Ingredient;
import com.simonekouters.recipes.ingredient.IngredientRepository;
import com.simonekouters.recipes.recipeingredient.RecipeIngredient;
import com.simonekouters.recipes.recipeingredient.RecipeIngredientDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    public Recipe createNewRecipe(RecipeDto recipeDto) {
        validateRecipeDto(recipeDto);

        Recipe newRecipe = new Recipe(recipeDto.title());

        recipeRepository.save(newRecipe);

        for(String step : recipeDto.steps()) {
            newRecipe.addStep(step);
        }

        for (RecipeIngredientDto recipeIngredientDto : recipeDto.ingredients()) {
            Ingredient ingredient = findOrCreateIngredient(recipeIngredientDto);
            validateRecipeIngredientDto(recipeIngredientDto);
            RecipeIngredient newRecipeIngredient = new RecipeIngredient(ingredient, recipeIngredientDto.quantity(), recipeIngredientDto.unit(), newRecipe);
            newRecipe.addIngredient(newRecipeIngredient);
        }
        return recipeRepository.save(newRecipe);
    }

    public void validateRecipeDto(RecipeDto recipeDto) {
        if (recipeDto.title() == null) {
            throw new BadRequestException("Title can't be null");
        }
        if (recipeDto.ingredients().isEmpty()) {
            throw new BadRequestException("A recipe needs ingredients");
        }
        if (recipeDto.steps().isEmpty()) {
            throw new BadRequestException("A recipe needs a method with at least one step");
        }
    }

    public Ingredient findOrCreateIngredient(RecipeIngredientDto recipeIngredientDto) {
        if (recipeIngredientDto.ingredient() == null) {
            throw new BadRequestException("Ingredient can't be null");
        }

        var possiblyExistingIngredient = ingredientRepository.findByName(recipeIngredientDto.ingredient().name());

        Ingredient ingredient;
        if (possiblyExistingIngredient.isPresent()) {
            ingredient = possiblyExistingIngredient.get();
        } else {
            if (recipeIngredientDto.ingredient().name() == null) {
                throw new BadRequestException("Ingredient name can't be null");
            }
            ingredient = new Ingredient(recipeIngredientDto.ingredient().name());
        }
        return ingredient;
    }

    public void validateRecipeIngredientDto(RecipeIngredientDto recipeIngredientDto) {
        if (recipeIngredientDto.quantity() == null) {
            throw new BadRequestException("Quantity should be a number");
        }
        if (recipeIngredientDto.unit() == null) {
            throw new BadRequestException("Unit can't be null");
        }
    }
}
