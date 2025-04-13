import React, { useState } from 'react';
import { FiUpload, FiX, FiCheck, FiFile, FiAlertCircle } from 'react-icons/fi';

const DocumentUploadModal = ({
  onClose,
  onUpload,
  onSelect,
  uploadedDocuments,
  documentType,
  accept,
  error,
  isLoading
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert(`Please select a ${documentType} file`);
      return;
    }

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    onUpload(selectedFile);
    setSelectedFile(null);
    setUploadProgress(0);
    clearInterval(interval);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload {documentType}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded flex items-start">
            <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Processing Form 16. Please wait...</p>
          </div>
        ) : (
          <>
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('upload')}
              >
                Upload New
              </button>
              {uploadedDocuments.length > 0 && (
                <button
                  className={`px-4 py-2 ${activeTab === 'existing' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('existing')}
                >
                  Choose Existing
                </button>
              )}
            </div>

            {activeTab === 'upload' ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop your {documentType} file here, or click to select
                  </p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept={accept}
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Select File
                  </label>
                  {selectedFile && (
                    <div className="mt-4 flex items-center justify-center">
                      <FiCheck className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{selectedFile.name}</span>
                    </div>
                  )}
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isLoading}
                    className={`px-4 py-2 rounded text-white ${!selectedFile || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {isLoading ? 'Processing...' : 'Upload'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-h-64 overflow-y-auto">
                  {uploadedDocuments.filter(doc => doc.name === documentType).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border-b hover:bg-gray-50">
                      <div className="flex items-center">
                        <FiFile className="text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.file} ({doc.size})</p>
                          <p className="text-xs text-gray-400">{doc.uploadedAt}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelect(doc)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadModal;