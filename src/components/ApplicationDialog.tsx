'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';
import z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateApplication } from '@/hooks/queries/useApplication';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Textarea } from './ui/textarea';

export default function ApplicationDialog({ open, setOpen, jobDocId }: any) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply for this job</DialogTitle>
            <DialogDescription>
              Please fill all the required fields.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm jobDocId={jobDocId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Apply for this job</DrawerTitle>
          <DrawerDescription>
            Please fill all the required fields.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm jobDocId={jobDocId} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const formSchema = z.object({
  interestReason: z
    .string()
    .min(1, { message: 'This field is required.' })
    .max(200, { message: 'Maximum 200 characters.' }),
  skills: z.string().min(1, { message: 'This field is required.' }),
  resume: z.any().nullable(),
});

function ProfileForm({ jobDocId }: any) {
  const router = useRouter();
  const [uploading, setUploading] = useState<boolean>(false);
  const [resumeId, setResumeId] = useState<number | null>(null);
  const { data: session }: any = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interestReason: '',
      skills: '',
      resume: null,
    },
  });

  async function handleFileUpload(file: File, jwt: string) {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('files', file);

      const uploadRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResumeId(uploadRes.data[0]?.id);
      toast.success('Resume uploaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  }

  const { mutate, isPending } = useCreateApplication();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const resume = resumeId ? [resumeId] : session?.user?.resume?.id || null;

    mutate(
      {
        interestReason: values?.interestReason,
        skills: values?.skills,
        resume,
        userId: session?.user?.id,
        token: session?.jwt,
        job: jobDocId,
      },
      {
        onSuccess: () => {
          toast.success('You have successfully applied for this job.');
          router.push('/jobs');
        },
        onError: () => {
          toast.error('Something went wrong. Please try again.');
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4 p-6 lg:px-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Interest */}
        <FormField
          control={form.control}
          name="interestReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why are you interested in this role?</FormLabel>
              <FormControl>
                <Textarea placeholder="Maximum 200 characters" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Skills */}
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What relevant skills/experience do you bring?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Separate your skills by comma"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resume Upload */}
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {session?.user?.resume ? (
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm">
                        Current Resume:{' '}
                        <a
                          className="text-blue-600 underline"
                          href={
                            process.env.NEXT_PUBLIC_API_URL +
                            session?.user?.resume?.url
                          }
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          View Resume
                        </a>
                      </p>
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 border-dashed bg-gray-50 p-4 text-gray-500 text-sm hover:bg-gray-100">
                        {field.value?.[0]?.name ||
                          'Click to upload your resume'}
                        <input
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              field.onChange(e.target.files);
                              await handleFileUpload(e.target.files[0], '');
                            }
                          }}
                          type="file"
                        />
                      </label>
                      <p className="text-gray-500 text-xs">
                        You can replace your existing resume.
                      </p>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 border-dashed bg-gray-50 p-4 text-gray-500 text-sm hover:bg-gray-100">
                      {field.value?.[0]?.name || 'Click to upload your resume'}
                      <input
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            field.onChange(e.target.files);
                            await handleFileUpload(e.target.files[0], '');
                          }
                        }}
                        type="file"
                      />
                    </label>
                  )}
                </div>
              </FormControl>
              {uploading && (
                <p className="mt-1 text-gray-500 text-sm">Uploading...</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          className="w-full"
          disabled={isPending || uploading}
          type="submit"
        >
          {isPending ? 'Submiting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
