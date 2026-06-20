'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MOCK_RESULTADO = {
  periodo: '2026-06',
  emitido: 12450000,
  liquidado: 9820000,
  depositado: 8640000,
  atrapado: 2630000,
  pendiente: 1180000,
  totalBonos: 234,
  bonosConciliados: 167,
  bonosRechazados: 33,
  bonosPendientes: 34,
};

const MOCK_DETALLE = [
  { aseguradora: 'FONASA', emitido: 5200000, liquidado: 4800000, brecha: 400000, bonos: 98, tasa: 92.3 },
  { aseguradora: 'Banmédica', emitido: 3100000, liquidado: 2400000, brecha: 700000, bonos: 52, tasa: 77.4 },
  { aseguradora: 'Cruz Blanca', emitido: 2200000, liquidado: 1500000, brecha: 700000, bonos: 38, tasa: 68.2 },
  { aseguradora: 'Colmena', emitido: 1200000, liquidado: 780000, brecha: 420000, bonos: 28, tasa: 65.0 },
  { aseguradora: 'Consalud', emitido: 750000, liquidado: 340000, brecha: 410000, bonos: 18, tasa: 45.3 },
];

function formatCLP(monto: number) {
  return '$' + monto.toLocaleString('es-CL');
}

function BarraProgreso({ porcentaje, color }: { porcentaje: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${Math.min(porcentaje, 100)}%` }} />
    </div>
  );
}

export default function ConciliacionPage() {
  const [ejecutando, setEjecutando] = useState(false);
  const [resultado, setResultado] = useState(MOCK_RESULTADO);

  function ejecutarConciliacion() {
    setEjecutando(true);
    setTimeout(() => setEjecutando(false), 2000);
  }

  const tasaConciliacion = ((resultado.bonosConciliados / resultado.totalBonos) * 100).toFixed(1);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conciliación</h1>
          <p className="text-sm text-gray-500">Período: Junio 2026</p>
        </div>
        <Button onClick={ejecutarConciliacion} disabled={ejecutando}>
          {ejecutando ? '⏳ Ejecutando...' : '🔄 Ejecutar conciliación'}
        </Button>
      </div>

      {/* Resumen general */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-gray-500">Tasa de conciliación</p>
          <p className="mt-1 text-3xl font-bold text-green-600">{tasaConciliacion}%</p>
          <BarraProgreso porcentaje={Number(tasaConciliacion)} color="bg-green-500" />
          <p className="mt-2 text-xs text-gray-400">{resultado.bonosConciliados} de {resultado.totalBonos} bonos</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Monto atrapado</p>
          <p className="mt-1 text-3xl font-bold text-red-600">{formatCLP(resultado.atrapado)}</p>
          <p className="mt-2 text-xs text-gray-400">{((resultado.atrapado / resultado.emitido) * 100).toFixed(1)}% del emitido</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Rechazados</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{resultado.bonosRechazados}</p>
          <p className="mt-2 text-xs text-gray-400">bonos sin liquidar</p>
        </Card>
      </div>

      {/* Flujo visual */}
      <Card className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Flujo de conciliación</h2>
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span className="text-xl">📋</span>
            </div>
            <p className="mt-2 text-xs font-medium text-gray-700">Emitido</p>
            <p className="text-sm font-bold">{formatCLP(resultado.emitido)}</p>
          </div>
          <span className="text-gray-300">→</span>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-xl">✅</span>
            </div>
            <p className="mt-2 text-xs font-medium text-gray-700">Liquidado</p>
            <p className="text-sm font-bold">{formatCLP(resultado.liquidado)}</p>
          </div>
          <span className="text-gray-300">→</span>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-xl">🏦</span>
            </div>
            <p className="mt-2 text-xs font-medium text-gray-700">Depositado</p>
            <p className="text-sm font-bold">{formatCLP(resultado.depositado)}</p>
          </div>
          <span className="text-gray-300">→</span>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-xl">🚫</span>
            </div>
            <p className="mt-2 text-xs font-medium text-gray-700">Atrapado</p>
            <p className="text-sm font-bold text-red-600">{formatCLP(resultado.atrapado)}</p>
          </div>
        </div>
      </Card>

      {/* Detalle por aseguradora */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Detalle por Aseguradora</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2 font-medium">Aseguradora</th>
                <th className="pb-2 font-medium text-right">Emitido</th>
                <th className="pb-2 font-medium text-right">Liquidado</th>
                <th className="pb-2 font-medium text-right">Brecha</th>
                <th className="pb-2 font-medium text-right">Bonos</th>
                <th className="pb-2 font-medium text-right">Tasa</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_DETALLE.map((row) => (
                <tr key={row.aseguradora} className="text-gray-700">
                  <td className="py-2.5 font-medium">{row.aseguradora}</td>
                  <td className="py-2.5 text-right">{formatCLP(row.emitido)}</td>
                  <td className="py-2.5 text-right">{formatCLP(row.liquidado)}</td>
                  <td className="py-2.5 text-right text-red-600">{formatCLP(row.brecha)}</td>
                  <td className="py-2.5 text-right">{row.bonos}</td>
                  <td className="py-2.5 text-right">
                    <span className={row.tasa >= 80 ? 'text-green-600' : row.tasa >= 60 ? 'text-amber-600' : 'text-red-600'}>
                      {row.tasa}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
