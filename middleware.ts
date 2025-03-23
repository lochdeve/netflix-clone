// export { auth as middleware } from '@/auth';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Middleware compatible con Edge Runtime que no usa Prisma
export function middleware(request: NextRequest) {
  // Verifica si existe la cookie de sesión
  const authCookie =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  // Rutas que no requieren autenticación
  const publicPaths = ['/login', '/register'];

  // Obtener la ruta actual sin query params
  const path = request.nextUrl.pathname;

  // Comprobar si la ruta actual es pública
  const isPublicPath = publicPaths.includes(path);

  // Verificar si estamos intentando acceder a una ruta protegida sin estar autenticados
  if (!authCookie && !isPublicPath) {
    // Redirigir al login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificar si estamos intentando acceder a una ruta de autenticación estando ya autenticados
  if (authCookie && isPublicPath) {
    // Redirigir a home si ya estamos autenticados
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Aplicar el middleware solo a ciertas rutas
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|images).*)',
  ],
};
