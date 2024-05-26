import React, { useState } from 'react';
import axios from 'axios';

function useRecipeForm({ API_URL, recipes, setRecipes, navigate }) {
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
    
    return {
        recipe,
        setRecipe,
        newIngredient,
        newStep,
        setNewIngredient,
        setNewStep,
        handleAddIngredient,
        handleAddStep,
        handleSaveRecipe
    };
}

export default useRecipeForm;