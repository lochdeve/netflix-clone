'use client';

import { PopularMovie } from '@/prisma/types';
import Image from 'next/image';
import { useState } from 'react';
import { InfoExtraFilm } from './InfoExtraFilm';
// import { InfoExtraFilm } from './InfoExtraFilm';

type TrendingMoviesProps = {
  movies: PopularMovie[];
};

const TrendingMovies = (props: TrendingMoviesProps) => {
  const { movies } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='pt-11 pb-18 lg:pb-0 lg:pt-0  md:-top-24 lg:-top-28 relative px-[4%]'>
      <h3 className='text-2xl font-semibold mb-3'>
        Las series más populares hoy en este país: España
      </h3>

      <div>
        <div className='grid sm:grid-cols-2 md:grid-cols-5 gap-4'>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className='cursor-pointer transition delay-300 group relative active:h-[14vh] md:hover:h-[14vh]'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className='flex transition duration 
              group-hover:opacity-90 group-active:opacity-90 delay-300 w-full justify-center'
              >
                <Image
                  src={`https://raw.githubusercontent.com/ratasi/images-netflix-clone/refs/heads/main/ranking/${movie.ranking}.png`}
                  alt='Number'
                  width={116}
                  height={150}
                  className='h-auto w-auto lg:max-h-full'
                />
                <Image
                  src={movie.thumbnailUrl}
                  alt='Image'
                  width={116}
                  height={150}
                  className='h-auto w-auto md:max-h-[180px] lg:max-h-full'
                />
              </div>
              <InfoExtraFilm movie={movie} isHovered={isHovered} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
