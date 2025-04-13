import React from 'react';

const NavigationButtons = ({ step, onBack, onContinue }) => {
  return (
    <div className="flex justify-between mt-6">
      {step > 1 && step < 7 && (
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back
        </button>
      )}
      
      {step < 6 ? (
        <button
          type="button"
          onClick={onContinue}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
        >
          Continue
        </button>
      ) : step === 6 ? (
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto"
        >
          Submit ITR
        </button>
      ) : null}
    </div>
  );
};

export default NavigationButtons;