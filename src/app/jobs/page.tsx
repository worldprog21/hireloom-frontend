'use client';

import moment from 'moment';
import { useState } from 'react';
import { JobCard } from '@/components/JobCard';
import { JobSearch } from '@/components/JobSearch';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useJobs } from '@/hooks/queries/useJobs';
import type { Job, JobFilters } from '@/types/job';

const Home = () => {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    jobType: null,
    workplace: null,
    seniority: null,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useJobs(filters);

  const jobs = data?.pages?.flatMap((page) => page.data);

  return (
    <div className="px-4 lg:px-0">
      <JobSearch onChangeFilters={setFilters} />

      {isLoading && (
        <>
          <Skeleton className="mx-auto mt-4 h-44 w-full max-w-5xl rounded-xl border border-gray-200 shadow-md" />
          <Skeleton className="mx-auto mt-4 h-44 w-full max-w-5xl rounded-xl border border-gray-200 shadow-md" />
        </>
      )}

      <div className="space-y-4 pb-6">
        {jobs?.map((job: Job) => (
          <JobCard
            companyLogoUrl={
              job.company.logo
                ? process.env.NEXT_PUBLIC_API_URL + job.company.logo.url
                : ''
            }
            companyName={job.company.companyName}
            documentId={job.documentId}
            isRemote={job.workplace === 'Remote'}
            jobTitle={job.jobTitle}
            jobType={job.jobType}
            key={job.id}
            salaryRange={job.salaryRange}
            tags={[job.seniority]}
            timePosted={moment(job.createdAt).fromNow()}
          />
        ))}
      </div>

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center py-6">
          <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
