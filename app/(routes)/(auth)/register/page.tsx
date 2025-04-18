import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import Terms from '../login/Terms/Terms';
import { RegisterForm } from './RegisterForm';

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div>
      <p className='text-3xl font-bold text-left mb-7'>Registro de usuario</p>

      <RegisterForm />

      <div className='mt-4 flex gap-1'>
        <p className='text-white opacity-70'>¿Ya tienes cuenta?</p>
        <Link href='/login' className='opacity-1 text-white'>
          Inicia sesión aquí
        </Link>
      </div>

      <Terms />
    </div>
  );
}
