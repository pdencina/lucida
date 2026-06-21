'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

const BONOS = [
  { id: '1', folio: 'BS-0601', fecha: '18/06/2026', paciente: 'Carmen Rojas M.', prestacion: 'Consulta medicina general', aseguradora: 'FONASA', monto: 25000, copago: 7500, estado: 'conciliado' },
  { id: '2', folio: 'BS-0602', fecha: '18/06/2026', paciente: 'Andrés Villalobos P.', prestacion: 'Ecografía abdominal', aseguradora: 'Banmédica', monto: 68000, copago: 20400, estado: 'pendiente' },
  { id: '3', folio: 'BS-0603', fecha: '17/06/2026', paciente: 'Francisca Díaz L.', prestacion: 'Radiografía de tórax', aseguradora: 'Cruz Blanca', monto: 42000, copago: 12600, estado: 'rechazado' },
  { id: '4', folio: 'BS-0604', fecha: '17/06/2026', paciente: 'Roberto Fuentes A.', prestacion: 'Hemograma completo', aseguradora: 'FONASA', monto: 15000, copago: 4500, estado: 'conciliado' },
  { id: '5', folio: 'BS-0605', fecha: '16/06/2026', paciente: 'Patricia Soto G.', prestacion: 'Consulta traumatología', aseguradora: 'Colmena', monto: 35000, copago: 10500, estado: 'pendiente' },
  { id: '6', folio: 'BS-0606', fecha: '16/06/2026', paciente: 'Miguel Ángel Torres', prestacion: 'Electrocardiograma', aseguradora: 'Consalud', monto: 38000, copago: 11400, estado: 'conciliado' },
  { id: '7', folio: 'BS-0607', fecha: '15/06/2026', paciente: 'Valentina Muñoz R.', prestacion: 'Resonancia rodilla', aseguradora: 'Banmédica', monto: 195000, copago: 58500, estado: 'rechazado' },
  { id: '8', folio: 'BS-0608', fecha: '15/06/2026', paciente: 'José Hernández C.', prestacion: 'Consulta cardiología', aseguradora: 'FONASA', monto: 32000, copago: 9600, estado: 'pendiente' },
  { id: '9', folio: 'BS-0609', fecha: '14/06/2026', paciente: 'Laura Figueroa B.', prestacion: 'Exámenes de laboratorio', aseguradora: 'Cruz Blanca', monto: 48000, copago: 14400, estado: 'conciliado' },
  { id: '10', folio: 'BS-0610', fecha: '14/06/2026', paciente: 'Sebastián Araya M.', prestacion: 'Consulta dermatología', aseguradora: 'Colmena', monto: 30000, copago: 9000, estado: 'conciliado' },
];

const ESTADOS = ['todos', 'pendiente', 'conciliado', 'rechazado'] as const;

function formatCLP(n: number) {
  return '$' + n.toLocaleString('es-CL');
}

function Badge({ estado }: { estado: string }) {
  const s: Record<string, string> = {
    conciliado: 'bg-emerald-50 text-emerald-700',
    pendiente: 'bg-amber-50 text-amber-700',
    rechazado: 'bg-red-50 text-red-700',
  };
  return <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${s[estado]}`}>{estado}</span>;
}

export default function BonosPage() {
  const [filtro, setFiltro] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');

  const filtrados = BONOS.filter((b) => {
    const matchEstado = filtro === 'todos' || b.estado === filtro;
    const q = busqueda.toLowerCase();
    const matchQ = !q || b.paciente.toLowerCase().includes(q) || b.folio.toLowerCase().includes(q) || b.prestacion.toLowerCase().includes(q);
    return matchEstado && matchQ;
  });

  const totales = {
    todos: BONOS.length,
    pendiente: BONOS.filter(b => b.estado === 'pendiente').length,
    conciliado: BONOS.filter(b => b.estado === 'conciliado').length,
    rechazado: BONOS.filter(b => b.estado === 'rechazado').length,
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-900">Bonos</h1>
        <p className="text-sm text-gray-500">{BONOS.length} prestaciones · Junio 2026</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Buscar paciente, folio o prestación..."
          className="h-8 w-72 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="flex rounded-md border border-gray-200 bg-white">
          {ESTADOS.map((e) => (
            <button
              key={e}
              onClick={() => setFiltro(e)}
              className={`px-2.5 py-1.5 text-[12px] font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
                filtro === e ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {e} {totales[e as keyof typeof totales] > 0 && <span className="text-[10px] opacity-60">({totales[e as keyof typeof totales]})</span>}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
              <th className="px-4 py-2.5 font-medium">Folio</th>
              <th className="px-4 py-2.5 font-medium">Fecha</th>
              <th className="px-4 py-2.5 font-medium">Paciente</th>
              <th className="px-4 py-2.5 font-medium">Prestación</th>
              <th className="px-4 py-2.5 font-medium">Aseguradora</th>
              <th className="px-4 py-2.5 font-medium text-right">Total</th>
              <th className="px-4 py-2.5 font-medium text-right">Copago</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((b, i) => (
              <tr key={b.id} className={`hover:bg-gray-50 ${i < filtrados.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{b.folio}</td>
                <td className="px-4 py-2.5 text-gray-500">{b.fecha}</td>
                <td className="px-4 py-2.5 text-gray-900">{b.paciente}</td>
                <td className="px-4 py-2.5 text-gray-600">{b.prestacion}</td>
                <td className="px-4 py-2.5 text-gray-500">{b.aseguradora}</td>
                <td className="px-4 py-2.5 text-right font-medium text-gray-900">{formatCLP(b.monto)}</td>
                <td className="px-4 py-2.5 text-right text-gray-500">{formatCLP(b.copago)}</td>
                <td className="px-4 py-2.5"><Badge estado={b.estado} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-gray-400">Sin resultados</div>
        )}
      </Card>
    </div>
  );
}
