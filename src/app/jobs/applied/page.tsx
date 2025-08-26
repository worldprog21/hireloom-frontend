'use client';

import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useJobseApplied } from '@/hooks/queries/useApplication';
import type { Application } from '@/types/application';

const JobsAppliedPage = () => {
  const [applicationStatus, setApplicationStatus] = useState<string>('Pending');
  const { data: session }: any = useSession();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useJobseApplied(session?.jwt, session?.user?.id, applicationStatus);

  const applications = data?.pages?.flatMap((page) => page.data);

  useEffect(() => {
    if (applicationStatus) {
      refetch();
    }
  }, [applicationStatus, refetch]);

  return (
    <div className="px-4 py-4 lg:px-0">
      <Tabs
        className="mx-auto w-full max-w-5xl"
        defaultValue="Pending"
        onValueChange={(value) => setApplicationStatus(value)}
      >
        <TabsList className="bg-gray-200">
          <TabsTrigger value="Pending">Pending</TabsTrigger>
          <TabsTrigger value="Rejected">Rejected</TabsTrigger>
          <TabsTrigger value="Accepted">Accepted</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading || isRefetching ? (
        <>
          <Skeleton className="mx-auto mt-4 h-44 w-full max-w-5xl rounded-xl border border-gray-200 shadow-md" />
          <Skeleton className="mx-auto mt-4 h-44 w-full max-w-5xl rounded-xl border border-gray-200 shadow-md" />
        </>
      ) : (
        <>
          <div className="space-y-4 py-4">
            {applications?.map((application: Application) => (
              <JobCard
                companyLogoUrl={
                  application?.job?.company.logo
                    ? process.env.NEXT_PUBLIC_API_URL +
                      application?.job?.company.logo.url
                    : ''
                }
                companyName={application?.job?.company.companyName}
                documentId={application?.job?.documentId}
                isRemote={application?.job?.workplace === 'Remote'}
                jobTitle={application?.job?.jobTitle}
                jobType={application?.job?.jobType}
                key={application?.id}
                salaryRange={application?.job?.salaryRange}
                tags={[application?.job?.seniority]}
                timePosted={moment(application?.createdAt).fromNow()}
              />
            ))}
          </div>

          {/* Load More */}
          {hasNextPage && (
            <div className="flex justify-center py-6">
              <Button
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsAppliedPage;
