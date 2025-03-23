'use server';

import { signOut } from '@/auth';

export async function logout() {
  // Usar signOut desde el servidor para evitar problemas de compatibilidad
  // con Edge Runtime
  await signOut({ redirectTo: '/login' });
}
