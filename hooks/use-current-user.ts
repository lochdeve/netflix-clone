import { UserNetflix } from '@prisma/client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UseCurrentUser {
  currentUser: UserNetflix | null;
  changeCurrentUser: (user: UserNetflix) => void;
}

export const useCurrentNetflixUser = create(
  persist<UseCurrentUser>(
    (set) => ({
      currentUser: null,
      changeCurrentUser: (data: UserNetflix) => set({ currentUser: data }),
    }),
    {
      name: 'current-netflix-user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
