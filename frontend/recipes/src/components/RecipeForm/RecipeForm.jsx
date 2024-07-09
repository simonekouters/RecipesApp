import React from "react";
import AddedIngredients from "./AddedIngredients";
import AddedSteps from "./AddedSteps";
import useRecipeForm from "./useRecipeForm";
import { apiUrl } from "../constants";

function RecipeForm({ recipes, setRecipes, navigate }) {
    const {
        recipe,
        setRecipe,
        newIngredient,
        newStep,
        setNewIngredient,
        setNewStep,
        handleAddIngredient,
        handleAddStep,
        handleSaveRecipe,
    } = useRecipeForm({ recipes, setRecipes, navigate });

    return (
        <>
            <h2>Add a recipe</h2>
            <form>
                <label>Title</label>
                <input
                    type="text"
                    value={recipe.title}
                    placeholder="Add a recipe title"
                    onChange={(e) =>
                        setRecipe({ ...recipe, title: e.target.value })
                    }
                    spellCheck="false"
                    autoFocus
                />
                <h3>Ingredients</h3>
                <label>Ingredient</label>
                <input
                    type="text"
                    value={newIngredient.ingredient.name}
                    placeholder="Add an ingredient"
                    onChange={(e) =>
                        setNewIngredient({
                            ...newIngredient,
                            ingredient: { name: e.target.value },
                        })
                    }
                    spellCheck="false"
                />
                <label>Unit</label>
                <select
                    value={newIngredient.unit}
                    onChange={(e) =>
                        setNewIngredient({
                            ...newIngredient,
                            unit: e.target.value,
                        })
                    }
                >
                    <option value="none">-</option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="l">L</option>
                    <option value="ml">ml</option>
                    <option value="tsp">tsp</option>
                    <option value="tbs">tbs</option>
                </select>

                <label>Quantity</label>
                <input
                    type="text"
                    value={newIngredient.quantity}
                    placeholder="Add quantity"
                    onChange={(e) =>
                        setNewIngredient({
                            ...newIngredient,
                            quantity: e.target.value,
                        })
                    }
                    spellCheck="false"
                />

                <button onClick={handleAddIngredient}>Add Ingredient</button>
                <AddedIngredients recipe={recipe} setRecipe={setRecipe} />

                <label>Method</label>
                <input
                    type="text"
                    value={newStep}
                    placeholder="Add a step"
                    onChange={(e) => setNewStep(e.target.value)}
                    spellCheck="false"
                />
                <button onClick={handleAddStep}>Add Step</button>
                <AddedSteps recipe={recipe} setRecipe={setRecipe} />

                <button type="submit" onClick={handleSaveRecipe}>
                    Save recipe
                </button>
            </form>
        </>
    );
}

export default RecipeForm;
