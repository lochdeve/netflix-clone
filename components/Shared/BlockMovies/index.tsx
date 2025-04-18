import { Movie } from '@/prisma/types';
import { CarouselMovie } from './CarouselMovie';

type BlockMoviesProps = {
  title: string;
  movies: Movie[];
  isMyList: boolean;
};

export function BlockMovies(props: BlockMoviesProps) {
  const { title, movies, isMyList } = props;

  if (!movies || movies.length === 0) return null;

  return (
    <div className='-top-16 relative px-[4%] md:pt-20 overflow-hidden bg-[#171717]'>
      <h3 className='text-2xl font-semibold mb-3'>{title}</h3>
      <CarouselMovie movies={movies} isMyList={isMyList} />
    </div>
  );
}
