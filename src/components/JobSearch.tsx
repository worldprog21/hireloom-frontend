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
import { Button } from './ui/button';
import { Input } from './ui/input';

type JobType = 'Full-time' | 'Part-time' | 'Contract' | null;
type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site' | null;
type SeniorityLevel =
  | 'Entry Level'
  | 'Mid Level'
  | 'Senior'
  | 'Manager'
  | 'Director'
  | 'Executive'
  | null;

export const JobSearch = () => {
  // State variables with explicit type annotations
  const [jobTitle, setJobTitle] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<JobType>(null);
  const [selectedWorkplace, setSelectedWorkplace] =
    useState<WorkplaceType>(null);
  const [selectedSeniority, setSelectedSeniority] =
    useState<SeniorityLevel>(null);

  // Handler for the main search input change
  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const handleSearch = () => {
    // console.log('Searching for job title:', jobTitle);
    // console.log('Job Type:', selectedJobType);
    // console.log('Workplace:', selectedWorkplace);
    // console.log('Seniority:', selectedSeniority);
  };

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
                <DropdownMenuItem
                  onClick={() => setSelectedJobType('Full-time')}
                >
                  Full-time
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedJobType('Part-time')}
                >
                  Part-time
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedJobType('Contract')}
                >
                  Contract
                </DropdownMenuItem>
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
                <DropdownMenuItem
                  onClick={() => setSelectedWorkplace('Remote')}
                >
                  Remote
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedWorkplace('Hybrid')}
                >
                  Hybrid
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedWorkplace('On-site')}
                >
                  On-site
                </DropdownMenuItem>
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
                <DropdownMenuItem
                  onClick={() => setSelectedSeniority('Entry Level')}
                >
                  Entry Level
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedSeniority('Mid Level')}
                >
                  Mid Level
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedSeniority('Senior')}
                >
                  Senior
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedSeniority('Manager')}
                >
                  Manager
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedSeniority('Director')}
                >
                  Director
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedSeniority('Executive')}
                >
                  Executive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
