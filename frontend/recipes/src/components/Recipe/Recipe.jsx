import React, { useState } from 'react'
import IngredientsList from '../Ingredients/IngredientsList';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();
  const API_URL = `http://localhost:8080/recipes/${id}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(API_URL);
        const data = response.data;
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe: ", error)
      }
    }
    getData();
  }, [API_URL]);

  return (
    <>
      {recipe && (
        <>
          <h2>{recipe.title}</h2>
          <h3>Ingredients</h3>
          <IngredientsList ingredients={ingredients} setIngredients={setIngredients} API_URL={API_URL} />
        </>
      )}  
    </>
  )
}

export default Recipe;