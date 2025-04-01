import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { MovieVideo } from './components/MovieVideo';
import { NavbarFilm } from './components/NavbarFilm';

interface PageProps {
  params: {
    movieId: string;
  };
}

export default async function MovieIdPage({ params }: PageProps) {
  const { movieId } = params;
  console.log({ movieId });

  const movieFilm = await db.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  const popularMovie = await db.popularMovie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!movieFilm && !popularMovie) {
    redirect('/');
  }

  const currentMovie = movieFilm
    ? movieFilm.movieVideo
    : popularMovie
    ? popularMovie.movieVideo
    : '';

  const titleMovie = movieFilm
    ? movieFilm.title
    : popularMovie
    ? popularMovie.title
    : '';

  return (
    <div className='h-screen w-full bg-black'>
      <NavbarFilm titleMovie={titleMovie} />
      <MovieVideo currentMovie={currentMovie} />
    </div>
  );
}
