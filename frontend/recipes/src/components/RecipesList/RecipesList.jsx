import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'

function RecipesList({API_URL, recipes, setRecipes, navigate}) {
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
    <>
      {recipes && (
        <>
          {recipes.map(recipe => (
            <div onClick={() => navigate(`/recipes/${recipe.id}`)} key={recipe.id}>
              {recipe.title}
            </div>
          ))}
          <button onClick={() => navigate("/add-recipe")}>Add Recipe</button>
        </>
      )}
    </>
  );
}


export default RecipesList;