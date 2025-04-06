import { auth } from '@/auth';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm/LoginForm';
import Terms from './Terms/Terms';

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className=''>
      <p className='text-3xl font-bold text-left mb-7'>Iniciar sesión</p>

      <LoginForm />
      <div className='mt-5 text-center'>
        <Link href='/' className='hover:underline hover:opacity-70'>
          Has olvidado tu contraseña?
        </Link>
      </div>

      <div className='flex items-center space-x-2 mt-4'>
        <Checkbox id='terms' className='border-white' />
        <label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Recuérdame
        </label>
      </div>

      <div className='mt-4 flex gap-1'>
        <p className='opacity-70 text-white'>¿No tienes una cuenta?</p>
        <Link href='/register' className=' text-white'>
          Suscríbete ahora
        </Link>
      </div>
      <Terms />
    </div>
  );
};

export default LoginPage;
