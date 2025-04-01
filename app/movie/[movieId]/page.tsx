import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { MovieVideo } from './components/MovieVideo';
import { NavbarFilm } from './components/NavbarFilm';

export default async function MovieIdPage({
  params,
}: {
  params: { movieId: string };
}) {
  // Esperamos correctamente el objeto params completo antes de acceder a sus propiedades
  const resolvedParams = await params;
  const movieId = resolvedParams.movieId;

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
