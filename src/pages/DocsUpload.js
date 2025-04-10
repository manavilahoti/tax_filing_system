import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
const DocumentUpload = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile || !documentName) {
      alert('Please select a file and enter a document name');
      return;
    }

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      const newDocument = {
        id: Date.now(),
        name: documentName,
        file: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2) + ' KB',
        uploadedAt: new Date().toLocaleString(),
      };

      setDocuments([...documents, newDocument]);
      setDocumentName('');
      setSelectedFile(null);
      setUploadProgress(0);
      clearInterval(interval);
    }, 3000);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Document Upload</h1>
          
          {/* Upload Form */}
          <div className="mb-8 p-6 border border-gray-200 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Document Name</label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter document name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select File</label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Choose File
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {selectedFile && (
                  <span className="ml-4 text-gray-700">{selectedFile.name}</span>
                )}
              </div>
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
            
            <button
              onClick={handleUpload}
              disabled={uploadProgress > 0 && uploadProgress < 100}
              className={`px-4 py-2 rounded ${uploadProgress > 0 && uploadProgress < 100 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              Upload Document
            </button>
          </div>
          
          {/* Documents List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
            {documents.length === 0 ? (
              <p className="text-gray-500">No documents uploaded yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border">Document Name</th>
                      <th className="py-2 px-4 border">File Name</th>
                      <th className="py-2 px-4 border">Size</th>
                      <th className="py-2 px-4 border">Uploaded At</th>
                      <th className="py-2 px-4 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border">{doc.name}</td>
                        <td className="py-2 px-4 border">{doc.file}</td>
                        <td className="py-2 px-4 border">{doc.size}</td>
                        <td className="py-2 px-4 border">{doc.uploadedAt}</td>
                        <td className="py-2 px-4 border">
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;