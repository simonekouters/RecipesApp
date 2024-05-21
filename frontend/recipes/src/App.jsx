import { useState } from 'react'
import './App.css'
import RecipesList from './components/RecipesList/RecipesList'
import RecipesForm from './components/RecipeForm/RecipeForm'

function App() {
  const API_URL = "http://localhost:8080/recipes";

  const [recipes, setRecipes] = useState([]);
  return (
    <>
      <RecipesForm API_URL={API_URL} recipes={recipes} setRecipes={setRecipes} />
      <RecipesList API_URL={API_URL} recipes={recipes} setRecipes={setRecipes} />
    </>
  )
  
}

export default App;
