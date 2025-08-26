'use client';

import moment from 'moment';
import { useParams } from 'next/navigation';
import { CompanyOverviewPage } from '@/components/CompanyOverviewPage';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompany } from '@/hooks/queries/useCompany';
import type { Company, CompanyOverviewPageProps } from '@/types/company';

const CompanyPage = () => {
  const { documentId } = useParams();
  const { data, isLoading, error } = useCompany(documentId as string);

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

  const company = data?.data as Company;

  const exampleCompanyData = {
    id: company?.id,
    documentId: company?.documentId,
    companyLogoUrl: company?.logo
      ? process.env.NEXT_PUBLIC_API_URL + company?.logo?.url
      : 'https://placehold.co/64x64/0047AB/FFFFFF.png?text=G',
    companyName: company?.companyName,
    totalJobs: company?.jobs?.length,
    overviewContent: {
      about: company?.about?.map((item: { text: string }) => item.text) || [],
    },
    jobs: company?.jobs?.map((job) => ({
      id: job.id,
      documentId: job.documentId,
      timePosted: moment(job.createdAt).fromNow(),
      tags: [`${job.workplace} - ${job.seniority}`],
      companyLogoUrl: company?.logo
        ? process.env.NEXT_PUBLIC_API_URL + company?.logo?.url
        : 'https://placehold.co/64x64/0047AB/FFFFFF.png?text=G',
      jobTitle: job.jobTitle,
      companyName: company?.companyName,
      salaryRange: job.salaryRange,
      isRemote: job.workplace.toLowerCase() === 'remote',
      location: job.workplace,
      jobType: job.jobType,
    })),
    sidebarDetails: {
      companyWebsite: company?.companyWebsite,
    },
  } as CompanyOverviewPageProps;

  return <CompanyOverviewPage {...exampleCompanyData} />;
};

export default CompanyPage;
