'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentNetflixUser } from '@/hooks/use-current-user';
import { UserNetflix } from '@prisma/client';
import { ChevronDown, LogOut, Pencil } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type SelectorProfileProps = {
  users: UserNetflix[];
};

const SelectorProfile = ({ users }: SelectorProfileProps) => {
  const router = useRouter();
  const { changeCurrentUser, currentUser } = useCurrentNetflixUser();

  const onChangeUser = (user: UserNetflix) => {
    changeCurrentUser(user);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex gap-1 items-center cursor-pointer'>
          <Image
            src={
              currentUser ? currentUser?.avatarUrl : '/profiles/profile-1.png'
            }
            alt='Profile image'
            width={35}
            height={35}
          />
          <ChevronDown className='' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-black/80 w-56 p-2 border-transparent flex flex-col gap-2'>
        {users.map((user) => (
          <DropdownMenuItem
            className='hover:bg-white hover:text-black transition-all duration-300'
            key={user.id}
            onClick={() => onChangeUser(user)}
          >
            <Image
              src={user.avatarUrl}
              alt='Profile image'
              width={35}
              height={35}
            />
            <p className=' group-hover:text-black'>{user.profileName}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className='hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'
          onClick={() => {
            router.push('/profiles');
          }}
        >
          <Pencil className='w-4 h-4' />
          <p>Administrar perfiles</p>
        </DropdownMenuItem>
        <div
          onClick={() => {
            signOut();
          }}
        >
          <DropdownMenuItem className='hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>
            <LogOut className='w-4 h-4' />
            Cerrar sesión
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectorProfile;
