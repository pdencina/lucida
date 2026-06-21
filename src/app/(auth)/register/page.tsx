'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({
    clinicaNombre: '',
    clinicaRut: '',
    nombre: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nombre: form.nombre,
          clinica_nombre: form.clinicaNombre,
          clinica_rut: form.clinicaRut,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm px-6">
        <div className="mb-8">
          <h1 className="text-base font-semibold text-gray-900">remis</h1>
          <p className="mt-1 text-sm text-gray-500">Registra tu clínica</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            id="clinicaNombre"
            label="Nombre de la clínica"
            placeholder="Centro Médico Santiago"
            value={form.clinicaNombre}
            onChange={(e) => update('clinicaNombre', e.target.value)}
            required
          />
          <Input
            id="clinicaRut"
            label="RUT de la clínica"
            placeholder="76.123.456-7"
            value={form.clinicaRut}
            onChange={(e) => update('clinicaRut', e.target.value)}
            required
          />
          <Input
            id="nombre"
            label="Tu nombre"
            placeholder="María González"
            value={form.nombre}
            onChange={(e) => update('nombre', e.target.value)}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="maria@clinica.cl"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            required
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            minLength={6}
            required
          />

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-gray-700 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
