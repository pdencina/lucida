'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RESULTADO = {
  facturado: 18740000,
  cobrado: 14950000,
  porCobrar: 2610000,
  perdido: 1180000,
  totalBonos: 312,
  conciliados: 241,
  rechazados: 39,
  pendientes: 32,
};

const POR_ASEGURADORA = [
  { nombre: 'FONASA', facturado: 7200000, cobrado: 6840000, brecha: 360000, bonos: 124, tasa: 95.0 },
  { nombre: 'Banmédica', facturado: 4100000, cobrado: 3200000, brecha: 900000, bonos: 68, tasa: 78.0 },
  { nombre: 'Cruz Blanca', facturado: 3200000, cobrado: 2240000, brecha: 960000, bonos: 53, tasa: 70.0 },
  { nombre: 'Colmena', facturado: 2400000, cobrado: 1920000, brecha: 480000, bonos: 40, tasa: 80.0 },
  { nombre: 'Consalud', facturado: 1840000, cobrado: 750000, brecha: 1090000, bonos: 27, tasa: 40.8 },
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

  const tasa = ((RESULTADO.conciliados / RESULTADO.totalBonos) * 100).toFixed(1);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Conciliación</h1>
          <p className="text-sm text-gray-500">Junio 2026 · 312 prestaciones procesadas</p>
        </div>
        <Button onClick={ejecutar} disabled={ejecutando}>
          {ejecutando ? 'Ejecutando...' : 'Ejecutar conciliación'}
        </Button>
      </div>

      {/* Métricas principales */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Recuperación</p>
          <p className="mt-1.5 text-2xl font-semibold text-gray-900">{tasa}%</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${tasa}%` }} />
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Facturado</p>
          <p className="mt-1.5 text-xl font-semibold text-gray-900">{formatCLP(RESULTADO.facturado)}</p>
          <p className="mt-0.5 text-xs text-gray-500">{RESULTADO.totalBonos} bonos</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Cobrado</p>
          <p className="mt-1.5 text-xl font-semibold text-emerald-600">{formatCLP(RESULTADO.cobrado)}</p>
          <p className="mt-0.5 text-xs text-gray-500">{RESULTADO.conciliados} conciliados</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Perdido</p>
          <p className="mt-1.5 text-xl font-semibold text-red-600">{formatCLP(RESULTADO.perdido)}</p>
          <p className="mt-0.5 text-xs text-gray-500">{RESULTADO.rechazados} rechazados</p>
        </Card>
      </div>

      {/* Flujo */}
      <Card className="mb-6 p-5">
        <h2 className="mb-3 text-sm font-medium text-gray-700">Flujo del dinero</h2>
        <div className="flex items-center gap-2">
          <FlowStep label="Facturado" value={formatCLP(RESULTADO.facturado)} />
          <FlowArrow />
          <FlowStep label="Cobrado" value={formatCLP(RESULTADO.cobrado)} />
          <FlowArrow />
          <FlowStep label="Por cobrar" value={formatCLP(RESULTADO.porCobrar)} muted />
          <FlowArrow />
          <FlowStep label="Perdido" value={formatCLP(RESULTADO.perdido)} danger />
        </div>
      </Card>

      {/* Tabla por aseguradora */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-gray-100 px-5 py-3">
          <h2 className="text-sm font-medium text-gray-900">Detalle por aseguradora</h2>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
              <th className="px-5 py-2.5 font-medium">Aseguradora</th>
              <th className="px-5 py-2.5 font-medium text-right">Facturado</th>
              <th className="px-5 py-2.5 font-medium text-right">Cobrado</th>
              <th className="px-5 py-2.5 font-medium text-right">Brecha</th>
              <th className="px-5 py-2.5 font-medium text-right">Bonos</th>
              <th className="px-5 py-2.5 font-medium text-right">Tasa</th>
            </tr>
          </thead>
          <tbody>
            {POR_ASEGURADORA.map((row, i) => (
              <tr key={row.nombre} className={i < POR_ASEGURADORA.length - 1 ? 'border-b border-gray-50' : ''}>
                <td className="px-5 py-2.5 font-medium text-gray-900">{row.nombre}</td>
                <td className="px-5 py-2.5 text-right text-gray-500">{formatCLP(row.facturado)}</td>
                <td className="px-5 py-2.5 text-right text-gray-700">{formatCLP(row.cobrado)}</td>
                <td className="px-5 py-2.5 text-right text-red-600">{formatCLP(row.brecha)}</td>
                <td className="px-5 py-2.5 text-right text-gray-500">{row.bonos}</td>
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

function FlowStep({ label, value, muted, danger }: { label: string; value: string; muted?: boolean; danger?: boolean }) {
  return (
    <div className="flex-1 rounded-md border border-gray-100 bg-gray-50 px-3 py-2.5 text-center">
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className={`text-sm font-semibold ${danger ? 'text-red-600' : muted ? 'text-gray-500' : 'text-gray-900'}`}>{value}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-gray-300">
      <path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
