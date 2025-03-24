'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { dataMovies } from './NormalMovie.data';

const NormalMovie = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadMovies = async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/create-movies', {
        movies: dataMovies,
      });
      toast.success('Películas subidas con éxito');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className='border rounded-lg border-white-400 p-6 hover:bg-[#E50914] transition-all duration-300'>
      <h1 className='text-xl font-bold mb-4'>Películas normales</h1>
      <Button
        className='w-full border border-white hover:bg-white hover:text-black cursor-pointer'
        onClick={uploadMovies}
        disabled={isLoading}
      >
        Subir películas
        <Upload className='w-4 h-4 ml-2' />
      </Button>
    </div>
  );
};

export default NormalMovie;
