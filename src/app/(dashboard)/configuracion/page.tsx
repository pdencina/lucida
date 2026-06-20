'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_CLINICA = {
  nombre: 'Centro Médico Santiago',
  rut: '76.123.456-7',
  direccion: 'Av. Providencia 1234, Santiago',
  telefono: '+56 2 2345 6789',
};

const MOCK_USUARIOS = [
  { id: '1', nombre: 'María González', email: 'maria@clinica.cl', rol: 'admin' },
  { id: '2', nombre: 'Carlos Soto', email: 'carlos@clinica.cl', rol: 'staff' },
  { id: '3', nombre: 'Ana Muñoz', email: 'ana@clinica.cl', rol: 'staff' },
];

export default function ConfiguracionPage() {
  const [clinica, setClinica] = useState(MOCK_CLINICA);
  const [inviteEmail, setInviteEmail] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  function handleGuardar() {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      setGuardado(true);
      setTimeout(() => setGuardado(false), 2000);
    }, 1000);
  }

  function handleInvitar() {
    if (!inviteEmail) return;
    alert(`Invitación enviada a ${inviteEmail}`);
    setInviteEmail('');
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500">Datos de tu clínica y equipo</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Datos de clínica */}
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Datos de la clínica</h2>
          <div className="space-y-4">
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
            <div className="flex items-center gap-3">
              <Button onClick={handleGuardar} disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar cambios'}
              </Button>
              {guardado && <span className="text-sm text-green-600">✓ Guardado</span>}
            </div>
          </div>
        </Card>

        {/* Equipo */}
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Equipo</h2>
          
          {/* Lista de usuarios */}
          <div className="mb-6 space-y-3">
            {MOCK_USUARIOS.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{u.nombre}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  u.rol === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {u.rol}
                </span>
              </div>
            ))}
          </div>

          {/* Invitar */}
          <div className="border-t pt-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700">Invitar usuario</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="email@ejemplo.cl"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <Button size="sm" onClick={handleInvitar}>Invitar</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
