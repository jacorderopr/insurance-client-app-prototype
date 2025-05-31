export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: string; // Keep as string for simplicity, parse/format as needed
  profilePicturePath: string | null;
  policyNumber: string;
  policyType: string;
  coverageStartDate: string; // Keep as string
  coverageEndDate: string;   // Keep as string
}

export interface ClientSummary {
  id: number;
  firstName: string;
  lastName: string;
  profilePicturePath: string | null;
}