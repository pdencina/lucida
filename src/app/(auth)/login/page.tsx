'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Credenciales incorrectas');
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo - Branding */}
      <div className="hidden w-1/2 bg-gray-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div>
          <h1 className="text-xl font-semibold text-white">Remis</h1>
        </div>
        <div>
          <p className="text-2xl font-medium leading-snug text-white">
            Controla cada peso que<br />entra a tu clínica.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
            Cruza bonos, liquidaciones y depósitos bancarios en un solo lugar.
            Detecta pérdidas antes de que se acumulen.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-emerald-400">
                <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">Conciliación automática</p>
              <p className="text-xs text-gray-500">Cruza toda tu facturación en minutos</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-amber-400">
                <path d="M6.5 14h3M8 1.5a4.5 4.5 0 014.5 4.5c0 2.5 1 4 1 4H2.5s1-1.5 1-4A4.5 4.5 0 018 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">Alertas inteligentes</p>
              <p className="text-xs text-gray-500">Te avisa antes de que pierdas dinero</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-400">
                <path d="M2 8h3l2-4 2 8 2-4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">Visibilidad total</p>
              <p className="text-xs text-gray-500">Cada bono rastreado peso a peso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <h1 className="text-base font-semibold text-gray-900">Remis</h1>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Iniciar sesión</h2>
            <p className="mt-1 text-sm text-gray-500">Ingresa a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="tu@clinica.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Ingresando...' : 'Continuar'}
            </Button>

            <div className="text-center">
              <Link href="/recuperar" className="text-xs text-gray-400 hover:text-gray-600">
                ¿Olvidó su contraseña?
              </Link>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-gray-700 hover:underline">
              Registrar clínica
            </Link>
          </p>
          <p className="mt-3 text-center">
            <Link href="/propuesta" className="text-xs text-gray-400 hover:text-gray-600 hover:underline">
              ¿Qué es Remis? →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
