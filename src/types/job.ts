export type JobBenefit = {
  id: number;
  text: string;
};

export type AboutRole = {
  id: number;
  text: string;
};

export type WhatWeDo = {
  id: number;
  text: string;
};

export type WaysToWork = {
  id: number;
  text: string;
};

export type Image = {
  id: string;
  url: string;
};

export type Company = {
  id: number;
  documentId: string;
  companyName: string;
  companyWebsite: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  logo: Image;
};

export type Job = {
  id: number;
  documentId: string;
  jobTitle: string;
  salaryRange: string;
  jobType: string;
  workplace: string;
  seniority: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  benefits: JobBenefit[];
  aboutRole: AboutRole[];
  whatWeDo: WhatWeDo[];
  waysToWork: WaysToWork[];
  company: Company;
};

export type JobsResponse = {
  data: Job[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type JobsQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export type JobFilters = {
  search?: string;
  jobType?: string | null;
  workplace?: string | null;
  seniority?: string | null;
};
