import axios from 'axios';
import { API_URL } from '@/lib/api';

export const updateUserDetails = ({
  resume,
  firstName,
  lastName,
  documentId,
  token,
}: {
  resume: string;
  firstName: string;
  lastName: string;
  documentId: string;
  token?: string;
}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return axios.put(
    `${API_URL}/api/user-details/${documentId}`,
    {
      data: {
        resume,
        firstName,
        lastName,
      },
    },
    { headers }
  );
};
