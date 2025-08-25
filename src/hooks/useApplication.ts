import { useMutation } from '@tanstack/react-query';
import { createApplication } from '@/lib/api';

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
