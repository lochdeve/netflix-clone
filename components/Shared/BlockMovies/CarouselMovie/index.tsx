import Image from 'next/image';

import { Movie } from '@/prisma/types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { FilmGenres } from '../../FilmGenres';
import { ActionsButtons } from './ActionsButtons';
import { ChaptersInfo } from './ChaptersInfo';
import './index.css';

type CarouselMovieProps = {
  movies: Movie[];
  isMyList: boolean;
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

export function CarouselMovie(props: CarouselMovieProps) {
  const { movies, isMyList } = props;

  return (
    <Slider className='carousel-container' {...settings}>
      {movies.map((movie, index) => (
        <div
          key={`${movie.id}-${index}`}
          className='flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 px-1 group'
        >
          {/* Contenedor principal que mantiene el aspect ratio */}
          <div className='card-content'>
            {/* Imagen principal */}
            <Image
              src={movie.thumbnailUrl}
              alt='Movie thumbnail'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw'
              className='object-cover rounded-md'
            />

            {/* Contenido en hover */}
            <div className='hover-content'>
              <div className='bg-zinc-900 rounded-md overflow-hidden shadow-lg'>
                <div className='relative aspect-video'>
                  <Image
                    src={movie.thumbnailUrl}
                    alt='Movie preview'
                    fill
                    className='object-cover'
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
        </div>
      ))}
    </Slider>
  );
}
