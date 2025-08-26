import axios from 'axios';
import { API_URL } from '@/lib/api';

export async function fetchCompanyByDocId(documentId: string) {
  const query = new URLSearchParams();
  query.set('populate', '*');

  const res = await axios.get(
    `${API_URL}/api/companies/${documentId}?${query.toString()}`
  );
  return res.data;
}
