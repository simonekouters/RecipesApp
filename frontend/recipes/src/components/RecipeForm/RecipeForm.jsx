import axios from 'axios';
import React, { useState } from 'react';
import AddedIngredients from './AddedIngredients';
import AddedSteps from './AddedSteps';

function RecipeForm({ recipes, setRecipes, API_URL }) {
  const [recipe, setRecipe] = useState({ title: "" });
  const [newIngredient, setNewIngredient] = useState({ ingredient: { name: "" }, unit: "", quantity: "" });
  const [ingredients, setIngredients] = useState([]);
  const [newStep, setNewStep] = useState("");
  const [steps, setSteps] = useState([]);


  function handleAddIngredient(e) {
    e.preventDefault();
    const ingredientToAdd = { ...newIngredient };
    setIngredients([...ingredients, ingredientToAdd]);
    setNewIngredient({ ingredient: { name: "" }, unit: "", quantity: "" });
  }

  function handleAddStep(e) {
    e.preventDefault();
    setSteps([...steps, newStep]);
    setNewStep("");
  }

  async function handleSaveRecipe(e) {
    e.preventDefault();
    if (!recipe.title.trim()) {
      return;
    }
    console.log(ingredients);

    try {
      const response = await axios.post(API_URL, { title: recipe.title, steps: steps, ingredients: ingredients });
      const newRecipe = response.data;
      setRecipes([...recipes, newRecipe]);
      console.log(recipes);
      setRecipe({ title: "" });
      setIngredients([]);
      setSteps([]);
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  }

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
      <AddedIngredients ingredients={ingredients} setIngredients={setIngredients} />

      <label>Method</label>
      <input 
        type="text" 
        value={newStep}
        placeholder="Add a step"
        onChange={(e) => setNewStep(e.target.value)}
        spellCheck="false"
      />
      <button onClick={handleAddStep}>Add Step</button>
      <AddedSteps steps={steps} setSteps={setSteps} />

      <button type="submit" onClick={handleSaveRecipe}>Save recipe</button>
    </form>
  );
}

export default RecipeForm;