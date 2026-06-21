'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RESULTADO = {
  emitido: 12450000,
  liquidado: 9820000,
  depositado: 8640000,
  atrapado: 2630000,
  totalBonos: 234,
  bonosConciliados: 167,
  bonosRechazados: 33,
  bonosPendientes: 34,
};

const DETALLE = [
  { aseguradora: 'FONASA', emitido: 5200000, liquidado: 4800000, brecha: 400000, bonos: 98, tasa: 92.3 },
  { aseguradora: 'Banmédica', emitido: 3100000, liquidado: 2400000, brecha: 700000, bonos: 52, tasa: 77.4 },
  { aseguradora: 'Cruz Blanca', emitido: 2200000, liquidado: 1500000, brecha: 700000, bonos: 38, tasa: 68.2 },
  { aseguradora: 'Colmena', emitido: 1200000, liquidado: 780000, brecha: 420000, bonos: 28, tasa: 65.0 },
  { aseguradora: 'Consalud', emitido: 750000, liquidado: 340000, brecha: 410000, bonos: 18, tasa: 45.3 },
];

function formatCLP(n: number) {
  return '$' + n.toLocaleString('es-CL');
}

export default function ConciliacionPage() {
  const [ejecutando, setEjecutando] = useState(false);

  function ejecutar() {
    setEjecutando(true);
    setTimeout(() => setEjecutando(false), 2000);
  }

  const tasa = ((RESULTADO.bonosConciliados / RESULTADO.totalBonos) * 100).toFixed(1);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Conciliación</h1>
          <p className="text-sm text-gray-500">Junio 2026</p>
        </div>
        <Button onClick={ejecutar} disabled={ejecutando}>
          {ejecutando ? 'Ejecutando...' : 'Ejecutar'}
        </Button>
      </div>

      {/* Resumen */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Tasa</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{tasa}%</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${tasa}%` }} />
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Emitido</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{formatCLP(RESULTADO.emitido)}</p>
          <p className="mt-0.5 text-xs text-gray-500">{RESULTADO.totalBonos} bonos</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Liquidado</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{formatCLP(RESULTADO.liquidado)}</p>
          <p className="mt-0.5 text-xs text-gray-500">{RESULTADO.bonosConciliados} conciliados</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Atrapado</p>
          <p className="mt-1 text-xl font-semibold text-red-600">{formatCLP(RESULTADO.atrapado)}</p>
          <p className="mt-0.5 text-xs text-gray-500">{RESULTADO.bonosRechazados + RESULTADO.bonosPendientes} bonos</p>
        </Card>
      </div>

      {/* Flujo */}
      <Card className="mb-6 p-5">
        <h2 className="mb-4 text-sm font-medium text-gray-900">Flujo</h2>
        <div className="flex items-center gap-3">
          <Step label="Emitido" value={formatCLP(RESULTADO.emitido)} />
          <Arrow />
          <Step label="Liquidado" value={formatCLP(RESULTADO.liquidado)} />
          <Arrow />
          <Step label="Depositado" value={formatCLP(RESULTADO.depositado)} />
          <Arrow />
          <Step label="Atrapado" value={formatCLP(RESULTADO.atrapado)} highlight />
        </div>
      </Card>

      {/* Tabla detalle */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-gray-100 px-5 py-3">
          <h2 className="text-sm font-medium text-gray-900">Por aseguradora</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
              <th className="px-5 py-2.5 font-medium">Aseguradora</th>
              <th className="px-5 py-2.5 font-medium text-right">Emitido</th>
              <th className="px-5 py-2.5 font-medium text-right">Liquidado</th>
              <th className="px-5 py-2.5 font-medium text-right">Brecha</th>
              <th className="px-5 py-2.5 font-medium text-right">Tasa</th>
            </tr>
          </thead>
          <tbody>
            {DETALLE.map((row, i) => (
              <tr key={row.aseguradora} className={i < DETALLE.length - 1 ? 'border-b border-gray-50' : ''}>
                <td className="px-5 py-2.5 font-medium text-gray-900">{row.aseguradora}</td>
                <td className="px-5 py-2.5 text-right text-gray-500">{formatCLP(row.emitido)}</td>
                <td className="px-5 py-2.5 text-right text-gray-500">{formatCLP(row.liquidado)}</td>
                <td className="px-5 py-2.5 text-right text-red-600">{formatCLP(row.brecha)}</td>
                <td className="px-5 py-2.5 text-right">
                  <span className={row.tasa >= 80 ? 'text-emerald-600' : row.tasa >= 60 ? 'text-amber-600' : 'text-red-600'}>
                    {row.tasa}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Step({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex-1 rounded-md border border-gray-100 bg-gray-50 px-3 py-2.5 text-center">
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className={`text-sm font-semibold ${highlight ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-gray-300">
      <path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
