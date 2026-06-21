'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CLINICA_INICIAL = {
  nombre: 'Centro Médico Santiago',
  rut: '76.123.456-7',
  direccion: 'Av. Providencia 1234, Santiago',
  telefono: '+56 2 2345 6789',
};

const USUARIOS = [
  { id: '1', nombre: 'María González', email: 'maria@clinica.cl', rol: 'admin' },
  { id: '2', nombre: 'Carlos Soto', email: 'carlos@clinica.cl', rol: 'staff' },
  { id: '3', nombre: 'Ana Muñoz', email: 'ana@clinica.cl', rol: 'staff' },
];

export default function ConfiguracionPage() {
  const [clinica, setClinica] = useState(CLINICA_INICIAL);
  const [inviteEmail, setInviteEmail] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  function guardar() {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      setGuardado(true);
      setTimeout(() => setGuardado(false), 2000);
    }, 800);
  }

  function invitar() {
    if (!inviteEmail) return;
    setInviteEmail('');
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500">Datos de la clínica y equipo</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-medium text-gray-900">Clínica</h2>
          <div className="space-y-3">
            <Input
              id="nombre"
              label="Nombre"
              value={clinica.nombre}
              onChange={(e) => setClinica({ ...clinica, nombre: e.target.value })}
            />
            <Input
              id="rut"
              label="RUT"
              value={clinica.rut}
              onChange={(e) => setClinica({ ...clinica, rut: e.target.value })}
            />
            <Input
              id="direccion"
              label="Dirección"
              value={clinica.direccion}
              onChange={(e) => setClinica({ ...clinica, direccion: e.target.value })}
            />
            <Input
              id="telefono"
              label="Teléfono"
              value={clinica.telefono}
              onChange={(e) => setClinica({ ...clinica, telefono: e.target.value })}
            />
            <div className="flex items-center gap-3 pt-1">
              <Button onClick={guardar} disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </Button>
              {guardado && <span className="text-xs text-emerald-600">Guardado</span>}
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-medium text-gray-900">Equipo</h2>
          <div className="space-y-2">
            {USUARIOS.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2.5">
                <div>
                  <p className="text-sm text-gray-900">{u.nombre}</p>
                  <p className="text-[11px] text-gray-400">{u.email}</p>
                </div>
                <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                  u.rol === 'admin' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {u.rol}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <label className="mb-1.5 block text-xs font-medium text-gray-600">Invitar usuario</label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="email@ejemplo.cl"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="h-8 flex-1 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
              />
              <Button size="sm" onClick={invitar}>Invitar</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
