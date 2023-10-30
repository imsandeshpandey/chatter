import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { nameToInitials } from '@/lib/utils'
import { Info, Plus, Send } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home(): Promise<JSX.Element> {
  const session = await getServerSession()
  const isAuthorized = Boolean(session?.user)
  !isAuthorized && redirect('/signIn')
  const user = {
    photoURL: 'haha',
    displayName: 'Sandesh Pandey'
  }
  return user ? (
    <div className='flex-1'>
      <div className='flex h-full flex-col justify-between'>
        <div className='flex h-16 w-full items-center justify-between border-b px-4 py-2'>
          <div className='flex items-center text-lg font-medium'>
            <Avatar className='mr-3 h-10 w-10'>
              <AvatarImage src={user.photoURL} />
              <AvatarFallback>
                {nameToInitials(user.displayName)}
              </AvatarFallback>
            </Avatar>
            {user.displayName}
          </div>
          <Button size='icon' variant='ghost'>
            <Info />
          </Button>
        </div>
        <div className='flex h-16 w-full items-center justify-between gap-4 border-t px-4 py-2'>
          <Input
            placeholder='Message'
            wrapperClass='flex-1'
            className='rounded-3xl bg-secondary'
          />
          <Button
            variant='ghost'
            className='rounded-3xl px-4 py-2 text-primary hover:text-primary'
          >
            <Send className='mr-1 rotate-45' />
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className='m-auto flex max-w-[280px] select-none gap-2 rounded-md border px-2 py-2 text-sm font-medium text-gray-500'>
      <Plus className=' w-10' /> Start a conversation by clicking any of your
      friends profile
    </div>
  )
}
