import React from 'react';

function AddedIngredients({ ingredients, setIngredients }) {
    function handleDeleteIngredient(ingredientToDelete) {
        const updatedIngredients = ingredients.filter((i) => i != ingredientToDelete);
        setIngredients(updatedIngredients);
    }

    return ingredients.map(ingredient => {
        const formattedIngredient = `${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
        return (
            <div className="added-ingredients">
                <li key={ingredient.ingredient.name}>{formattedIngredient}</li>
                <button onClick={() => handleDeleteIngredient(ingredient)}>x</button>
            </div>
        )
    });
}

export default AddedIngredients;

