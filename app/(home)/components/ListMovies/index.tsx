'use client';

import { BlockMovies } from '@/components/Shared/BlockMovies';
import { useCurrentNetflixUser } from '@/hooks/use-current-user';
import { useLovedFilms } from '@/hooks/useLovedFilms';

import { Movie } from '@prisma/client';

type ListMoviesProps = {
  movies: Movie[];
};

export function ListMovies(props: ListMoviesProps) {
  const { movies } = props;
  const { lovedFilmsByUser } = useLovedFilms();
  const { currentUser } = useCurrentNetflixUser();

  const userNetflix = currentUser?.id;
  const lovedFilms = userNetflix ? lovedFilmsByUser[userNetflix] : [];

  return (
    <div>
      <BlockMovies
        title='Películas favoritas'
        movies={lovedFilms}
        isMyList={true}
      />
      <BlockMovies
        title='Películas más recientes'
        movies={movies}
        isMyList={false}
      />
    </div>
  );
}
