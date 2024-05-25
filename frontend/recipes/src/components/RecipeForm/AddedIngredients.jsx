import React from 'react';

function AddedIngredients({ recipe, setRecipe }) {
  function handleDeleteIngredient(ingredientToDelete) {
    const updatedIngredients = recipe.ingredients.filter((i) => i != ingredientToDelete);
    setRecipe({...recipe, ingredients: updatedIngredients});
  }

  return (
    <ul>
      {recipe.ingredients.map((ingredient, index) => {
        const formattedIngredient = `${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
        return (
          <div className="added-ingredients" key={ingredient + index}>
            <li>{formattedIngredient}</li>
            <button onClick={() => handleDeleteIngredient(ingredient)}>x</button>
          </div>
        );
      })}
    </ul>
  );
}

export default AddedIngredients;

