import { JobCard } from '@/components/JobCard';
import { JobSearch } from '@/components/JobSearch';

const Home = () => {
  const exampleJob = {
    id: '1',
    timePosted: '17 minutes ago',
    tags: ['Entry level', 'Senior'],
    companyLogoUrl: 'https://placehold.co/64x64/0047AB/FFFFFF.png?text=G',
    jobTitle: 'Full Stack Developer',
    companyName: 'GlobalTech Solutions',
    salaryRange: '90k - 120k USD/year',
    isRemote: true,
    jobType: 'Full-time',
  };

  return (
    <div className="px-4 lg:px-0">
      <JobSearch />

      <JobCard {...exampleJob} />
      <JobCard {...exampleJob} />
      <JobCard {...exampleJob} />
    </div>
  );
};

export default Home;
