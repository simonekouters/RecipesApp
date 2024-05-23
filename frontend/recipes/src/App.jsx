import { useState } from 'react';
import './App.css';
import RecipesList from './components/RecipesList/RecipesList';
import Recipe from './components/Recipe/Recipe';
import AddRecipe from './components/AddRecipe/AddRecipe';
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const API_URL = "http://localhost:8080/recipes";
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1 onClick={() => navigate("/")}>Recipes</h1>
      <Routes>
        <Route path="/" element={<RecipesList navigate={navigate} API_URL={API_URL} recipes={recipes} setRecipes={setRecipes} />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/add-recipe" element={<AddRecipe API_URL={API_URL} recipes={recipes} setRecipes={setRecipes} />} />
      </Routes>
    </div>
  )
}

export default App;
