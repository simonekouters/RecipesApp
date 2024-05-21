import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'

function IngredientsList({API_URL, ingredients, setIngredients}) {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(`${API_URL}/ingredients`);
        const data = response.data;
        console.log(data);
        setIngredients(data);
      } catch (error) {
        console.error("Error fetching ingredients: ", error)
      }
    }
    getData();
  }, []);


  return (
    <></>
    // ingredients.map(ingredient => {
    //   return <li key={ingredient.id}>{ingredient.name}</li>
    // }) 
  )
}

export default IngredientsList;