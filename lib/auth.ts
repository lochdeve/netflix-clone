import { auth } from '@/auth';

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session.user;
};
