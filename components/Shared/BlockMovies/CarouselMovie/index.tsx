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
  arrows: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
  ],
};

export function CarouselMovie(props: CarouselMovieProps) {
  const { movies, isMyList } = props;

  return (
    <div className='carousel-wrapper'>
      <Slider className='carousel-container' {...settings}>
        {movies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className='flex-shrink-0 w-full px-1 group'
          >
            {/* Contenedor principal que mantiene el aspect ratio */}
            <div className='card-content'>
              {/* Imagen principal */}
              <Image
                src={movie.thumbnailUrl}
                alt='Movie thumbnail'
                fill
                sizes='(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw'
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
    </div>
  );
}
