import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Movie } from '@prisma/client';
import { FilmGenres } from '../../FilmGenres';
import { ActionsButtons } from './ActionsButtons';
import { ChaptersInfo } from './ChaptersInfo';

type CarouselMovieProps = {
  movies: Movie[];
  isMyList: boolean;
};

export function CarouselMovie(props: CarouselMovieProps) {
  const { movies, isMyList } = props;

  // Duplicamos las películas para asegurar que hay suficientes para llenar el carrusel
  const displayMovies = movies.length < 6 ? [...movies, ...movies] : movies;

  return (
    <div className='relative w-full'>
      <Carousel
        className='w-full'
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
          containScroll: 'trimSnaps',
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className='gap-2 overflow-hidden'>
          {displayMovies.map((movie, index) => (
            <CarouselItem
              key={`${movie.id}-${index}`}
              className='pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 transition group relative'
            >
              <div className='relative overflow-visible'>
                {/* Tarjeta normal (siempre visible) */}
                <Card className='cursor-pointer transition duration-300 group relative border-0 overflow-hidden'>
                  <CardContent className='flex aspect-video items-center justify-center p-0 relative border-0 rounded-md bg-zinc-900'>
                    <Image
                      src={movie.thumbnailUrl}
                      alt='Image'
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw'
                      className='rounded-md object-cover'
                    />
                  </CardContent>
                </Card>

                {/* Overlay en hover */}
                <div
                  className='absolute inset-0 opacity-0 invisible sm:visible 
                  group-hover:opacity-100 group-hover:z-20 transition-all duration-300
                  -mx-1 -my-1 group-hover:mx-0 group-hover:my-0 group-hover:shadow-xl'
                >
                  <div className='bg-zinc-900 rounded-md overflow-hidden w-full h-full'>
                    <div className='relative w-full aspect-video'>
                      <Image
                        src={movie.thumbnailUrl}
                        alt='Movie'
                        fill
                        className='w-full object-cover'
                      />
                    </div>
                    <div className='p-3 text-sm'>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='absolute z-10 top-1/2 -translate-y-1/2 flex justify-between w-full px-4'>
          <CarouselPrevious className='h-8 w-8 absolute left-0 bg-black/60 hover:bg-black/80 border-0 rounded-full shadow-md' />
          <CarouselNext className='h-8 w-8 absolute right-0 bg-black/60 hover:bg-black/80 border-0 rounded-full shadow-md' />
        </div>
      </Carousel>
    </div>
  );
}
