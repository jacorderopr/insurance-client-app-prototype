// components/ClientListItem.tsx
import { ClientSummary } from '@/interfaces/client';

interface ClientListItemProps {
  client: ClientSummary;
  backendUrl: string; // Base URL of the backend for images
}

export default function ClientListItem({ client, backendUrl }: ClientListItemProps) {
  const profilePicUrl = client.profilePicturePath
    ? `${backendUrl}${client.profilePicturePath}` // Assumes backendUrl is http://localhost:8080 and path is /profile-pictures/image.jpg
    : '/default-profile.png'; // A default placeholder image in public folder

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '15px' }}>
      <img
        src={profilePicUrl}
        alt={`${client.firstName} ${client.lastName}`}
        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
        onError={(e) => { (e.target as HTMLImageElement).src = '/default-profile.png'; }} // Fallback if image load fails
      />
      <div>
        <strong>{client.firstName} {client.lastName}</strong>
      </div>
    </div>
  );
}