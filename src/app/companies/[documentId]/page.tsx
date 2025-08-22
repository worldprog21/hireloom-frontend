import { CompanyOverviewPage } from '@/components/CompanyOverviewPage';

const exampleCompanyData = {
  id: '123',
  companyLogoUrl: 'https://placehold.co/64x64/007A33/FFFFFF.png?text=G',
  companyName: 'GreenWave Technologies',
  totalJobs: 5,
  overviewContent: {
    about: [
      'GreenWave Technologies is dedicated to providing cutting-edge software solutions that empower businesses to achieve sustainable growth. Founded in 2012, we have grown into a trusted technology partner serving clients globally.',
      'Our team specializes in cloud computing, AI-driven analytics, and scalable web platforms. We believe in innovation, transparency, and delivering measurable results for every client.',
      'We have collaborated with industry leaders in healthcare, finance, and retail to streamline operations and enhance user experiences.',
      'With offices in Seattle, WA and Austin, TX, GreenWave continues to expand our talented workforce through continuous learning and inclusive culture initiatives.',
    ],
  },
  jobs: [
    {
      id: '1',
      timePosted: '3 days ago',
      tags: ['onsite - Seattle, WA'],
      companyLogoUrl: 'https://placehold.co/56x56/007A33/FFFFFF.png?text=G',
      jobTitle: 'Backend Engineer',
      companyName: 'GreenWave Technologies',
      salaryRange: '85k - 110k USD/year',
      isQuickApply: true,
      isRemote: false,
      location: 'Seattle, WA',
      jobType: 'Full-time',
    },
    {
      id: '2',
      timePosted: '1 week ago',
      tags: ['remote - United States only'],
      companyLogoUrl: 'https://placehold.co/56x56/007A33/FFFFFF.png?text=G',
      jobTitle: 'Product Manager',
      companyName: 'GreenWave Technologies',
      salaryRange: '100k - 130k USD/year',
      isQuickApply: false,
      isRemote: true,
      location: 'United States only',
      jobType: 'Full-time',
    },
    {
      id: '3',
      timePosted: '5 days ago',
      tags: ['hybrid - Austin, TX'],
      companyLogoUrl: 'https://placehold.co/56x56/007A33/FFFFFF.png?text=G',
      jobTitle: 'UX/UI Designer',
      companyName: 'GreenWave Technologies',
      salaryRange: '70k - 90k USD/year',
      isQuickApply: true,
      isRemote: false,
      location: 'Austin, TX',
      jobType: 'Full-time',
    },
    {
      id: '4',
      timePosted: '2 weeks ago',
      tags: ['remote - Global'],
      companyLogoUrl: 'https://placehold.co/56x56/007A33/FFFFFF.png?text=G',
      jobTitle: 'Data Scientist',
      companyName: 'GreenWave Technologies',
      salaryRange: '95k - 125k USD/year',
      isQuickApply: false,
      isRemote: true,
      location: 'Global',
      jobType: 'Full-time',
    },
    {
      id: '5',
      timePosted: '1 month ago',
      tags: ['onsite - Seattle, WA'],
      companyLogoUrl: 'https://placehold.co/56x56/007A33/FFFFFF.png?text=G',
      jobTitle: 'Technical Support Specialist',
      companyName: 'GreenWave Technologies',
      salaryRange: '50k - 65k USD/year',
      isQuickApply: true,
      isRemote: false,
      location: 'Seattle, WA',
      jobType: 'Part-time',
    },
  ],
  sidebarDetails: {
    companyWebsite: 'greenwavetech.com/',
  },
};

const CompanyPage = () => {
  return <CompanyOverviewPage {...exampleCompanyData} />;
};

export default CompanyPage;
