'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/App';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useState } from 'react';
const PrivateRoute: React.FC<{ children: React.ReactNode | null }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();
  const pathname = window.location.pathname;
  onAuthStateChanged(auth, (u) => {
    setUser(u);
    !u ? router.replace('/login') : router.replace('/');
  });
  return user ? children : null;
};

export default PrivateRoute;
