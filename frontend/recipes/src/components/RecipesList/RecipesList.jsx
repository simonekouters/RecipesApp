import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'

function RecipesList({API_URL, recipes, setRecipes}) {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(API_URL);
        const data = response.data;
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes: ", error)
      }
    }
    getData();
  }, []);


  return (
    recipes.map(recipe => {
      return <li key={recipe.id}>{recipe.title}</li>
    }) 
  )
}

export default RecipesList;