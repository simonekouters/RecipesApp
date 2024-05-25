import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

function Recipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const { id } = useParams();
  const API_URL = `http://localhost:8080/recipes/${id}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(API_URL);
        const data = response.data;
        if (data) {
          setTitle(data.title || "");
          setIngredients(data.ingredients || []);
          setSteps(data.steps || []);
          
        }
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    getData();
  }, [API_URL]);


  return (
    <>
      <h2>{title}</h2>

      <h3>Ingredients</h3>
      <ul>
        {ingredients.map(ingredient => {
          const formattedIngredient = `${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
          return <li key={ingredient.id}>{formattedIngredient}</li>;
        })}
      </ul>

      <h3>Method</h3>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{`Step ${index + 1} - ${step}`}</li>
        ))}
      </ul>
    </>
  );
}

export default Recipe;