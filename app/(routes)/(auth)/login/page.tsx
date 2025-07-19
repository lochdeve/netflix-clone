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
      {/* TODO: Add forgot password */}
      {/* <div className='mt-5 text-center'>
        <Link
          href='/'
          className='text-neutral-400 hover:underline hover:text-white'
        >
          ¿Has olvidado la contraseña?
        </Link>
      </div> */}

      <div className='flex items-center space-x-2 mt-4'>
        <Checkbox
          id='terms'
          className='border-white hover:bg-gray-500 cursor-pointer'
        />
        <label
          htmlFor='terms'
          className='text-neutral-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
        >
          Recuérdame
        </label>
      </div>

      <div className='mt-10 flex gap-2'>
        <p className='text-neutral-400'>¿Primera vez en Netflix?</p>
        <Link
          href='/register'
          className='text-white hover:underline hover:opacity-70'
        >
          Suscríbete ahora
        </Link>
      </div>
      <Terms />
    </div>
  );
};

export default LoginPage;
