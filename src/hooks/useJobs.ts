import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchJobs, fetchJobsByDocId } from '@/lib/api';
import type { JobFilters } from '@/types/job';

export function useJobs(filters: JobFilters) {
  // useInfiniteQuery is a hook designed for managing and fetching data for infinite scrolling or "load more" UI patterns.
  // It extends the functionality of useQuery to handle paginated data
  // where new pages are loaded additively onto an existing set.

  return useInfiniteQuery({
    queryKey: ['jobs', filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchJobs({ page: pageParam, pageSize: 2, filters }),
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

export function useJob(documentId: string) {
  return useQuery({
    queryKey: ['job', documentId],
    queryFn: () => fetchJobsByDocId(documentId),
    enabled: !!documentId,
  });
}
