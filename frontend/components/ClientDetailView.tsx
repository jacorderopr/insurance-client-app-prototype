// components/ClientDetailView.tsx
import { Client } from '@/interfaces/client';

interface ClientDetailViewProps {
  client: Client;
  backendUrl: string;
}

export default function ClientDetailView({ client, backendUrl }: ClientDetailViewProps) {
  const profilePicUrl = client.profilePicturePath
    ? `${backendUrl}${client.profilePicturePath}`
    : '/default-profile.png';

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return dateString; // return original if parsing fails
    }
  };


  return (
    <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
      <h2>{client.firstName} {client.lastName}</h2>
      <img
        src={profilePicUrl}
        alt="Profile"
        style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }}
        onError={(e) => { (e.target as HTMLImageElement).src = '/default-profile.png'; }}
      />
      <h3>Personal Information</h3>
      <p><strong>Address:</strong> {client.address || 'N/A'}</p>
      <p><strong>Date of Birth:</strong> {formatDate(client.dateOfBirth)}</p>

      <h3>Insurance Details</h3>
      <p><strong>Policy Number:</strong> {client.policyNumber || 'N/A'}</p>
      <p><strong>Policy Type:</strong> {client.policyType || 'N/A'}</p>
      <p><strong>Coverage Start Date:</strong> {formatDate(client.coverageStartDate)}</p>
      <p><strong>Coverage End Date:</strong> {formatDate(client.coverageEndDate)}</p>
    </div>
  );
}