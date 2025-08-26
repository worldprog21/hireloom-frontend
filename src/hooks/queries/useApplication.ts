import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  createApplication,
  fetchApplicationStatus,
  fetchJobsApplied,
} from '@/services/applications-services';

export const useCreateApplication = () => {
  return useMutation({
    mutationFn: async ({
      resume,
      interestReason,
      skills,
      job,
      userId,
      token,
    }: any) => {
      const response = await createApplication({
        resume,
        interestReason,
        skills,
        job,
        userId,
        token,
      });
      return response.data;
    },
  });
};

export function useApplicationStatus(jobDocId: string, session: any) {
  return useQuery({
    queryKey: ['application', jobDocId, session],
    queryFn: () => fetchApplicationStatus(jobDocId, session),
    staleTime: 0, // disable caching
  });
}

export function useJobseApplied(
  token: string,
  userId: number,
  applicationStatus: string
) {
  return useInfiniteQuery({
    queryKey: ['jobs-applied', token, userId],
    queryFn: ({ pageParam = 1 }) =>
      fetchJobsApplied({
        page: pageParam,
        pageSize: 2,
        token,
        userId,
        applicationStatus,
      }),
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      if (page < pageCount) {
        return page + 1;
      }
      return;
    },
    initialPageParam: 1,
  });
}
