import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProtectedRoute() {
  const session = await getServerSession();
  const isAuthorized = Boolean(session?.user);
  !isAuthorized && redirect('api/auth/signin');
  return <div>This is a protected route.</div>;
}
