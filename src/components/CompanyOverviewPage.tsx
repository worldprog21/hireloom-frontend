'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { CompanyOverviewPageProps } from '@/types/company';
import { JobCard } from './JobCard';
import { Button } from './ui/button';

export const CompanyOverviewPage = ({
  companyLogoUrl,
  companyName,
  totalJobs,
  overviewContent,
  jobs,
  sidebarDetails,
}: CompanyOverviewPageProps) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Jobs'>('Overview');

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 font-sans">
      <div className="container mx-auto max-w-7xl">
        {/* Company Header Section */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex size-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-red-500">
              {companyLogoUrl ? (
                <Image
                  alt={`${companyName} logo`}
                  className="h-full w-full object-cover"
                  height={64}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'https://placehold.co/64x64/FF0000/FFFFFF.png?text=Logo';
                  }}
                  src={companyLogoUrl}
                  unoptimized
                  width={64}
                />
              ) : (
                <span className="font-bold text-2xl text-white">
                  {companyName.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="font-bold text-2xl text-gray-900 leading-tight md:text-3xl">
              {companyName}
            </h1>
          </div>

          {/* Tabs for Overview / Jobs */}
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1 shadow-sm">
            <Button
              className={`rounded-md px-6 py-2 font-medium text-base transition-colors duration-200 ${activeTab === 'Overview' ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Overview')}
              variant={activeTab === 'Overview' ? 'default' : 'ghost'}
            >
              Overview
            </Button>
            <Button
              className={`ml-1 rounded-md px-6 py-2 font-medium text-base transition-colors duration-200 ${activeTab === 'Jobs' ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Jobs')}
              variant={activeTab === 'Jobs' ? 'default' : 'ghost'}
            >
              Jobs ({totalJobs})
            </Button>
          </div>
        </div>

        {/* Content Area based on active tab */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (Overview or Jobs List) */}
          <div className="lg:col-span-2">
            {activeTab === 'Overview' ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
                <h2 className="mb-4 font-semibold text-gray-900 text-xl">
                  About {companyName}
                </h2>
                {overviewContent.about.map((paragraph) => (
                  <p
                    className="mb-4 text-gray-700 leading-relaxed"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {jobs.length > 0 ? (
                  jobs.map((job) => <JobCard key={job.id} {...job} />)
                ) : (
                  <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-md">
                    No jobs found for {companyName} at this time.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            {/* Company Information Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-red-500">
                  {companyLogoUrl ? (
                    <Image
                      alt={`${companyName} logo`}
                      className="h-full w-full object-cover"
                      height={64}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://placehold.co/64x64/FF0000/FFFFFF.png?text=Logo';
                      }}
                      src={companyLogoUrl}
                      unoptimized
                      width={64}
                    />
                  ) : (
                    <span className="font-bold text-white text-xl">
                      {companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <p className="font-semibold text-gray-900 text-lg">
                  {companyName}
                </p>
              </div>
              {sidebarDetails.companyWebsite && (
                <p className="mb-4 text-gray-600 text-sm">
                  <span className="font-medium">Website:</span>{' '}
                  <a
                    className="text-blue-600 hover:underline"
                    href={`http://${sidebarDetails.companyWebsite}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {sidebarDetails.companyWebsite}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
