import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { parseForm16 } from '../../utils/Form16Parser';
import Sidebar from '../../components/sidebar/Sidebar';
import DocumentUploadModal from './DocumentUploadModal';

import ProgressBar from './common/ProgressBar';
import NavigationButtons from './common/NavigationButtons';
import Step1PanDetails from './steps/Step1PANDetails';
import Step2PersonalInfo from './steps/Step2PersonalInfo';
import Step3IncomeSources from './steps/Step3IncomeSources';
import Step4TaxSavings from './steps/Step4TaxSavings';
import Step5TaxSummary from './steps/Step5TaxSummary';
import Step6EVerification from './steps/Step6EVerification';
import Step7ITRStatus from './steps/Step7ITRStatus';

const ITRFiling = () => {
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [uploadedForm16, setUploadedForm16] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [autoFilledFields, setAutoFilledFields] = useState([]);
  const [parsingError, setParsingError] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const methods = useForm();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const steps = [
    'PAN Details',
    'Personal Information',
    'Income Sources',
    'Tax Savings',
    'Tax Summary',
    'E-Verification',
    'ITR Status'
  ];

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= step + 1) {
      setStep(stepNumber);
    }
  };

  const handleForm16Upload = async (file) => {
    try {
      setIsParsing(true);
      setParsingError(null);
      const form16Data = await parseForm16(file);
      const filledFields = [];
      
      const autoFillField = (fieldName, value) => {
        if (value !== undefined && value !== null && value !== '') {
          methods.setValue(fieldName, value);
          filledFields.push(fieldName);
        }
      };

      // Personal Information
      autoFillField('pan', form16Data.pan);
      autoFillField('name', form16Data.name);
      autoFillField('dob', form16Data.dob);
      autoFillField('employer', form16Data.employer);
      
      // Income Information
      autoFillField('salary', form16Data.salary.total);
      autoFillField('basicSalary', form16Data.salary.basic);
      autoFillField('hra', form16Data.salary.hra);
      
      // Deductions
      autoFillField('section80C', form16Data.deductions.section80C);
      autoFillField('section80D', form16Data.deductions.section80D);
      
      // Tax Information
      autoFillField('totalIncome', form16Data.tax.totalIncome());
      autoFillField('taxPayable', form16Data.tax.taxPayable());
      autoFillField('tds', form16Data.tax.tds);
      autoFillField('balanceTax', form16Data.tax.balanceTax());

      setAutoFilledFields(filledFields);
      setUploadedForm16(form16Data);

      // Add to uploaded documents
      const newDocument = {
        id: Date.now(),
        name: 'Form 16',
        file: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        uploadedAt: new Date().toLocaleString(),
      };
      setUploadedDocuments([...uploadedDocuments, newDocument]);
    } catch (error) {
      console.error('Form 16 upload error:', error);
      setParsingError(error.message);
    } finally {
      setIsParsing(false);
      setShowDocumentUpload(false);
    }
  };

  const onSubmit = (data) => {
    console.log('ITR Data:', data);
    setStep(7);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <ProgressBar 
            steps={steps} 
            currentStep={step} 
            onStepClick={handleStepClick} 
          />
          
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {step === 1 && (
                <Step1PanDetails 
                  showUploadModal={() => setShowDocumentUpload(true)}
                  uploadedForm16={uploadedForm16}
                  autoFilledFields={autoFilledFields}
                />
              )}
              
              {step === 2 && <Step2PersonalInfo autoFilledFields={autoFilledFields} />}
              {step === 3 && <Step3IncomeSources autoFilledFields={autoFilledFields} />}
              {step === 4 && <Step4TaxSavings autoFilledFields={autoFilledFields} />}
              {step === 5 && <Step5TaxSummary />}
              {step === 6 && <Step6EVerification />}
              {step === 7 && <Step7ITRStatus />}

              <NavigationButtons 
                step={step} 
                onBack={() => setStep(step - 1)} 
                onContinue={() => setStep(step + 1)} 
              />
            </form>
          </FormProvider>
        </div>
      </div>

      {showDocumentUpload && (
        <DocumentUploadModal
          onClose={() => {
            setShowDocumentUpload(false);
            setParsingError(null);
          }}
          onUpload={handleForm16Upload}
          onSelect={() => {}}
          uploadedDocuments={uploadedDocuments}
          documentType="Form 16"
          accept=".pdf"
          error={parsingError}
          isLoading={isParsing}
        />
      )}
    </div>
  );
};

export default ITRFiling;