import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step6EVerification = () => {
  const { register } = useFormContext();

  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">E-Verification</h2>
      
      <div className="mb-4">
        <p className="mb-4">Verify your ITR using one of these methods:</p>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="aadhaarOtp"
              {...register('verificationMethod')}
              value="aadhaarOtp"
              className="mr-2"
            />
            <label htmlFor="aadhaarOtp">Aadhaar OTP</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="bankAccount"
              {...register('verificationMethod')}
              value="bankAccount"
              className="mr-2"
            />
            <label htmlFor="bankAccount">Bank Account Verification</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="netBanking"
              {...register('verificationMethod')}
              value="netBanking"
              className="mr-2"
            />
            <label htmlFor="netBanking">Net Banking</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6EVerification;