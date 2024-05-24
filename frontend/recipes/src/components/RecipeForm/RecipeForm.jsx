import axios from 'axios';
import React, { useState } from 'react';

function RecipeForm({ recipes, setRecipes, API_URL }) {
  const [recipe, setRecipe] = useState({ title: "" });
  const [newIngredient, setNewIngredient] = useState({ ingredient: { name: "" }, unit: "", quantity: "" });
  const [ingredients, setIngredients] = useState([]);

  function handleAddIngredient(e) {
    e.preventDefault();
    const ingredientToAdd = { ...newIngredient };
    setIngredients([...ingredients, ingredientToAdd]);
    setNewIngredient({ ingredient: { name: "" }, unit: "", quantity: "" });
  }


  async function handleSaveRecipe(e) {
    e.preventDefault();
    if (!recipe.title.trim()) {
      return;
    }
    console.log(ingredients);

    try {
      const response = await axios.post(API_URL, { title: recipe.title, ingredients: ingredients });
      const newRecipe = response.data;
      setRecipes([...recipes, newRecipe]);
      console.log(recipes);
      setRecipe({ title: "" });
      setNewIngredient({ ingredient: { name: "" }, unit: "", quantity: "" });
      setIngredients([]);
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  }

  const addedIngredients = ingredients.map(ingredient => {
    const formattedIngredient = `${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
    return <li key={ingredient.ingredient.name}>{formattedIngredient}</li>
  });

  return (
    <form>
      <label>Title</label>
      <input
        type="text"
        value={recipe.title}
        placeholder="Add a recipe title"
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        spellCheck="false"
        autoFocus
      />
      <h3>Ingredients</h3>
      <label>Ingredient</label>
      <input
        type="text"
        value={newIngredient.ingredient.name}
        placeholder="Add an ingredient"
        onChange={(e) => setNewIngredient({ ...newIngredient, ingredient: { name: e.target.value } })}
        spellCheck="false"
        autoFocus
      />
      <label>Unit</label>
      <select value={newIngredient.unit}
        onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}>
        <option value="none">-</option>
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="l">L</option>
        <option value="ml">ml</option>
        <option value="tsp">tsp.</option>
        <option value="tbs">tbs.</option>
      </select>

      <label>Quantity</label>
      <input
        type="text"
        value={newIngredient.quantity}
        placeholder="Add quantity"
        onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
        spellCheck="false"
        autoFocus
      />

      <button onClick={handleAddIngredient}>Add</button>
      <ul>{addedIngredients}</ul>

      <button type="submit" onClick={handleSaveRecipe}>Save recipe</button>
    </form>
  );
}

export default RecipeForm;