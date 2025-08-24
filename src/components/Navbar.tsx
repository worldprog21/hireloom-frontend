'use client';

import { BriefcaseIcon, Unlock, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-[#FAFCFF] py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 lg:px-0">
        {/* Logo */}
        <Link
          className="flex items-center space-x-1 font-medium text-xl"
          href="/"
        >
          <span className="font-bold text-black">Hireloom</span>
          <span className="text-black">|</span>
          <span className="text-black">Timeless hiring</span>
        </Link>

        {/* Right Side: Jobs & Me */}
        <div className="flex items-center space-x-6">
          <Link
            className="flex flex-col items-center gap-0 font-medium text-blue-600 text-sm hover:underline"
            href="/jobs"
          >
            <BriefcaseIcon className="h-4 w-4" />
            Jobs
          </Link>

          {!session?.user && status !== 'loading' && (
            <Link
              className="flex flex-col items-center gap-0 font-medium text-sm hover:underline"
              href="/login"
            >
              <Unlock className="h-4 w-4" />
              Login
            </Link>
          )}

          {session?.user && status === 'authenticated' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex flex-col items-center gap-0 text-sm"
                  variant="ghost"
                >
                  <UserIcon className="h-4 w-4" />
                  Me
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
