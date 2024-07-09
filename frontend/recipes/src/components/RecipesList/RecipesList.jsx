import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../constants";

function RecipesList({ recipes, setRecipes, navigate }) {
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios(apiUrl);
                const data = response.data;
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes: ", error);
            }
        };
        getData();
    }, []);

    return (
        <>
            {recipes && (
                <>
                    {recipes.map((recipe) => (
                        <div
                            className="recipe"
                            onClick={() => navigate(`/recipes/${recipe.id}`)}
                            key={recipe.id}
                        >
                            {recipe.title}
                        </div>
                    ))}
                    <button
                        className="add-button"
                        onClick={() => navigate("/add-recipe")}
                    >
                        Add Recipe
                    </button>
                </>
            )}
        </>
    );
}

export default RecipesList;
