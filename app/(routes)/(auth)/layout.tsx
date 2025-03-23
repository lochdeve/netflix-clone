import Logo from '@/components/Shared/Logo/Logo';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-full'>
      <div className='h-full relative'>
        <div className='bg-black h-full min-h-screen absolute w-full z-10'>
          <div className="bg-[url('/images/login-bg.jpg')] h-full opacity-40" />
        </div>
        <div className='px-8 py-5 max-w-7xl mx-auto relative z-20'>
          <Logo />
        </div>
        <div className='relative z-20 min-h-screen w-full max-w-md mx-auto pt-16'>
          <div className='bg-black/50 rounded-lg p-8'>{children}</div>
        </div>
      </div>
    </div>
  );
}
