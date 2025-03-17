import Navbar from '@/components/Shared/Navbar/Navbar';
import SliderVideo from './(home)/components/SliderVideo/SliderVideo';

export default function Home() {
  return (
    <div className='relative bg-zinc-900'>
      <Navbar />
      <SliderVideo />
    </div>
  );
}
