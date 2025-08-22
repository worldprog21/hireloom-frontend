import JobDetailsPage from '@/components/JobDetailsPage';

const JobDetails = () => {
  const exampleJobDetails = {
    companyLogoUrl: 'https://placehold.co/64x64/0047AB/FFFFFF.png?text=G',
    jobTitle: 'Full Stack Developer',
    companyName: 'GlobalTech Solutions',
    salaryRange: '90k - 120k USD/year',
    jobAttributes: {
      isRemote: true,
      jobType: 'Full-time',
    },
    benefits: [
      'Health, Dental, and Vision Insurance',
      '401(k) with company match',
      'Generous Paid Time Off and Holidays',
      'Professional Development Stipend',
    ],
    aboutRole: [
      "Join our innovative development team to build scalable web applications and services using the latest technologies. You'll collaborate with cross-functional teams to design, develop, and deliver features that enhance user experience.",
      'We value creativity, code quality, and continuous learning. Ideal candidates are passionate about problem-solving and eager to grow their skills in a dynamic environment.',
    ],
    whatWeDo: [
      'Develop and maintain web applications with React and Node.js',
      'Implement RESTful APIs and database design',
      'Collaborate with UI/UX designers and product managers',
      'Write automated tests and perform code reviews',
      'Participate in agile ceremonies and sprint planning',
    ],
    waysToWork: [
      'On-site: Work from our headquarters in San Francisco, CA',
      'Hybrid: Flexible remote and in-office schedule',
    ],
    sidebarDetails: {
      tag: 'Mid level',
      workplace: 'On-site',
      jobType: 'Full-time',
      pay: '90k - 120k USD/year',
      publishedDate: 'Jul 20, 2025',
      companyWebsite: 'globaltechsolutions.com/',
    },
  };

  return <JobDetailsPage {...exampleJobDetails} />;
};

export default JobDetails;
