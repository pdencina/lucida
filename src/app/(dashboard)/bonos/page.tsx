'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

const MOCK_BONOS = [
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
  const styles = {
    conciliado: 'bg-green-100 text-green-700',
    pendiente: 'bg-amber-100 text-amber-700',
    rechazado: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[estado as keyof typeof styles] || ''}`}>
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </span>
  );
}

export default function BonosPage() {
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');

  const bonosFiltrados = MOCK_BONOS.filter((b) => {
    const matchEstado = filtroEstado === 'todos' || b.estado === filtroEstado;
    const matchBusqueda = !busqueda || 
      b.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
      b.folio.toLowerCase().includes(busqueda.toLowerCase()) ||
      b.prestacion.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bonos</h1>
          <p className="text-sm text-gray-500">{MOCK_BONOS.length} bonos en el período</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Buscar por paciente, folio o prestación..."
          className="w-72 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="flex gap-1 rounded-lg border bg-white p-1">
          {ESTADOS.map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filtroEstado === estado
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {estado === 'todos' ? 'Todos' : estado.charAt(0).toUpperCase() + estado.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Folio</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Prestación</th>
                <th className="px-4 py-3 font-medium">Aseguradora</th>
                <th className="px-4 py-3 font-medium text-right">Monto</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bonosFiltrados.map((bono) => (
                <tr key={bono.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{bono.folio}</td>
                  <td className="px-4 py-3">{bono.fecha}</td>
                  <td className="px-4 py-3">
                    <div>{bono.paciente}</div>
                    <div className="text-xs text-gray-400">{bono.rut}</div>
                  </td>
                  <td className="px-4 py-3">{bono.prestacion}</td>
                  <td className="px-4 py-3">{bono.aseguradora}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCLP(bono.monto)}</td>
                  <td className="px-4 py-3"><EstadoBadge estado={bono.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
