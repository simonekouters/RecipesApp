import axios from 'axios';
import React, { useState } from 'react';
import AddedIngredients from './AddedIngredients';
import AddedSteps from './AddedSteps';

function RecipeForm({ recipes, setRecipes, API_URL, navigate }) {
  const [recipe, setRecipe] = useState({ title: "", ingredients: [], steps: [] });
  const [newIngredient, setNewIngredient] = useState({ ingredient: { name: "" }, unit: "", quantity: "" });
  const [newStep, setNewStep] = useState("");

  function handleAddIngredient(e) {
    e.preventDefault();
    if (!newIngredient.ingredient.name.trim()) {
      alert("Ingredient name can't be empty");
      return;
    }
    if (!newIngredient.quantity.trim()) {
      alert("Quantity can't be empty");
      return;
    }
    if (isNaN(newIngredient.quantity)) {
      alert("Quantity should be a number")
      return;
    }

    const quantityValue = parseInt(newIngredient.quantity, 10);
    const ingredientToAdd = { ...newIngredient, quantity: quantityValue };
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredientToAdd] });
    setNewIngredient({ ingredient: { name: "" }, unit: "", quantity: "" });
  }

  function handleAddStep(e) {
    e.preventDefault();
    if (!newStep.trim()) {
      alert("Step can't be empty");
      return;
    }
    if (newStep.length >= 255) {
      alert("A step can't be more than 255 characters long")
      return;
    }
    setRecipe({ ...recipe, steps: [...recipe.steps, newStep] });
    setNewStep("");
  }

  async function handleSaveRecipe(e) {
    e.preventDefault();
    if (!recipe.title.trim()) {
      alert("Title can't be empty");
      return;
    }
    if (recipe.ingredients.length === 0) {
      alert("Ingredients can't be empty");
      return;
    }
    if (recipe.steps.length === 0) {
      alert("Method can't be empty");
      return;
    }

    try {
      const response = await axios.post(API_URL, { title: recipe.title, steps: recipe.steps, ingredients: recipe.ingredients });
      const newRecipe = response.data;
      setRecipes([...recipes, newRecipe]);
      setRecipe({ title: "", ingredients: [], steps: [] });
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  }

  return (
    <>
      <h2>Add a recipe</h2>
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
        />
        <label>Unit</label>
        <select value={newIngredient.unit}
          onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}>
          <option value="none">-</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="l">L</option>
          <option value="ml">ml</option>
          <option value="tsp">tsp</option>
          <option value="tbs">tbs</option>
        </select>

        <label>Quantity</label>
        <input
          type="text"
          value={newIngredient.quantity}
          placeholder="Add quantity"
          onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
          spellCheck="false"
        />

        <button onClick={handleAddIngredient}>Add Ingredient</button>
        <AddedIngredients recipe={recipe} setRecipe={setRecipe} />

        <label>Method</label>
        <input
          type="text"
          value={newStep}
          placeholder="Add a step"
          onChange={(e) => setNewStep(e.target.value)}
          spellCheck="false"
        />
        <button onClick={handleAddStep}>Add Step</button>
        <AddedSteps recipe={recipe} setRecipe={setRecipe} />

        <button type="submit" onClick={handleSaveRecipe}>Save recipe</button>
      </form>
    </>
  );
}

export default RecipeForm;