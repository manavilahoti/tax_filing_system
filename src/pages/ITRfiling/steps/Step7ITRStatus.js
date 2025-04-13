import React from 'react';

const Step7ITRStatus = () => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg text-center">
      <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-semibold mb-2">ITR Successfully Filed!</h2>
        <p>Your ITR has been submitted successfully.</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg text-left">
        <h3 className="font-medium mb-2">ITR Status Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>ITR Filing Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-green-600 font-medium">Submitted</span>
          </div>
          <div className="flex justify-between">
            <span>Acknowledgement Number:</span>
            <span>ACK-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step7ITRStatus;