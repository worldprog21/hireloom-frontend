export type Company = {
  id: number;
  documentId: string;
  companyName: string;
  companyWebsite: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  logo: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  about: {
    id: number;
    text: string;
  }[];
  jobs: {
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
  }[];
};

export type CompanyOverviewPageProps = {
  id?: number;
  documentId?: string;
  companyLogoUrl?: string; // Optional URL for the company logo
  companyName: string;
  totalJobs: number; // Number of jobs available
  overviewContent: {
    about: string[]; // Array of paragraphs for "About Transamerica Financial Advisors"
  };
  jobs: {
    id: number;
    documentId: string;
    timePosted: string; // e.g. "3 days ago"
    tags: string[]; // workplace - seniority
    companyLogoUrl: string;
    jobTitle: string;
    companyName: string; // optional since company may be undefined
    salaryRange: string;
    isRemote: boolean;
    location: string;
    jobType: string;
  }[]; // Array of job objects, conforming to JobCardProps
  sidebarDetails: {
    companyWebsite?: string; // e.g., "tfaconnect.com/"
  };
};
