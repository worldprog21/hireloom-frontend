import { useMutation, useQuery } from '@tanstack/react-query';
import { createApplication, fetchApplicationStatus } from '@/lib/api';

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
