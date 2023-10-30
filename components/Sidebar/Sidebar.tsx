'use client';
import {
  AlertCircle,
  Check,
  CheckCheck,
  CheckCircle,
  LogOut,
  LucideProps,
  Search,
} from 'lucide-react';
import ThemeButton from '../ThemeButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { nameToInitials } from '@/lib/utils';
import { Logo } from '../ui/logo';
import { Input } from '../ui/input';
import ChatSection from './Chats/ChatSection';
import { signOut, useSession } from 'next-auth/react';

export default function Sidebar() {
  return (
    <div className='flex w-[33%] min-w-[300px] max-w-[400px] flex-col justify-between border-r backdrop-blur-2xl'>
      <div className='border-bpx-4 flex h-16 items-center justify-between border-b px-4 py-2'>
        <Logo size={125} />
      </div>
      <div className='flex w-[100%] flex-1 flex-col'>
        <div className='border-b p-2'>
          <Input
            startIcon={<Search className='h-4 w-4' />}
            type='text'
            placeholder='Search'
            className='h-8'
          />
        </div>
        {/* <ChatSection /> */}
        <div className='no-scrollbar flex max-h-[calc(100vh-168px)] w-[100%] flex-1 flex-col overflow-y-auto'></div>
      </div>
      {/* footer */}
      <div className=' absolute bottom-0 flex h-16 w-full items-center justify-between border-t bg-background px-4 py-2'>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-2 text-sm font-medium'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='{user?.photoURL!}' />
              <AvatarFallback>
                {nameToInitials('Sandesh Pandey')}
              </AvatarFallback>
            </Avatar>
            Sandesh Pandey
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className='h-4' />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeButton />
      </div>
    </div>
  );
}
