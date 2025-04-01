import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { Movie } from '@/prisma/types';
import { FilmGenres } from '../../FilmGenres';
import { useCarousel } from '../../hooks/useCarousel';
import { ActionsButtons } from './ActionsButtons';
import { ChaptersInfo } from './ChaptersInfo';

type CarouselMovieProps = {
  movies: Movie[];
  isMyList: boolean;
};

export function CarouselMovie(props: CarouselMovieProps) {
  const { movies, isMyList } = props;

  // Utilizamos nuestro hook personalizado
  const {
    carouselRef,
    showLeftArrow,
    showRightArrow,
    scrollByCard,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getDisplayItems,
  } = useCarousel({
    scrollPercentage: 0.75,
    dragSpeed: 1.5,
    minItems: 6,
    cardsToScroll: 1,
  });

  // Duplicamos las películas si es necesario usando la función del hook
  const displayMovies = getDisplayItems(movies);

  return (
    <div className='relative w-full'>
      {/* Contenedor principal del carrusel */}
      <div
        ref={carouselRef}
        className='flex overflow-x-scroll no-scrollbar gap-2 scroll-smooth transition-all pb-1'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {displayMovies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className='flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 px-1 group relative'
            style={{ margin: '0 2px' }}
          >
            {/* Contenido normal (visible siempre) */}
            <div className='relative cursor-pointer overflow-hidden rounded-md aspect-video'>
              <Image
                src={movie.thumbnailUrl}
                alt='Movie thumbnail'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw'
                className='object-cover rounded-md transition-transform duration-300 group-hover:scale-105'
              />
            </div>

            {/* Contenido en hover */}
            <div
              className='absolute inset-0 opacity-0 invisible md:visible scale-100 
                group-hover:opacity-100 group-hover:scale-105 group-hover:z-10 
                transition-all duration-300 origin-center transform overflow-visible'
            >
              <div className='bg-zinc-900 rounded-md overflow-hidden shadow-lg w-full'>
                <div className='relative w-full aspect-video'>
                  <Image
                    src={movie.thumbnailUrl}
                    alt='Movie preview'
                    fill
                    className='object-cover w-full'
                  />
                </div>
                <div className='p-3 space-y-2'>
                  <ActionsButtons
                    movieId={movie.id}
                    movie={movie}
                    isMyList={isMyList}
                  />
                  <ChaptersInfo age={movie.age} duration={movie.duration} />
                  <FilmGenres genres={movie.genre} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      {showLeftArrow && (
        <button
          onClick={() => scrollByCard('left')}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors'
          aria-label='Ver película anterior'
        >
          <ArrowLeft size={24} />
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={() => scrollByCard('right')}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors'
          aria-label='Ver siguiente película'
        >
          <ArrowRight size={24} />
        </button>
      )}

      {/* Gradiente para suavizar los bordes */}
      <div className='absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20'></div>
      <div className='absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20'></div>
    </div>
  );
}
