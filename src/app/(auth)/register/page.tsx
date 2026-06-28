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

    router.push('/dashboard');
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
            Empieza a recuperar<br />lo que tu clínica pierde.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
            Crea tu cuenta en 1 minuto. Sin tarjeta de crédito.
            Sube tu primer archivo y ve el análisis real de tu clínica.
          </p>
        </div>
        <div>
          <div className="rounded-lg border border-gray-700 bg-gray-800/50 px-5 py-4">
            <p className="text-sm text-gray-300">&ldquo;En el primer mes identificamos $1.8M que se nos estaba escapando por errores de codificación.&rdquo;</p>
            <p className="mt-3 text-xs text-gray-500">— Administradora, Centro Médico</p>
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
            <h2 className="text-lg font-semibold text-gray-900">Crear cuenta</h2>
            <p className="mt-1 text-sm text-gray-500">Registra tu centro médico</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              id="clinicaNombre"
              label="Nombre del centro"
              placeholder="Centro Médico Santiago"
              value={form.clinicaNombre}
              onChange={(e) => update('clinicaNombre', e.target.value)}
              required
            />
            <Input
              id="clinicaRut"
              label="RUT del centro"
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
