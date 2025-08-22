'use client';

import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define the props type for the JobCard component
type JobCardProps = {
  id: string;
  timePosted: string;
  tags: string[]; // e.g., ["seniority"]
  companyLogoUrl?: string; // Optional URL for the company logo
  jobTitle: string;
  companyName: string;
  salaryRange: string; // e.g., "15 - 35 USD/hour"
  isRemote: boolean;
  jobType: string; // e.g., "Part-time"
};

export const JobCard = ({
  timePosted,
  tags,
  companyLogoUrl,
  jobTitle,
  companyName,
  salaryRange,
  isRemote,
  jobType,
}: JobCardProps) => {
  return (
    <Link
      className="mx-auto mt-4 flex w-full max-w-5xl cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all ease-in-out hover:border-blue-500"
      href="/jobs/123"
    >
      {/* Top section: Time, Tags, Save Button */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="font-medium text-gray-500 text-sm">
            {timePosted}
          </span>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <span
                className="rounded-full bg-purple-100 px-2.5 py-0.5 font-semibold text-purple-700 text-xs"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle section: Job Details */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        {/* Company Logo */}
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-red-500">
          {companyLogoUrl ? (
            <Image
              alt={`${companyName} logo`}
              className="h-full w-full object-cover"
              height={56}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  'https://placehold.co/56x56/FF0000/FFFFFF.png?text=Logo';
              }}
              src={companyLogoUrl}
              unoptimized
              width={56}
            />
          ) : (
            // Placeholder if no logo URL is provided
            <span className="font-bold text-white text-xl">M</span>
          )}
        </div>

        {/* Job Title and Company Name */}
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900 text-lg">{jobTitle}</h3>
          <p className="text-gray-600 text-sm">{companyName}</p>
        </div>

        {/* Salary Range */}
        <div className="flex-shrink-0 text-right">
          <p className="font-bold text-gray-800 text-lg">{salaryRange}</p>
        </div>
      </div>

      {/* Bottom section: Job Attributes */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 text-sm">
        {isRemote && (
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-green-500" />{' '}
            {/* Using MapPin for remote icon */}
            <span>Remote</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{jobType}</span>
        </div>
      </div>
    </Link>
  );
};
