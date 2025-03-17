import { Button } from '@/components/ui/button';
import { Info, Play } from 'lucide-react';

const SliderVideo = () => {
  return (
    <div className='relative w-full -[80vw] md:h-[56.25vw] lg:h-[45vw]'>
      <video
        autoPlay
        muted
        loop
        className='brightness-50 object-fill w-full h-[80vw] md:h-[56.25vw] lg:h-[45vw]'
        src='/videos/video-trailer--test.mp4'
      />
      <div className='justify-center absolute flex flex-col  w-full md:w-[36%] px-4 md:px-0 md:left-[4%] z-20 top-0 -bottom-0 md:botton-[36%]'>
        <div className='pt-24 md:pt-0'>
          <h2 className='text-2xl md:text-5xl lg:text-8xl font-bold drop-shadow-xl'>
            Lochflix
          </h2>
          <p className='max-w-md mt-2 text-xs md:text-base'>
            Mira peliculas y series en cualquier lugar. Cancela cuando quieras.
          </p>
          <div className='flex flex-col md:flex-row gap-4 mt-5'>
            <Button
              size='lg'
              variant={'secondary'}
              className='bg-white text-black hover:bg-white/80 rounded'
            >
              <Play className='h-6 w-6 mr-2 fill-black' />
              Reproducir
            </Button>
            <Button
              size='lg'
              className='bg-gray-500/50 hover:bg-gray-500/40 rounded'
            >
              <Info className='h-6 w-6 mr-2' />
              Más informacion
            </Button>
          </div>
        </div>
      </div>
      <div
        className='bg-transparent bg-no-repeat bg-contain w-full opacity-100 top-auto h-[14.7vw] 
      -bottom-16 absolute'
        style={{
          background:
            'linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0, hsla(0, 0%, 8%, .15) 15%, hsla(0, 0%, 8%, .35) 29%, hsla(0, 0%, 8%, .58) 44%, #171717 68%, #171717)',
        }}
      />
    </div>
  );
};

export default SliderVideo;
