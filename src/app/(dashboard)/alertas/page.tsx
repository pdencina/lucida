'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Alerta {
  id: string;
  severidad: 'alta' | 'media' | 'baja';
  mensaje: string;
  detalle: string;
  fecha: string;
  resuelta: boolean;
}

const ALERTAS: Alerta[] = [
  { id: '1', severidad: 'alta', mensaje: 'Tasa de rechazo elevada en Consalud', detalle: '54.7% de bonos rechazados (umbral: 30%)', fecha: '20/06/2026', resuelta: false },
  { id: '2', severidad: 'alta', mensaje: '12 bonos sin liquidar hace más de 20 días', detalle: 'Bonos de Banmédica emitidos antes del 01/06/2026', fecha: '19/06/2026', resuelta: false },
  { id: '3', severidad: 'media', mensaje: 'Convenio con Cruz Blanca vence en 25 días', detalle: 'Vencimiento: 15/07/2026', fecha: '18/06/2026', resuelta: false },
  { id: '4', severidad: 'media', mensaje: 'Copago supera arancel en 4 bonos', detalle: 'Copago mayor al 50% del arancel', fecha: '17/06/2026', resuelta: false },
  { id: '5', severidad: 'baja', mensaje: '3 posibles bonos duplicados', detalle: 'Mismo paciente, prestación y fecha', fecha: '16/06/2026', resuelta: true },
];

export default function AlertasPage() {
  const [alertas, setAlertas] = useState(ALERTAS);
  const [filtro, setFiltro] = useState<'pendientes' | 'resueltas' | 'todas'>('pendientes');

  function resolver(id: string) {
    setAlertas((prev) => prev.map((a) => a.id === id ? { ...a, resuelta: true } : a));
  }

  const filtradas = alertas.filter((a) => {
    if (filtro === 'pendientes') return !a.resuelta;
    if (filtro === 'resueltas') return a.resuelta;
    return true;
  });

  const pendientes = alertas.filter((a) => !a.resuelta).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Alertas</h1>
          <p className="text-sm text-gray-500">{pendientes} pendientes</p>
        </div>
        <div className="flex rounded-md border border-gray-200 bg-white">
          {(['pendientes', 'resueltas', 'todas'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-2.5 py-1.5 text-[12px] font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
                filtro === f ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtradas.map((alerta) => (
          <Card key={alerta.id} className={`p-4 ${alerta.resuelta ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <SeveridadDot severidad={alerta.severidad} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{alerta.mensaje}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{alerta.detalle}</p>
                  <p className="mt-1 text-[11px] text-gray-400">{alerta.fecha}</p>
                </div>
              </div>
              {!alerta.resuelta ? (
                <Button size="sm" variant="secondary" onClick={() => resolver(alerta.id)}>
                  Resolver
                </Button>
              ) : (
                <span className="shrink-0 text-[11px] text-gray-400">resuelta</span>
              )}
            </div>
          </Card>
        ))}

        {filtradas.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">Sin alertas</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SeveridadDot({ severidad }: { severidad: string }) {
  const color: Record<string, string> = {
    alta: 'bg-red-500',
    media: 'bg-amber-400',
    baja: 'bg-gray-300',
  };
  return <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color[severidad]}`} />;
}
