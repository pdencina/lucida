'use client';

import { useState } from 'react';
import { createClient } from '@/lib/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function RecuperarPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nueva-clave`,
    });

    if (resetError) {
      setError('No se pudo enviar el correo. Verifica el email.');
      setLoading(false);
      return;
    }

    setEnviado(true);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm px-6">
        <div className="mb-6">
          <h1 className="text-base font-semibold text-gray-900">Remis</h1>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Recuperar contraseña</h2>
          <p className="mt-1 text-sm text-gray-500">Te enviaremos un link para crear una nueva</p>
        </div>

        {!enviado ? (
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

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar link de recuperación'}
            </Button>
          </form>
        ) : (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-4">
            <p className="text-sm font-medium text-emerald-800">Correo enviado</p>
            <p className="mt-1 text-xs text-emerald-600">
              Revisa tu bandeja de entrada en <strong>{email}</strong>. 
              El link expira en 1 hora.
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">
          <Link href="/login" className="text-gray-700 hover:underline">
            ← Volver al login
          </Link>
        </p>
      </div>
    </main>
  );
}
