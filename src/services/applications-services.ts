import axios from 'axios';
import { API_URL } from '@/lib/api';

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

export async function fetchJobsApplied({
  page,
  pageSize,
  token,
  userId,
  applicationStatus,
}: {
  page: number;
  pageSize: number;
  token: string;
  userId: number;
  applicationStatus: string;
}) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const query = new URLSearchParams();
  // ✅ populate only the `url` field from job.company.logo
  query.append(
    'populate[job][populate][company][populate][logo][fields][]',
    'url'
  );

  // pagination
  query.append('pagination[page]', String(page));
  query.append('pagination[pageSize]', String(pageSize));

  // filters
  query.append('filters[user][id][$eq]', String(userId));
  query.append('filters[applicationStatus][$eq]', applicationStatus);

  const res = await axios.get(
    `${API_URL}/api/applications?${query.toString()}`,
    { headers }
  );
  return res.data;
}
