'use client';
import dynamic from 'next/dynamic';

import ActionsButtonsFilm from '@/components/Shared/ActionsButtonsFilm';
import { ChaptersInfo } from '@/components/Shared/ChaptersInfo';
import { FilmGenres } from '@/components/Shared/FilmGenres';
import { PopularMovie } from '@/prisma/types';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type InfoExtraFilmProps = {
  movie: PopularMovie;
};

export function InfoExtraFilm(props: InfoExtraFilmProps) {
  const { movie } = props;

  return (
    <div
      className='opacity-0 absolute top-0 transition-all duration-300 z-10
  delay-300 w-full bg-zinc-900 rounded-lg scale-0 
  group-active:scale-100 group-hover:scale-100 group-hover:md:scale-150 group-hover:lg:scale-150  
  group-active:-translate-y-[5vw] group-hover:-translate-y-[5vw]
  group-active:opacity-100 group-hover:opacity-100'
    >
      <div className='aspect-video'>
        <ReactPlayer
          url={movie.trailerVideo}
          loop={true}
          width='100%'
          height='100%'
          playing={true}
          muted={true}
          controls={false}
        />
      </div>

      <div className='p-4 shadow-lg'>
        <ActionsButtonsFilm idFilm={movie.id} />

        <ChaptersInfo age={movie.age} duration={movie.duration} />

        <FilmGenres genres={movie.genre} />
      </div>
    </div>
  );
}
