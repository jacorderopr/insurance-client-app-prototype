// app/clients/page.tsx
"use client"; // This page will fetch data client-side

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ClientSummary } from '@/interfaces/client';
import ClientListItem from '@/components/ClientListItem';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/clients`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ClientSummary[] = await response.json();
        setClients(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch clients:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (isLoading) return <p>Loading clients...</p>;
  if (error) return <p>Error loading clients: {error}</p>;
  if (clients.length === 0) return <p>No clients found.</p>;

  return (
    <div>
      <h1>Client List</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {clients.map((client) => (
          <Link href={`/clients/${client.id}`} key={client.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ClientListItem client={client} backendUrl={process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8080'} />
          </Link>
        ))}
      </div>
    </div>
  );
}