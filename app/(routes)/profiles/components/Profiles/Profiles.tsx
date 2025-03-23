'use client';

import axios from 'axios';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCurrentNetflixUser } from '@/hooks/use-current-user';
import { UserNetflix } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AddProfile } from './AddProfile/AddProfile';
import { ProfilesProps } from './Profiles.types';

export function Profiles(props: ProfilesProps) {
  const { users } = props;
  const { changeCurrentUser } = useCurrentNetflixUser();

  const [manageProfiles, setManageProfiles] = useState(false);
  const router = useRouter();

  const onClickUser = (user: UserNetflix) => {
    changeCurrentUser(user);
    router.push('/');
  };

  const deleteUser = async (userIdNetflix: string) => {
    try {
      axios.delete('/api/userNetflix', { data: { userIdNetflix } });
      setManageProfiles(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Ops! Ha ocurrido un error');
    }
  };

  return (
    <div>
      <div className='flex gap-7'>
        {users.map((user) => (
          <div
            key={user.id}
            className='text-center relative cursor-pointer'
            onClick={() => onClickUser(user)}
          >
            <Image
              src={user.avatarUrl || ''}
              alt={`Profile Image ${user.profileName}`}
              width={140}
              height={140}
              className={cn(
                manageProfiles ? 'blur-md' : '',
                'border-transparent hover:border-2 hover:border-white rounded-md'
              )}
            />
            <p className='mt-2 text-gray-500 uppercase text-lg'>
              {user.profileName}
            </p>

            <div
              className={cn(
                'top-14 cursor-pointer w-full flex gap-4 items-center justify-center z-20',
                manageProfiles ? 'absolute' : 'hidden'
              )}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className='bg-white rounded-full hover:bg-red-100 p-1'>
                    <Trash2 className='w-6 h-6 text-red-500' />
                  </div>
                </DialogTrigger>
                <DialogContent className='bg-zinc-900'>
                  <DialogHeader>
                    <DialogTitle>
                      ¿Seguro que quieres eliminar este perfil?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose className='cursor-pointer'>Volver</DialogClose>
                    <Button
                      className='text-red-500 border-red-500 border cursor-pointer'
                      onClick={() => deleteUser(user.id)}
                    >
                      Eliminar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}

        <AddProfile />
      </div>

      <div className='mt-16 flex items-center justify-center'>
        <Button
          variant='outline'
          size='lg'
          className='text-gray-500 border-gray-500'
          onClick={() => setManageProfiles(!manageProfiles)}
        >
          Administrar perfiles
        </Button>
      </div>
    </div>
  );
}
