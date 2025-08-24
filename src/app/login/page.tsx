'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
  email: z
    .email({ message: 'Invalid email address.' })
    .min(1, { message: 'Email is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        return toast.error(result?.error || 'Invalid email or password.');
      }

      toast.success('Login successful!');
      router.push('/jobs');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
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
          <h2 className="mb-4 font-semibold text-2xl">Login</h2>

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

          <Button className="w-full" disabled={loading} type="submit">
            {loading ? ' Logging in...' : 'Login'}
          </Button>

          {/* Don't have an account link */}
          <div className="mt-2 text-center">
            <span className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link
                className="font-medium text-blue-500 hover:underline"
                href="/signup"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </Form>
  );
}
