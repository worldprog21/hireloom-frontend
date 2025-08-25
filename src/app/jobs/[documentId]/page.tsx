'use client';

import moment from 'moment';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import JobDetailsPage from '@/components/JobDetailsPage';
import { Skeleton } from '@/components/ui/skeleton';
import { useApplicationStatus } from '@/hooks/useApplication';
import { useJob } from '@/hooks/useJobs';
import type { Job } from '@/types/job';

const JobDetails = () => {
  const { documentId } = useParams();
  const { data: session }: any = useSession();
  const { data, isLoading, error } = useJob(documentId as string);
  const { data: jobApplication } = useApplicationStatus(
    documentId as string,
    session
  );

  if (isLoading) {
    return (
      <div className="container mx-auto grid h-[80vh] max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <Skeleton className="mx-auto h-full w-full rounded-xl border border-gray-200 p-6 shadow-md md:p-8 lg:col-span-2" />

        {/* Sidebar Area */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          <Skeleton className="mx-auto h-full w-full rounded-xl border border-gray-200 shadow-md" />

          <Skeleton className="mx-auto h-full w-full rounded-xl border border-gray-200 shadow-md" />
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="mx-auto max-w-7xl px-4 py-8">Error loading job.</p>;
  }

  const job = data?.data as Job;

  const exampleJobDetails = {
    documentId: job?.documentId,
    companyLogoUrl: job?.company?.logo
      ? process.env.NEXT_PUBLIC_API_URL + job?.company?.logo?.url
      : 'https://placehold.co/64x64/0047AB/FFFFFF.png?text=G',
    jobTitle: job?.jobTitle,
    companyName: job?.company?.companyName,
    companyDocumentId: job?.company?.documentId,
    salaryRange: job?.salaryRange,
    jobAttributes: {
      isRemote: job?.workplace === 'Remote',
      jobType: job?.jobType,
    },
    benefits: job?.benefits?.map((item: { text: string }) => item.text) || [],
    aboutRole: job?.aboutRole?.map((item: { text: string }) => item.text) || [],
    whatWeDo: job?.whatWeDo?.map((item: { text: string }) => item.text) || [],
    waysToWork:
      job?.waysToWork?.map((item: { text: string }) => item.text) || [],
    sidebarDetails: {
      tag: job?.seniority,
      workplace: job?.workplace,
      jobType: job?.jobType,
      pay: job?.salaryRange,
      publishedDate: moment(job?.createdAt).format('MMM D, YYYY'),
      companyWebsite: job?.company?.companyWebsite,
    },
    jobApplication: jobApplication?.data?.[0],
  };

  return <JobDetailsPage {...exampleJobDetails} />;
};

export default JobDetails;
