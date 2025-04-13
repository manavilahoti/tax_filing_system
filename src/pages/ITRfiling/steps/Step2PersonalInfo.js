import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2PersonalInfo = () => {
  const { register } = useFormContext();

  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Full Name*</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Date of Birth*</label>
          <input
            type="date"
            {...register('dob', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email*</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Mobile Number*</label>
          <input
            type="tel"
            {...register('mobile', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2PersonalInfo;