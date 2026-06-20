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

  function updateField(field: string, value: string) {
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
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary-700">Lúcida</h1>
          <p className="mt-1 text-sm text-gray-500">Registra tu clínica</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="clinicaNombre"
            label="Nombre de la clínica"
            placeholder="Centro Médico Santiago"
            value={form.clinicaNombre}
            onChange={(e) => updateField('clinicaNombre', e.target.value)}
            required
          />
          <Input
            id="clinicaRut"
            label="RUT de la clínica"
            placeholder="76.123.456-7"
            value={form.clinicaRut}
            onChange={(e) => updateField('clinicaRut', e.target.value)}
            required
          />
          <Input
            id="nombre"
            label="Tu nombre"
            placeholder="María González"
            value={form.nombre}
            onChange={(e) => updateField('nombre', e.target.value)}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="maria@clinica.cl"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
            minLength={6}
            required
          />

          {error && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
