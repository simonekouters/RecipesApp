import axios from 'axios';
import React, { useState } from 'react'

function IngredientForm({ ingredients, setIngredients, API_URL }) {
  const URL = `${API_URL}/ingredients`;
  const[ingredient, setIngredient] = useState({name: ""});

  function handleInputChange(e) {
    setIngredient({...ingredient, name: e.target.value});
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!ingredient.name.trim()) {
      return;
    }
    try {
      const response = await axios.post(URL, {name: ingredient.name});
      const newIngredient = response.data;
      setIngredients([...ingredients, newIngredient]);
      setIngredient({name: ""});
    } catch (error) {
      console.error("Error adding ingredient: ", error);
    }
  }

  return (
    <form action="submit" onSubmit={handleAdd}>
      <input
        type="text"
        value={ingredient.name}
        placeholder="Add an ingredient"
        onChange={handleInputChange}
        spellCheck="false"
        autoFocus
      />
      <button>+</button>
    </form>
  );
}

export default IngredientForm;