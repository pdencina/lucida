'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CLINICA_INICIAL = {
  nombre: 'BS Salud',
  rut: '76.XXX.XXX-X',
  direccion: '',
  telefono: '',
  email: 'contacto@bssalud.com',
};

const USUARIOS = [
  { id: '1', nombre: 'Administrador', email: 'admin@bssalud.com', rol: 'admin' },
  { id: '2', nombre: 'Facturación', email: 'facturacion@bssalud.com', rol: 'staff' },
];

const CONVENIOS = [
  { aseguradora: 'FONASA', vigencia: 'Vigente', vence: '31/12/2026' },
  { aseguradora: 'Banmédica', vigencia: 'Vigente', vence: '30/09/2026' },
  { aseguradora: 'Cruz Blanca', vigencia: 'Por vencer', vence: '15/07/2026' },
  { aseguradora: 'Colmena', vigencia: 'Vigente', vence: '28/02/2027' },
  { aseguradora: 'Consalud', vigencia: 'Vigente', vence: '30/11/2026' },
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500">Datos del centro y gestión de equipo</p>
      </div>

      <div className="space-y-6">
        {/* Datos de clínica */}
        <Card>
          <h2 className="mb-4 text-sm font-medium text-gray-900">Centro médico</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input id="nombre" label="Nombre" value={clinica.nombre} onChange={(e) => setClinica({ ...clinica, nombre: e.target.value })} />
            <Input id="rut" label="RUT" value={clinica.rut} onChange={(e) => setClinica({ ...clinica, rut: e.target.value })} />
            <Input id="email" label="Email" value={clinica.email} onChange={(e) => setClinica({ ...clinica, email: e.target.value })} />
            <Input id="telefono" label="Teléfono" placeholder="+56 9 ..." value={clinica.telefono} onChange={(e) => setClinica({ ...clinica, telefono: e.target.value })} />
            <div className="sm:col-span-2">
              <Input id="direccion" label="Dirección" placeholder="Av. ..." value={clinica.direccion} onChange={(e) => setClinica({ ...clinica, direccion: e.target.value })} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={guardar} disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar'}</Button>
            {guardado && <span className="text-xs text-emerald-600">Guardado</span>}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Equipo */}
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
                  }`}>{u.rol}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-gray-100 pt-3">
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Invitar usuario</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="email@bssalud.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="h-8 flex-1 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none"
                />
                <Button size="sm" onClick={() => setInviteEmail('')}>Invitar</Button>
              </div>
            </div>
          </Card>

          {/* Convenios */}
          <Card>
            <h2 className="mb-4 text-sm font-medium text-gray-900">Convenios</h2>
            <div className="space-y-2">
              {CONVENIOS.map((c) => (
                <div key={c.aseguradora} className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2.5">
                  <div>
                    <p className="text-sm text-gray-900">{c.aseguradora}</p>
                    <p className="text-[11px] text-gray-400">Vence: {c.vence}</p>
                  </div>
                  <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                    c.vigencia === 'Vigente' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>{c.vigencia}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
