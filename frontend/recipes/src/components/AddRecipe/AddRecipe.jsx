import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';

function AddRecipe({ API_URL, recipes, setRecipes }) {
  return (
    <>
      <h2>Add a recipe</h2>
      <RecipeForm API_URL={API_URL} recipes={recipes} setRecipes={setRecipes} />
    </>
  )
}

export default AddRecipe;