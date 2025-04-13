import React from 'react';
import { FiCheck } from 'react-icons/fi';

const ProgressBar = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex justify-between mb-8 relative">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isCurrent = currentStep === stepNumber;
        const isClickable = stepNumber <= currentStep + 1;
        
        return (
          <div 
            key={index} 
            className={`flex flex-col items-center z-10 group ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => isClickable && onStepClick(stepNumber)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              transition-colors duration-200
              ${isCompleted ? 'bg-green-500 hover:bg-green-600' : 
                isCurrent ? 'bg-blue-500' : 
                isClickable ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-200'} text-white`}>
              {isCompleted ? <FiCheck className="h-5 w-5" /> : stepNumber}
            </div>
            <span className={`text-xs mt-2 text-center transition-colors duration-200
              ${isCurrent ? 'font-bold text-blue-500' : 
                isCompleted ? 'text-green-600 group-hover:text-green-700' : 
                isClickable ? 'text-gray-500 group-hover:text-gray-700' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        );
      })}
      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-0">
        <div 
          className="h-1 bg-blue-500 transition-all duration-300" 
          style={{ width: `${(currentStep - 1) * (100 / (steps.length - 1))}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;