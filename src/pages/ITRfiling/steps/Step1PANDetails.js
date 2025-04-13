import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiUpload, FiFile, FiCheck } from 'react-icons/fi';

const Step1PanDetails = ({ showUploadModal, uploadedForm16, autoFilledFields = [] }) => {
  const { register, watch } = useFormContext();
  const panValue = watch('pan');
  const nameValue = watch('name');
  const dobValue = watch('dob');
  const employerValue = watch('employer');

  const fieldLabels = {
    pan: 'PAN Number',
    name: 'Full Name',
    dob: 'Date of Birth',
    employer: 'Employer Name',
    salary: 'Total Salary',
    hra: 'HRA Amount',
    section80C: 'Section 80C Deduction',
    section80D: 'Section 80D Deduction'
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">PAN Details</h2>
      
      {autoFilledFields.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">Auto-filled from Form 16:</h3>
          <ul className="list-disc pl-5 text-sm">
            {autoFilledFields
              .filter(field => ['pan', 'name', 'dob', 'employer'].includes(field))
              .map(field => (
                <li key={field}>{fieldLabels[field] || field}</li>
              ))
            }
          </ul>
          <p className="text-xs mt-2 text-gray-600">
            Please verify all auto-filled information
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">PAN Number*</label>
          <input
            type="text"
            {...register('pan', { 
              required: 'PAN is required',
              pattern: {
                value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
                message: 'Invalid PAN format'
              }
            })}
            className={`w-full p-2 border rounded uppercase ${
              autoFilledFields.includes('pan') ? 'bg-blue-50' : ''
            }`}
            placeholder="ABCDE1234F"
            maxLength="10"
            style={{ textTransform: 'uppercase' }}
          />
          {autoFilledFields.includes('pan') && (
            <p className="text-xs text-blue-600 mt-1">
              Auto-filled from Form 16
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Financial Year*</label>
          <select
            {...register('financialYear', { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Full Name*</label>
          <input
            type="text"
            {...register('name', { required: 'Full name is required' })}
            className={`w-full p-2 border rounded ${
              autoFilledFields.includes('name') ? 'bg-blue-50' : ''
            }`}
          />
          {autoFilledFields.includes('name') && (
            <p className="text-xs text-blue-600 mt-1">
              Auto-filled from Form 16
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Date of Birth*</label>
          <input
            type="date"
            {...register('dob', { required: 'Date of birth is required' })}
            className={`w-full p-2 border rounded ${
              autoFilledFields.includes('dob') ? 'bg-blue-50' : ''
            }`}
          />
          {autoFilledFields.includes('dob') && (
            <p className="text-xs text-blue-600 mt-1">
              Auto-filled from Form 16
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-2">Employer Name</label>
          <input
            type="text"
            {...register('employer')}
            className={`w-full p-2 border rounded ${
              autoFilledFields.includes('employer') ? 'bg-blue-50' : ''
            }`}
          />
          {autoFilledFields.includes('employer') && (
            <p className="text-xs text-blue-600 mt-1">
              Auto-filled from Form 16
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="button"
          onClick={showUploadModal}
          className="text-blue-500 flex items-center hover:text-blue-700 transition-colors"
        >
          {uploadedForm16 ? (
            <>
              <FiFile className="h-5 w-5 mr-1 text-green-500" />
              <span>Form 16 Uploaded</span>
            </>
          ) : (
            <>
              <FiUpload className="h-5 w-5 mr-1" />
              <span>Upload Form 16 to Auto-fill</span>
            </>
          )}
        </button>
        
        {uploadedForm16 && (
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <FiCheck className="mr-1" />
            Form 16 uploaded successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1PanDetails;