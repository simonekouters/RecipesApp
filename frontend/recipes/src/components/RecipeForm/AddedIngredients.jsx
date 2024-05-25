import React from 'react';

function AddedIngredients({ ingredients, setIngredients }) {
  function handleDeleteIngredient(ingredientToDelete) {
    const updatedIngredients = ingredients.filter((i) => i != ingredientToDelete);
    setIngredients(updatedIngredients);
  }

  return (
    <ul>
      {ingredients.map((ingredient, index) => {
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

