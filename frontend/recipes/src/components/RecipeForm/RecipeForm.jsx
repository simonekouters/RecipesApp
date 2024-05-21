import axios from 'axios';
import React, { useState } from 'react'

function RecipeForm({recipes, setRecipes, API_URL}) {
  const[recipe, setRecipe] = useState({title: ""});

  function handleInputChange(e) {
    setRecipe({...recipe, title: e.target.value});
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!recipe.title.trim()) {
      return;
    }
    try {
      const response = await axios.post(API_URL, {title: recipe.title});
      const newRecipe = response.data;
      setRecipes([...recipes, newRecipe]);
      setRecipe({title: ""});
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  }

  return (
    <form action="submit" onSubmit={handleAdd}>
      <input
        type="text"
        value={recipe.title}
        placeholder="Add a recipe title"
        onChange={handleInputChange}
        spellCheck="false"
        autoFocus
      />
      <button>+</button>
    </form>
  );
}

export default RecipeForm;