import axios from 'axios';
import type { JobFilters } from '@/types/job';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

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

export async function fetchCompanyByDocId(documentId: string) {
  const query = new URLSearchParams();
  query.set('populate', '*');

  const res = await axios.get(
    `${API_URL}/api/companies/${documentId}?${query.toString()}`
  );
  return res.data;
}

export const createApplication = ({
  resume,
  interestReason,
  skills,
  job,
  userId,
  token,
}: {
  resume: string;
  interestReason: string;
  skills: string;
  job: string;
  userId: string;
  token?: string;
}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return axios.post(
    `${API_URL}/api/applications`,
    {
      data: {
        resume,
        interestReason,
        skills,
        job,
        user: userId,
      },
    },
    { headers }
  );
};

export async function fetchApplicationStatus(jobDocId: string, session: any) {
  const headers = session ? { Authorization: `Bearer ${session?.jwt}` } : {};

  const res = await axios.get(
    `${API_URL}/api/applications?filters[job][documentId][$eq]=${jobDocId}&filters[user][id][$eq]=${session?.user?.id}`,
    { headers }
  );
  return res.data;
}

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
