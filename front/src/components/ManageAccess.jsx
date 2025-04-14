import React, { useState, useEffect } from 'react';
import { encryptWithRSA, importPublicKey } from '../utils/crypto';
import { handleerror, handlesuccess } from '../pages/toast';

export default function ManageAccess() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [patientFiles, setPatientFiles] = useState([]);

    // Fetch pending access requests and patient files
    useEffect(() => {
        fetchRequests();
        fetchPatientFiles();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/patient/access-requests', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            handleerror(error.message);
        }
    };

    const fetchPatientFiles = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching patient files...');
            const response = await fetch('http://localhost:5000/patient/files', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch files');
            }
            
            const data = await response.json();
            console.log('Fetched patient files:', data);
            setPatientFiles(data);
        } catch (error) {
            console.error('Error fetching patient files:', error);
            handleerror(error.message);
        }
    };

    const handleFileSelection = (requestId, fileId) => {
        setSelectedFiles(prev => ({
            ...prev,
            [requestId]: {
                ...prev[requestId],
                [fileId]: !prev[requestId]?.[fileId]
            }
        }));
    };

    // Handle request response (approve/reject)
    const handleRequest = async (requestId, status) => {
        setLoading(true);

        try {
            const request = requests.find(r => r._id === requestId);
            const token = localStorage.getItem('token');

            if (status === 'approved') {
                // Get selected files for this request
                const selectedFileIds = Object.entries(selectedFiles[requestId] || {})
                    .filter(([_, isSelected]) => isSelected)
                    .map(([fileId]) => fileId);

                console.log('Selected file IDs:', selectedFileIds);

                if (selectedFileIds.length === 0) {
                    throw new Error('Please select at least one file to share');
                }

                // Validate doctor's public key
                if (!request.doctorId?.publicKey) {
                    throw new Error('Doctor\'s public key not found. Please ask the doctor to update their profile with a public key.');
                }

                // For each selected file
                const encryptedKeys = await Promise.all(selectedFileIds.map(async fileId => {
                    console.log('Processing file:', fileId);
                    const fileKeyStr = localStorage.getItem(`fileKey_${fileId}`);
                    console.log('File key from localStorage:', fileKeyStr);
                    
                    if (!fileKeyStr) {
                        // Try to get the key from the Records component's storage
                        const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
                        const fileData = uploadedFiles.find(f => f.url.includes(fileId));
                        if (!fileData) {
                            throw new Error(`Encryption key not found for file ${fileId}. Please re-upload the file.`);
                        }
                        
                        // Store the key in the correct format
                        const key = new Uint8Array(12).fill(0); // Default key
                        const iv = Uint8Array.from(atob(fileData.iv), c => c.charCodeAt(0));
                        localStorage.setItem(`fileKey_${fileId}`, JSON.stringify({
                            key: Array.from(key),
                            iv: Array.from(iv)
                        }));
                    }

                    let fileKey;
                    try {
                        fileKey = JSON.parse(fileKeyStr);
                        console.log('Parsed file key:', fileKey);
                    } catch (e) {
                        console.error('Error parsing file key:', e);
                        throw new Error(`Invalid key format for file ${fileId}. Please re-upload the file.`);
                    }

                    if (!fileKey.key || !fileKey.iv) {
                        throw new Error(`Missing key or IV for file ${fileId}. Please re-upload the file.`);
                    }

                    // Convert key and IV from array format to Uint8Array
                    const key = new Uint8Array(fileKey.key);
                    const iv = new Uint8Array(fileKey.iv);

                    // Import doctor's public key
                    console.log('Doctor public key:', request.doctorId.publicKey);
                    try {
                        const doctorPublicKey = await importPublicKey(request.doctorId.publicKey);

                        // Encrypt AES key with doctor's public key
                        const encryptedKey = await encryptWithRSA(doctorPublicKey, JSON.stringify({
                            key: Array.from(key),
                            iv: Array.from(iv)
                        }));

                        console.log('Successfully encrypted key for file:', fileId);

                        return {
                            fileId,
                            encryptedKey
                        };
                    } catch (e) {
                        console.error('Error with public key:', e);
                        throw new Error('Invalid doctor public key format. Please ask the doctor to update their profile.');
                    }
                }));

                console.log('All encrypted keys:', encryptedKeys);

                // Send approval with encrypted keys
                const response = await fetch(`http://localhost:5000/patient/access-requests/${requestId}/respond`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        status,
                        encryptedKeys
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to approve request');
                }
            } else {
                // Send rejection
                const response = await fetch(`http://localhost:5000/patient/access-requests/${requestId}/respond`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to reject request');
                }
            }

            handlesuccess(`Request ${status} successfully`);
            // Remove the handled request from the list
            setRequests(requests.filter(r => r._id !== requestId));
            // Clear selected files for this request
            setSelectedFiles(prev => {
                const newState = { ...prev };
                delete newState[requestId];
                return newState;
            });
        } catch (error) {
            handleerror(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-green-200 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-green-700">Manage Access Requests</h2>

                {requests.length === 0 ? (
                    <p className="text-gray-600">No pending access requests</p>
                ) : (
                    <div className="space-y-6">
                        {requests.map(request => (
                            <div key={request._id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-green-700">
                                            Dr. {request.doctorId.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {request.doctorId.email}
                                        </p>
                                        <p className="text-gray-600">
                                            Specialty: {request.doctorId.specialization}
                                        </p>
                                        <p className="text-gray-500 text-sm mt-2">
                                            Requested: {new Date(request.createdAt).toLocaleDateString()}
                                        </p>
                                        {request.message && (
                                            <p className="mt-2 text-gray-700 bg-gray-50 p-3 rounded">
                                                Message: {request.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t pt-4">
                                        <h4 className="font-medium text-gray-700 mb-2">Select files to share:</h4>
                                        <div className="space-y-2">
                                            {patientFiles.length === 0 ? (
                                                <p className="text-gray-500">No files available to share</p>
                                            ) : (
                                                patientFiles.map(file => (
                                                    <label key={file.cid} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFiles[request._id]?.[file.cid] || false}
                                                            onChange={() => handleFileSelection(request._id, file.cid)}
                                                            className="rounded text-green-600 focus:ring-green-500"
                                                        />
                                                        <span className="text-gray-700">{file.fileName}</span>
                                                    </label>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4 border-t">
                                        <button
                                            onClick={() => handleRequest(request._id, 'approved')}
                                            disabled={loading || patientFiles.length === 0}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Processing...' : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleRequest(request._id, 'rejected')}
                                            disabled={loading}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Processing...' : 'Reject'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 