import React, { useEffect, useState } from 'react';
import ChatHead from './ChatHead';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/firebase/App';

const ChatSection = () => {
  const [friends, setFriends] = useState<Array<string> | undefined>();
  const [user] = useAuthState(auth);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user?.uid as string), (res) => {
      const data = res.data();
      setFriends(data?.friends);
    });
    return unsub;
  }, []);
  return <>{friends?.map((uid, i) => <ChatHead key={i} uid={uid} />)}</>;
};

export default ChatSection;
