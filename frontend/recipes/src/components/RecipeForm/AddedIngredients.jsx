import React from 'react';
import ListManager from './ListManager';

function AddedIngredients({ recipe, setRecipe }) {
  function handleDeleteIngredient(ingredientToDelete) {
    const updatedIngredients = recipe.ingredients.filter((i) => i != ingredientToDelete);
    setRecipe({...recipe, ingredients: updatedIngredients});
  }

  return (
    <ListManager 
      items={recipe.ingredients}
      onDelete={handleDeleteIngredient}
      renderItem={(ingredient) => `${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`}
      itemKey={(ingredient, index) => ingredient + index}
    />
  );
}

export default AddedIngredients;

