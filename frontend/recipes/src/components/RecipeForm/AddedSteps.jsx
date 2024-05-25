import React from 'react';

function AddedSteps({ steps, setSteps }) {
  function handleDeleteStep(stepToDelete) {
    const updatedSteps = steps.filter((step) => step != stepToDelete);
    setSteps(updatedSteps);
  }

  return (
    <ul>
      {steps.map((step, index) => (
        <div className="added-steps" key={step + index}>
          <li>{`Step ${index + 1} - ${step}`}</li>
          <button onClick={() => handleDeleteStep(step)}>x</button>
        </div>
      ))}
    </ul>
  );
}

export default AddedSteps;

