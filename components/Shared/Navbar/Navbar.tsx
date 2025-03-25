import { UserNetflix } from '@prisma/client';
import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';

type NavbarProps = {
  users: UserNetflix[];
};

const Navbar = ({ users }: NavbarProps) => {
  return (
    <nav>
      <div className='hidden mx-auto md:block'>
        <NavbarDesktop users={users} />
      </div>
      <div className='md:hidden'>
        <NavbarMobile users={users} />
      </div>
    </nav>
  );
};

export default Navbar;
