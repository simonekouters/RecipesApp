import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../constants";

function Recipe() {
    const [recipe, setRecipe] = useState({
        title: "",
        ingredients: [],
        steps: [],
    });
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios(apiUrl + "/" + id);
                const data = response.data;
                if (data) {
                    setRecipe({
                        title: data.title || "",
                        ingredients: data.ingredients || [],
                        steps: data.steps || [],
                    });
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        getData();
    }, [apiUrl]);

    return (
        <>
            <h2>{recipe.title}</h2>

            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient) => {
                    return (
                        <li key={ingredient.id}>
                            {ingredient.quantity} {ingredient.unit}{" "}
                            {ingredient.ingredient.name}
                        </li>
                    );
                })}
            </ul>

            <h3>Method</h3>
            <ul>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{`Step ${index + 1} - ${step}`}</li>
                ))}
            </ul>
        </>
    );
}

export default Recipe;
