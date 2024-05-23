import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import IngredientForm from '../IngredientForm/IngredientForm';

function AddRecipe({ API_URL, recipes, setRecipes }) {
  return (
    <>
        <h1>Add a recipe</h1>
        <RecipeForm API_URL={API_URL} recipes={recipes} setRecipes={setRecipes} />
        <IngredientForm />

    </>
  )
}

export default AddRecipe;