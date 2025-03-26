import { auth } from '@/auth';
import Navbar from '@/components/Shared/Navbar/Navbar';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import SliderVideo from './(home)/components/SliderVideo/SliderVideo';
import TrendingMovies from './(home)/components/TrendingMovies';

export default async function Home() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect('/login');
  }

  const usersNetflix = await db.userNetflix.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const movies = await db.movie.findMany();
  const trendingMovies = await db.popularMovie.findMany({
    orderBy: {
      ranking: 'asc',
    },
    take: 10,
  });

  return (
    <div className='relative bg-zinc-900'>
      <Navbar users={usersNetflix} />
      <SliderVideo />
      <TrendingMovies movies={trendingMovies} />
    </div>
  );
}
