import { Logo } from "@/components/ui/logo";
import SignInButton from "./SignInButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { ShieldAlert } from 'lucide-react';
// import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
// import { auth, db } from '@/firebase/App';
// import { useState } from 'react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Spinner } from '@/components/ui/loader';

export default function LoginPage({
  searchParams: { callbackUrl = "/" },
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <div className="bg-end flex h-screen w-screen flex-col items-center justify-center gap-5 bg-topo bg-cover bg-center">
      <Logo size={300} />
      <SignInButton callbackUrl={callbackUrl} />
      {/* {err && (
        <Alert className=' max-w-xs bg-destructive '>
          <ShieldAlert className='h-6 w-6' />
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      )} */}
    </div>
  );
}

// const signIn = () => {
//   setLoading(true);
//   googleSignIn()
//     .then(async (userCred) => {
//       const userExists = Boolean(
//         await getDoc(doc(db, 'users', userCred?.user.uid as string)),
//       );
//       const { displayName, uid, photoURL, emailVerified, email } =
//         userCred?.user as User;
//       if (!userExists) {
//         setDoc(doc(db, 'users', uid), {
//           uid,
//           displayName,
//           emailVerified,
//           photoURL,
//           email,
//           friends: [],
//           createdAt: serverTimestamp(),
//         });
//       } else {
//         updateDoc(doc(db, 'users', uid), {
//           email,
//           displayName,
//           photoURL,
//         });
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//       setErr(e.message);
//       setLoading(false);
//     });
// };
