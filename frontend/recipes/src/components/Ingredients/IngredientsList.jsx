import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'

function IngredientsList({ ingredients, setIngredients, API_URL }) {
  const URL = `${API_URL}/ingredients`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(URL);
        const data = response.data;
        if (data && data.length > 0) {
          setIngredients(data);
        }
      } catch (error) {
        console.error("Error fetching ingredients: ", error)
      }
    }
    getData();
  }, []);


  return (
    <>
      {ingredients && (
        ingredients.map(ingredient => {
          const formattedIngredient = `${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
          return <li key={ingredient.id}>{formattedIngredient}</li>
        })
      )}
    </>
  );
}

export default IngredientsList;