import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';

// Rutas que NO requieren autenticación
const PUBLIC_ROUTES = ['/', '/login', '/register', '/propuesta', '/recuperar', '/nueva-clave'];

// Rutas protegidas (dashboard)
const PROTECTED_PREFIXES = ['/dashboard', '/bonos', '/carga', '/conciliacion', '/alertas', '/configuracion'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas
  const isPublic = PUBLIC_ROUTES.includes(pathname);
  if (isPublic) {
    return await updateSession(request);
  }

  // Rutas de API
  if (pathname.startsWith('/api')) {
    return await updateSession(request);
  }

  // Rutas protegidas: verificar sesión
  const response = await updateSession(request);

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected) {
    const hasSession = request.cookies.getAll().some(
      (cookie) => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
    );

    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
