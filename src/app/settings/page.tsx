'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateUserDetails } from '@/hooks/queries/useUserDetails';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z
    .email({ message: 'Invalid email address.' })
    .min(1, { message: 'Email is required.' }),
  resume: z.any().nullable(),
});

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, update }: any = useSession();
  const [uploading, setUploading] = useState<boolean>(false);
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [fullResume, setFullResume] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: session?.user?.firstName || '',
      lastName: session?.user?.lastName || '',
      email: session?.user?.email || '',
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
      setFullResume(uploadRes.data[0]);
      toast.success('Resume uploaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  }

  const { mutate, isPending } = useUpdateUserDetails();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const resume = resumeId ? [resumeId] : session?.user?.resume?.id || null;

    mutate(
      {
        firstName: values?.firstName,
        lastName: values?.lastName,
        resume,
        token: session?.jwt,
        documentId: session?.user?.userDetailDocId,
      },
      {
        onSuccess: async () => {
          toast.success('You have successfully updated your profile details.');

          // Update session fields manually
          await update({
            firstName: values.firstName,
            lastName: values.lastName,
            resume: resumeId ? fullResume : session?.user?.resume || null,
          });

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
      <div className="px-4 py-8 font-sans">
        <form
          className="container mx-auto max-w-lg space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="mb-5 flex-grow">
            <h1 className="font-bold text-2xl text-gray-900 leading-tight md:text-3xl">
              Settings
            </h1>
            <p className="text-base text-gray-600">
              Update your profile settings
            </p>
          </div>

          {/* form fields */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} disabled />
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
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </Form>
  );
}
