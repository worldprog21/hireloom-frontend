'use client';

import { marked } from 'marked';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { DialogHeader } from './ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Textarea } from './ui/textarea';

export default function AIAnalyzerDialog({
  open,
  setOpen,
  jobTitle,
  jobAttributes,
  benefits,
  aboutRole,
  whatWeDo,
  waysToWork,
}: any) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="sm:max-w-[760px]">
          <DialogHeader>
            <DialogTitle>Job Qualification AI Analayzer</DialogTitle>
            <DialogDescription>Job Title: {jobTitle}</DialogDescription>
          </DialogHeader>

          <AIAnalyzer
            aboutRole={aboutRole}
            benefits={benefits}
            jobAttributes={jobAttributes}
            jobTitle={jobTitle}
            waysToWork={waysToWork}
            whatWeDo={whatWeDo}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Job Qualification AI Analayzer</DrawerTitle>
          <DrawerDescription>Job Title: {jobTitle}</DrawerDescription>
        </DrawerHeader>

        <AIAnalyzer
          aboutRole={aboutRole}
          benefits={benefits}
          jobAttributes={jobAttributes}
          jobTitle={jobTitle}
          waysToWork={waysToWork}
          whatWeDo={whatWeDo}
        />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AIAnalyzer({
  jobTitle,
  jobAttributes,
  benefits,
  aboutRole,
  whatWeDo,
  waysToWork,
}: any) {
  const [jobDetails] = useState(
    `
Job Title: ${jobTitle}

Job Attributes:
- Remote: ${jobAttributes.isRemote ? 'Yes' : 'No'}
- Type: ${jobAttributes.jobType}

Benefits:
${benefits.map((benefit: string) => `- ${benefit}`).join('\n')}

About the Role:
${aboutRole.map((role: string) => `- ${role}`).join('\n')}

What We Do:
${whatWeDo.map((task: string) => `- ${task}`).join('\n')}

Ways to Work:
${waysToWork.map((way: string) => `- ${way}`).join('\n')}
  `.trim()
  );

  const [skills, setSkills] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDetails, skills }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render markdown with custom Tailwind styles
  const renderAnalysis = () => {
    if (!analysis) {
      return null;
    }

    // Split markdown into sections based on headings
    const sections = analysis.split('## ').slice(1); // Skip first empty split
    const sectionComponents = sections.map((section) => {
      const [heading, ...content] = section.split('\n');
      const sectionContent = content.join('\n');
      const sectionHtml = marked(sectionContent, { async: false });

      // Assign classes based on heading
      let sectionClass = '';
      switch (heading.trim()) {
        case 'Overall Qualification':
          sectionClass = 'bg-blue-50 border-blue-200';
          break;
        case 'Strong Points':
          sectionClass = 'bg-green-50 border-green-200';
          break;
        case 'Weak Points':
          sectionClass = 'bg-red-50 border-red-200';
          break;
        case 'Recommendations':
          sectionClass = 'bg-yellow-50 border-yellow-200';
          break;
        default:
          sectionClass = 'bg-gray-50 border-gray-200';
      }

      return (
        <div
          className={`rounded-lg border p-6 shadow-md ${sectionClass}`}
          key={section}
        >
          <h2 className="mb-4 font-bold text-gray-800 text-xl">{heading}</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: sectionHtml }}
          />
        </div>
      );
    });

    return <div className="space-y-4">{sectionComponents}</div>;
  };

  return (
    <div className="h-fit max-h-[80vh] space-y-6 overflow-y-auto p-6">
      <div className="bg-white">
        <label
          className="mb-2 block font-medium text-gray-700 text-sm"
          htmlFor="skills"
        >
          Your Skills/Specialties
        </label>
        <Textarea
          className="w-full border-gray-300"
          id="skills"
          onChange={(e) => setSkills(e.target.value)}
          placeholder="List your skills, experience, etc..."
          rows={6}
          value={skills}
        />
      </div>

      <div className="text-center">
        <Button
          className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-indigo-700"
          disabled={loading || !jobDetails || !skills}
          onClick={handleAnalyze}
        >
          {loading ? 'Analyzing...' : 'Analyze Qualification'}
        </Button>
      </div>

      {error && (
        <p className="mt-4 text-center font-medium text-red-500">{error}</p>
      )}

      {analysis && (
        <div className="mt-8 space-y-6">
          <h2 className="font-semibold text-2xl text-gray-800">
            Analysis Result
          </h2>
          {renderAnalysis()}
        </div>
      )}
    </div>
  );
}
