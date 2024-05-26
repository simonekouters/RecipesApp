import React from 'react';
import ListManager from './ListManager';

function AddedSteps({ recipe, setRecipe }) {
  function handleDeleteStep(stepToDelete) {
    const updatedSteps = recipe.steps.filter((step) => step != stepToDelete);
    setRecipe({...recipe, steps: updatedSteps});
  }

  return (
    <ListManager 
      items={recipe.steps}
      onDelete={handleDeleteStep}
      renderItem={(step, index) => `Step ${index + 1} - ${step}`}
      itemKey={(step, index) => `${step}-${index}`}
    />
  );
}

export default AddedSteps;

