'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Alerta {
  id: string;
  tipo: string;
  severidad: 'alta' | 'media' | 'baja';
  mensaje: string;
  detalle: string;
  fecha: string;
  resuelta: boolean;
}

const MOCK_ALERTAS: Alerta[] = [
  { id: '1', tipo: 'alto_rechazo', severidad: 'alta', mensaje: 'Tasa de rechazo elevada en Consalud', detalle: '54.7% de bonos rechazados en el período actual (umbral: 30%)', fecha: '20/06/2026', resuelta: false },
  { id: '2', tipo: 'sin_liquidar_20d', severidad: 'alta', mensaje: '12 bonos sin liquidar hace más de 20 días', detalle: 'Bonos de Banmédica emitidos antes del 01/06/2026 sin respuesta', fecha: '19/06/2026', resuelta: false },
  { id: '3', tipo: 'convenio_por_vencer', severidad: 'media', mensaje: 'Convenio con Cruz Blanca vence en 25 días', detalle: 'Fecha de vencimiento: 15/07/2026. Renovar o renegociar condiciones.', fecha: '18/06/2026', resuelta: false },
  { id: '4', tipo: 'copago_sobre_arancel', severidad: 'media', mensaje: 'Copago supera arancel en 4 bonos', detalle: 'Prestaciones con copago mayor al 50% del arancel. Posible error de facturación.', fecha: '17/06/2026', resuelta: false },
  { id: '5', tipo: 'posible_duplicado', severidad: 'baja', mensaje: '3 posibles bonos duplicados detectados', detalle: 'Mismo paciente, prestación y fecha. Verificar si son atenciones distintas.', fecha: '16/06/2026', resuelta: true },
];

function SeveridadBadge({ severidad }: { severidad: string }) {
  const styles = {
    alta: 'bg-red-100 text-red-700 border-red-200',
    media: 'bg-amber-100 text-amber-700 border-amber-200',
    baja: 'bg-blue-100 text-blue-700 border-blue-200',
  };
  return (
    <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium ${styles[severidad as keyof typeof styles]}`}>
      {severidad.charAt(0).toUpperCase() + severidad.slice(1)}
    </span>
  );
}

export default function AlertasPage() {
  const [alertas, setAlertas] = useState(MOCK_ALERTAS);
  const [filtro, setFiltro] = useState<'todas' | 'pendientes' | 'resueltas'>('pendientes');

  function marcarResuelta(id: string) {
    setAlertas((prev) => prev.map((a) => a.id === id ? { ...a, resuelta: true } : a));
  }

  const alertasFiltradas = alertas.filter((a) => {
    if (filtro === 'pendientes') return !a.resuelta;
    if (filtro === 'resueltas') return a.resuelta;
    return true;
  });

  const pendientes = alertas.filter((a) => !a.resuelta).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
          <p className="text-sm text-gray-500">{pendientes} alertas pendientes</p>
        </div>
        <div className="flex gap-1 rounded-lg border bg-white p-1">
          {(['pendientes', 'resueltas', 'todas'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filtro === f ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {alertasFiltradas.map((alerta) => (
          <Card key={alerta.id} className={alerta.resuelta ? 'opacity-60' : ''}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <SeveridadBadge severidad={alerta.severidad} />
                  <span className="text-xs text-gray-400">{alerta.fecha}</span>
                </div>
                <h3 className="font-medium text-gray-900">{alerta.mensaje}</h3>
                <p className="mt-1 text-sm text-gray-500">{alerta.detalle}</p>
              </div>
              {!alerta.resuelta && (
                <Button size="sm" variant="secondary" onClick={() => marcarResuelta(alerta.id)}>
                  Resolver
                </Button>
              )}
              {alerta.resuelta && (
                <span className="text-xs text-green-600">✓ Resuelta</span>
              )}
            </div>
          </Card>
        ))}

        {alertasFiltradas.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <span className="text-4xl">🎉</span>
            <p className="mt-2">No hay alertas {filtro === 'pendientes' ? 'pendientes' : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}
