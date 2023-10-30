'use client';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import google from '@/assets/icons/google.png';
import { Spinner } from '@/components/ui/loader';
import { useRouter } from 'next/navigation';

const SignInButton = ({ callbackUrl }: { callbackUrl: string }) => {
  const session = useSession();
  const router = useRouter();
  const authenticated = session.status == 'authenticated';
  authenticated && router.replace(callbackUrl);
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant='outline'
      className='flex gap-2'
      onClick={() => {
        setLoading(true);
        signIn('google');
        router.replace(callbackUrl);
        setTimeout(() => setLoading(false), 5000);
      }}
    >
      {!loading ? (
        <Image src={google} alt='google-logo' width={20} height={20} />
      ) : (
        <Spinner size='sm' />
      )}
      <p className='font-semibold'>Sign in with Google</p>
    </Button>
  );
};

export default SignInButton;
