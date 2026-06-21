import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';

const PUBLIC_ROUTES = ['/login', '/register', '/propuesta'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas: no requieren autenticación
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return await updateSession(request);
  }

  // Rutas de API: dejar pasar (manejan auth internamente)
  if (pathname.startsWith('/api')) {
    return await updateSession(request);
  }

  // Para rutas protegidas: verificar sesión
  const response = await updateSession(request);

  // Revisar si hay cookie de sesión de Supabase
  const hasSession = request.cookies.getAll().some(
    (cookie) => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
  );

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
