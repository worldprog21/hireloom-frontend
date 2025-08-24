'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z
    .email({ message: 'Invalid email address.' })
    .min(1, { message: 'Email is required.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  resume: z.any().nullable(),
});

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [resumeId, setResumeId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      // Step 1: Register user
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
        {
          username: values.email,
          email: values.email,
          password: values.password,
        }
      );

      const { jwt, user } = res.data;

      // Step 2: Create user_detail linked to the user
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-details`,
        {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            user: user.documentId,
            resume: resumeId ? [resumeId] : [],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      toast.success('Registration successful!');
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.error?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-center bg-gray-100 pt-20">
        <form
          className="w-full max-w-sm space-y-4 rounded-md bg-white p-6 shadow-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume Uploader */}
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
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
                </FormControl>
                {uploading && (
                  <p className="mt-1 text-gray-500 text-sm">Uploading...</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>

          {/* Already have an account link */}
          <div className="mt-2 text-center">
            <span className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                className="font-medium text-blue-500 hover:underline"
                href="/login"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </Form>
  );
}
