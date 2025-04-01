import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Movie } from '@/prisma/types';
import { toast } from 'sonner';
import { useCurrentNetflixUser } from './use-current-user';

interface UseAddFilmMyList {
  lovedFilmsByUser: { [userId: string]: Movie[] };
  addLovedFilm: (data: Movie) => void;
  removeLovedItem: (id: string) => void;
}

export const useLovedFilms = create(
  persist<UseAddFilmMyList>(
    (set, get) => ({
      lovedFilmsByUser: {},

      addLovedFilm: (data: Movie) => {
        const { currentUser } = useCurrentNetflixUser.getState(); // Get the current user

        if (!currentUser) {
          return toast.error('Ningún usuario seleccionado 🙋‍♂️');
        }

        const currentLovedItems = get().lovedFilmsByUser[currentUser.id] || [];
        const existingItem = currentLovedItems.find(
          (item: Movie) => item.id === data.id
        );

        if (existingItem) {
          return toast.error('La película ya está en tu lista 😊');
        }

        set({
          lovedFilmsByUser: {
            ...get().lovedFilmsByUser,
            [currentUser.id]: [...currentLovedItems, data],
          },
        });

        toast.success('Película añadida a tu lista 🚀');
      },

      removeLovedItem: (id: string) => {
        const { currentUser } = useCurrentNetflixUser.getState();

        if (!currentUser) {
          return toast.error('Ningún usuario seleccionado 🙋‍♂️');
        }

        const currentLovedItems = get().lovedFilmsByUser[currentUser.id] || [];

        set({
          lovedFilmsByUser: {
            ...get().lovedFilmsByUser,
            [currentUser.id]: currentLovedItems.filter(
              (item) => item.id !== id
            ),
          },
        });

        toast.success('La película ha sido eliminada de tu lista 😢');
      },
    }),
    {
      name: 'add-loved-films-by-user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
