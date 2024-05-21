import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import Recipe from '../Recipe/Recipe';
import { Routes, Route, useNavigate } from "react-router-dom";

function RecipesList({API_URL, recipes, setRecipes}) {
  const navigate = useNavigate();

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
          {recipes.map(recipe => <div onClick={() => navigate(`/recipes/${recipe.id}`)} key={recipe.id}>{recipe.title}</div>)}
          <Routes>
              <Route path="/recipes/:id" element={<Recipe />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default RecipesList;