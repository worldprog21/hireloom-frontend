import axios from 'axios';
import { API_URL } from '@/lib/api';
import type { JobFilters } from '@/types/job';

export async function fetchJobs({
  page,
  pageSize,
  filters,
}: {
  page: number;
  pageSize: number;
  filters: JobFilters;
}) {
  const query = new URLSearchParams();
  query.set('pagination[page]', String(page));
  query.set('pagination[pageSize]', String(pageSize));
  query.set('populate[benefits]', 'true');
  query.set('populate[aboutRole]', 'true');
  query.set('populate[whatWeDo]', 'true');
  query.set('populate[waysToWork]', 'true');
  query.set('populate[company][populate]', 'logo');

  // search by job title
  if (filters.search) {
    query.set('filters[jobTitle][$containsi]', filters.search);
  }

  // rest of parameters
  if (filters.jobType) {
    query.set('filters[jobType][$eq]', filters.jobType);
  }
  if (filters.workplace) {
    query.set('filters[workplace][$eq]', filters.workplace);
  }
  if (filters.seniority) {
    query.set('filters[seniority][$eq]', filters.seniority);
  }

  const res = await axios.get(`${API_URL}/api/jobs?${query.toString()}`);
  return res.data;
}

export async function fetchJobsByDocId(documentId: string) {
  const query = new URLSearchParams();
  query.set('populate[benefits]', 'true');
  query.set('populate[aboutRole]', 'true');
  query.set('populate[whatWeDo]', 'true');
  query.set('populate[waysToWork]', 'true');
  query.set('populate[company][populate]', 'logo');

  const res = await axios.get(
    `${API_URL}/api/jobs/${documentId}?${query.toString()}`
  );
  return res.data;
}
