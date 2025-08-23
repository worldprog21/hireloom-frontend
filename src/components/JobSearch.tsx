'use client';

import { Briefcase, Building2, ChevronDown, Crown, Search } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { JobFilters } from '@/types/job';
import { Button } from './ui/button';
import { Input } from './ui/input';

type JobSearchProps = {
  onChangeFilters: (filters: JobFilters) => void;
};

export const JobSearch = ({ onChangeFilters }: JobSearchProps) => {
  // State variables with explicit type annotations
  const [jobTitle, setJobTitle] = useState<string>('');
  const [selectedJobType, setSelectedJobType] =
    useState<JobFilters['jobType']>(null);
  const [selectedWorkplace, setSelectedWorkplace] =
    useState<JobFilters['workplace']>(null);
  const [selectedSeniority, setSelectedSeniority] =
    useState<JobFilters['seniority']>(null);

  // Handler for the main search input change
  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const updateFilters = (newFilters?: Partial<JobFilters>) => {
    const filters: JobFilters = {
      search: newFilters?.search ?? jobTitle,
      jobType: newFilters?.jobType ?? selectedJobType,
      workplace: newFilters?.workplace ?? selectedWorkplace,
      seniority: newFilters?.seniority ?? selectedSeniority,
    };
    onChangeFilters(filters);
  };

  // Reset everything
  const clearAll = () => {
    setJobTitle('');
    setSelectedJobType(null);
    setSelectedWorkplace(null);
    setSelectedSeniority(null);
    onChangeFilters({
      search: '',
      jobType: null,
      workplace: null,
      seniority: null,
    });
  };

  const handleSearch = () => {
    updateFilters({ search: jobTitle });
  };

  // Active filters for displaying pills
  const activeFilters = [
    jobTitle ? { label: `Title: ${jobTitle}`, key: 'search' } : null,
    selectedJobType
      ? { label: `Type: ${selectedJobType}`, key: 'jobType' }
      : null,
    selectedWorkplace
      ? { label: `Workplace: ${selectedWorkplace}`, key: 'workplace' }
      : null,
    selectedSeniority
      ? { label: `Seniority: ${selectedSeniority}`, key: 'seniority' }
      : null,
  ].filter(Boolean) as { label: string; key: keyof JobFilters }[];

  return (
    <div className="flex items-center justify-center py-4">
      <div className="w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition-all ease-in-out hover:border-blue-500">
        <div className="rounded-2xl bg-[#F8FAFC] p-6 md:p-8">
          {/* Main Search Bar */}
          <div className="mb-6 flex items-center space-x-2 rounded-full border border-gray-200 bg-white p-1 shadow-sm transition-all duration-200 ease-in-out focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <Input
              className="flex-grow rounded-full border-none px-4 py-3 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={handleJobTitleChange}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Search by job title"
              type="text"
              value={jobTitle}
            />
            <Button
              aria-label="Search"
              className="rounded-full bg-blue-600 p-3 text-white transition-colors duration-200 hover:bg-blue-700"
              onClick={handleSearch}
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Job Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                  variant="outline"
                >
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  {selectedJobType || 'Job type'}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Job Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['Full-time', 'Part-time', 'Contract'].map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => {
                      setSelectedJobType(type);
                      updateFilters({ jobType: type });
                    }}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Workplace Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                  variant="outline"
                >
                  <Building2 className="h-4 w-4 text-gray-500" />
                  {selectedWorkplace || 'Workplace'}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Workplace</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['Remote', 'Hybrid', 'On-site'].map((place) => (
                  <DropdownMenuItem
                    key={place}
                    onClick={() => {
                      setSelectedWorkplace(place);
                      updateFilters({ workplace: place });
                    }}
                  >
                    {place}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Seniority Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                  variant="outline"
                >
                  <Crown className="h-4 w-4 text-gray-500" />
                  {selectedSeniority || 'Seniority'}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Seniority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  'Entry Level',
                  'Mid Level',
                  'Senior',
                  'Manager',
                  'Director',
                  'Executive',
                ].map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => {
                      setSelectedSeniority(level);
                      updateFilters({ seniority: level });
                    }}
                  >
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear All */}
            {(jobTitle ||
              selectedJobType ||
              selectedWorkplace ||
              selectedSeniority) && (
              <Button
                className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
                onClick={clearAll}
                variant="outline"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filters Pills */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((f) => (
                <span
                  className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
                  key={f.key}
                >
                  {f.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
