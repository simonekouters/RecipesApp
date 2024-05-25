import React from 'react';

function AddedSteps({ recipe, setRecipe }) {
  function handleDeleteStep(stepToDelete) {
    const updatedSteps = recipe.steps.filter((step) => step != stepToDelete);
    setRecipe({...recipe, steps: updatedSteps});
  }

  return (
    <ul>
      {recipe.steps.map((step, index) => (
        <div className="added-steps" key={step + index}>
          <li>{`Step ${index + 1} - ${step}`}</li>
          <button onClick={() => handleDeleteStep(step)}>x</button>
        </div>
      ))}
    </ul>
  );
}

export default AddedSteps;

