// app/clients/[clientId]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this for App Router
import { Client } from '@/interfaces/client';
import ClientDetailView from '@/components/ClientDetailView';
import ProfilePictureUploader from '@/components/ProfilePictureUploader';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8080';


export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.clientId as string; // clientId from the URL

  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientDetails = async () => {
    if (!clientId) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/clients/${clientId}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error(`Client not found.`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Client = await response.json();
      setClient(data);
    } catch (e: any) {
      setError(e.message);
      console.error("Failed to fetch client details:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientDetails();
  }, [clientId]);

  const handlePictureUpdate = (newPicturePath: string) => {
    // Optimistically update the client's profile picture path
    if (client) {
      setClient({ ...client, profilePicturePath: newPicturePath });
    }
    // Or refetch client details to get the most up-to-date info
    // fetchClientDetails();
  };

  if (isLoading) return <p>Loading client details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!client) return <p>Client data not available.</p>;

  return (
    <div>
      <ClientDetailView client={client} backendUrl={BACKEND_BASE_URL} />
      <ProfilePictureUploader
        clientId={client.id}
        apiUrl={`${API_URL}/clients/${client.id}/profile-picture`}
        onUploadSuccess={handlePictureUpdate}
      />
    </div>
  );
}