import type { Job } from './job';

export type Application = {
  id: number;
  documentId: string;
  job: Job;
  createdAt: string;
  resume: {
    id: number;
    documentId: string;
    url: string;
  };
};
