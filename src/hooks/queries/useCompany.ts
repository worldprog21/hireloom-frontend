import { useQuery } from '@tanstack/react-query';
import { fetchCompanyByDocId } from '@/services/company-services';

export function useCompany(documentId: string) {
  return useQuery({
    queryKey: ['company', documentId],
    queryFn: () => fetchCompanyByDocId(documentId),
    enabled: !!documentId, // only run if documentId exists
  });
}
