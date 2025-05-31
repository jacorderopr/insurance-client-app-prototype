// components/ProfilePictureUploader.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

interface ProfilePictureUploaderProps {
  clientId: number;
  apiUrl: string; // Full API endpoint for upload
  onUploadSuccess: (newPicturePath: string) => void;
}

export default function ProfilePictureUploader({ clientId, apiUrl, onUploadSuccess }: ProfilePictureUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(apiUrl, { // apiUrl already includes /clients/{clientId}/profile-picture
        method: 'POST',
        body: formData,
        // Headers are not strictly necessary for FormData with fetch,
        // but 'Accept' can be useful.
        // headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.text(); // Or response.json() if backend sends JSON error
        throw new Error(`Upload failed: ${response.status} ${errorData}`);
      }

      const newProfilePicturePath = await response.text(); // Backend returns the new path as plain text
      setSuccessMessage("Profile picture updated successfully!");
      onUploadSuccess(newProfilePicturePath); // Callback with the new path
      setFile(null); // Clear the file input
      if(document.getElementById('fileInput')) { // Reset file input
        (document.getElementById('fileInput') as HTMLInputElement).value = "";
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h4>Update Profile Picture</h4>
      <form onSubmit={handleSubmit}>
        <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || isUploading} style={{ marginLeft: '10px' }}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}