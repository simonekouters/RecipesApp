import { useState } from 'react';
import './App.css';
import RecipesList from './components/RecipesList/RecipesList';
import Recipe from './components/Recipe/Recipe';
import { Routes, Route, useNavigate } from "react-router-dom";
import RecipeForm from './components/RecipeForm/RecipeForm';

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
        <Route path="/add-recipe" element={<RecipeForm API_URL={API_URL} recipes={recipes} setRecipes={setRecipes} navigate={navigate} />} />
      </Routes>
    </div>
  )
}

export default App;
