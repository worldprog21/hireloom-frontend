import { useMutation } from '@tanstack/react-query';
import { updateUserDetails } from '@/services/users-services';

export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: async ({
      resume,
      firstName,
      lastName,
      documentId,
      token,
    }: any) => {
      const response = await updateUserDetails({
        resume,
        firstName,
        lastName,
        documentId,
        token,
      });
      return response.data;
    },
  });
};
