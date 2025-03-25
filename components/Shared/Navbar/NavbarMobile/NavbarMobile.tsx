import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { itemsNavbar } from '@/data/itemsNavbar';
import { UserNetflix } from '@prisma/client';
import { BellRing, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import Logo from '../../Logo/Logo';
import SelectorProfile from '../SelectorProfile';

type NavbarMobileProps = {
  users: UserNetflix[];
};

const NavbarMobile = ({ users }: NavbarMobileProps) => {
  return (
    <div className='p-4 flex justify-between'>
      <Logo />

      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className='bg-black'>
          <SheetTitle className='flex justify-center p-2'>
            <Logo />
          </SheetTitle>
          <div className='flex flex-col gap-4 pt-6 px-6'>
            {itemsNavbar.map((item) => (
              <Link
                href={item.link}
                key={item.name}
                className='hover:text-gray-300 transition-all duration-300'
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className='border-[1px] border-white/70 my-2 mx-6' />
          <div className='flex justify-between gap-6 mt-2 mx-6'>
            <Search className='cursor-pointer' />
            <BellRing className='cursor-pointer' />
            <SelectorProfile users={users} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarMobile;
