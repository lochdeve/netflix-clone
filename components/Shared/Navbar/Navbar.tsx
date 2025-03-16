import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';
const Navbar = () => {
  return (
    <nav>
      <div className='hidden mx-auto md:block'>
        <NavbarDesktop />
      </div>
      <div className='md:hidden'>
        <NavbarMobile />
      </div>
    </nav>
  );
};

export default Navbar;
