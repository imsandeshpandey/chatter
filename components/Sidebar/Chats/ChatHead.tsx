'use client';
import { cn, createQueryString, nameToInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, CalendarDays, Check, CheckCheck } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../ui/hover-card';
import { useCallback, useEffect, useState } from 'react';
import {
  Timestamp,
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '@/firebase/App';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import { useUser } from '@/firebase/firebase.functions';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const statusIcons = {
  failed: AlertCircle,
  sent: Check,
  seen: CheckCheck,
};

const StatusIcon = ({
  status,
  className,
}: {
  status: keyof typeof statusIcons;
  className?: string;
}) => {
  const Component = statusIcons[status];
  return (
    <Component
      className={cn('h-4 w-4 text-muted-foreground', className, {
        'text-info': status === 'seen',
        'text-primary': status === 'failed',
      })}
    />
  );
};

type ChatHeadType = {
  uid: string;
  className?: string;
  active?: boolean;
};

type ChatDataType = {
  text?: string;
  createdAt: Timestamp;
  seen?: boolean;
  sender: string;
};

const ChatHead = ({ uid, className, active }: ChatHeadType) => {
  const [currentUser] = useAuthState(auth);
  const [chatData, setChatData] = useState<ChatDataType>();
  const [userData] = useUser(uid);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = query(
    collection(db, 'messages'),
    where(`scope.${uid}`, '==', true),
    where(`scope.${currentUser?.uid}`, '==', true),
    limit(1),
  );

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs[0].data() as ChatDataType;
      setChatData(data);
    });
    return unsub;
  }, [currentUser]);

  const AvatarComponent = ({ size = 10 }: { size?: number | string }) => (
    <Avatar className={`w-${size} h-${size}`}>
      <AvatarImage src={userData?.photoURL} />
      <AvatarFallback>
        {nameToInitials(userData?.displayName as string)}
      </AvatarFallback>
    </Avatar>
  );

  const SkeletonComponent = () => {
    return (
      <div
        className={cn(
          'flex cursor-pointer gap-3 border-b px-4 py-4',
          className,
          {
            'bg-secondary': active,
          },
        )}
      >
        <Skeleton className='h-10 w-10 rounded-full' />
        <div className='flex flex-1 flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-24' />
            <span className=' text-xs text-gray-500'>
              <Skeleton className='h-3 w-8' />
            </span>
          </div>
          <div className='flex gap-1'>
            <Skeleton className='h-3 w-20' />
          </div>
        </div>
      </div>
    );
  };

  const handleClick = useCallback(
    () =>
      router.push(
        `${pathname}?${createQueryString('user', uid, searchParams)}`,
      ),
    [],
  );

  return userData ? (
    <HoverCard>
      <div
        onClick={handleClick}
        className={cn(
          'flex cursor-pointer gap-3 border-b px-4 py-4',
          className,
          {
            'bg-secondary': active,
          },
        )}
      >
        <HoverCardTrigger>
          <AvatarComponent />
        </HoverCardTrigger>
        <div className='flex flex-1 flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>{userData?.displayName}</span>
            <span className=' text-xs text-gray-500'>
              {moment(chatData?.createdAt.toDate()).format('DD/MM/YYYY')}
            </span>
          </div>
          <div className='flex gap-1'>
            {chatData?.sender !== currentUser?.uid && (
              <StatusIcon status={chatData?.seen ? 'seen' : 'sent'} />
            )}
            <p className='text-xs text-muted-foreground'>{chatData?.text}</p>
          </div>
        </div>
      </div>
      <HoverCardContent className='max-w-fit'>
        <div className='flex gap-4'>
          <AvatarComponent size={12} />
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>{userData?.displayName}</h4>
            <div className='flex items-center pt-2'>
              <CalendarDays className='mr-2 h-4 w-4 opacity-70' />
              <span className='text-xs text-muted-foreground'>
                Joined {moment(userData?.createdAt.toDate()).format('MMM yyyy')}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ) : (
    <SkeletonComponent />
  );
};

export default ChatHead;
