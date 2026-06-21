'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

const BONOS = [
  { id: '1', folio: 'B-2024-001', fecha: '15/06/2026', paciente: 'María González', rut: '12.345.678-9', prestacion: 'Consulta general', aseguradora: 'FONASA', monto: 45000, estado: 'conciliado' },
  { id: '2', folio: 'B-2024-002', fecha: '15/06/2026', paciente: 'Juan Pérez', rut: '9.876.543-2', prestacion: 'Radiografía torax', aseguradora: 'Banmédica', monto: 82000, estado: 'pendiente' },
  { id: '3', folio: 'B-2024-003', fecha: '14/06/2026', paciente: 'Ana Muñoz', rut: '15.432.109-K', prestacion: 'Ecografía abdominal', aseguradora: 'Cruz Blanca', monto: 65000, estado: 'rechazado' },
  { id: '4', folio: 'B-2024-004', fecha: '14/06/2026', paciente: 'Carlos Soto', rut: '11.222.333-4', prestacion: 'Hemograma completo', aseguradora: 'FONASA', monto: 18000, estado: 'conciliado' },
  { id: '5', folio: 'B-2024-005', fecha: '13/06/2026', paciente: 'Rosa Díaz', rut: '8.765.432-1', prestacion: 'Consulta especialista', aseguradora: 'Colmena', monto: 72000, estado: 'pendiente' },
  { id: '6', folio: 'B-2024-006', fecha: '13/06/2026', paciente: 'Pedro Lagos', rut: '14.567.890-5', prestacion: 'Electrocardiograma', aseguradora: 'Consalud', monto: 35000, estado: 'conciliado' },
  { id: '7', folio: 'B-2024-007', fecha: '12/06/2026', paciente: 'Lucía Vargas', rut: '16.789.012-3', prestacion: 'Resonancia magnética', aseguradora: 'Vida Tres', monto: 180000, estado: 'rechazado' },
  { id: '8', folio: 'B-2024-008', fecha: '12/06/2026', paciente: 'Diego Reyes', rut: '10.111.222-6', prestacion: 'Consulta dental', aseguradora: 'FONASA', monto: 28000, estado: 'pendiente' },
];

const ESTADOS = ['todos', 'pendiente', 'conciliado', 'rechazado'] as const;

function formatCLP(monto: number) {
  return '$' + monto.toLocaleString('es-CL');
}

function EstadoBadge({ estado }: { estado: string }) {
  const styles: Record<string, string> = {
    conciliado: 'bg-emerald-50 text-emerald-700',
    pendiente: 'bg-amber-50 text-amber-700',
    rechazado: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${styles[estado]}`}>
      {estado}
    </span>
  );
}

export default function BonosPage() {
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');

  const filtrados = BONOS.filter((b) => {
    const matchEstado = filtroEstado === 'todos' || b.estado === filtroEstado;
    const q = busqueda.toLowerCase();
    const matchBusqueda = !q ||
      b.paciente.toLowerCase().includes(q) ||
      b.folio.toLowerCase().includes(q) ||
      b.prestacion.toLowerCase().includes(q);
    return matchEstado && matchBusqueda;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Bonos</h1>
        <p className="text-sm text-gray-500">{BONOS.length} registros · Junio 2026</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Buscar..."
          className="h-8 w-64 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="flex rounded-md border border-gray-200 bg-white">
          {ESTADOS.map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-2.5 py-1.5 text-[12px] font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
                filtroEstado === estado
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
              <th className="px-4 py-2.5 font-medium">Folio</th>
              <th className="px-4 py-2.5 font-medium">Fecha</th>
              <th className="px-4 py-2.5 font-medium">Paciente</th>
              <th className="px-4 py-2.5 font-medium">Prestación</th>
              <th className="px-4 py-2.5 font-medium">Aseguradora</th>
              <th className="px-4 py-2.5 font-medium text-right">Monto</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((b, i) => (
              <tr key={b.id} className={`text-gray-700 hover:bg-gray-50 ${i < filtrados.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{b.folio}</td>
                <td className="px-4 py-2.5 text-gray-500">{b.fecha}</td>
                <td className="px-4 py-2.5">
                  <span className="text-gray-900">{b.paciente}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-500">{b.prestacion}</td>
                <td className="px-4 py-2.5 text-gray-500">{b.aseguradora}</td>
                <td className="px-4 py-2.5 text-right font-medium text-gray-900">{formatCLP(b.monto)}</td>
                <td className="px-4 py-2.5"><EstadoBadge estado={b.estado} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
