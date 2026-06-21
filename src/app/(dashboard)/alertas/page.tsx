'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Alerta {
  id: string;
  severidad: 'alta' | 'media' | 'baja';
  titulo: string;
  detalle: string;
  accion: string;
  fecha: string;
  resuelta: boolean;
}

const ALERTAS_INICIALES: Alerta[] = [
  { id: '1', severidad: 'alta', titulo: 'Consalud rechaza 54% de bonos este mes', detalle: 'Tasa de rechazo muy por encima del umbral de 30%. Revisar convenio y codificación de prestaciones.', accion: 'Revisar convenio', fecha: '20 jun', resuelta: false },
  { id: '2', severidad: 'alta', titulo: '14 bonos sin liquidar hace +20 días', detalle: 'Banmédica no ha respondido bonos emitidos antes del 31/05. Contactar ejecutivo de cuenta.', accion: 'Contactar ejecutivo', fecha: '19 jun', resuelta: false },
  { id: '3', severidad: 'media', titulo: 'Convenio Cruz Blanca vence en 25 días', detalle: 'El convenio actual expira el 15/07/2026. Iniciar proceso de renovación.', accion: 'Renovar convenio', fecha: '18 jun', resuelta: false },
  { id: '4', severidad: 'media', titulo: 'Copago supera arancel en 5 prestaciones', detalle: 'Se detectaron consultas donde el copago cobrado es mayor al 50% del arancel pactado. Posible error de facturación.', accion: 'Revisar facturación', fecha: '17 jun', resuelta: false },
  { id: '5', severidad: 'baja', titulo: '3 posibles bonos duplicados', detalle: 'Mismo paciente, misma prestación y misma fecha. Verificar si corresponden a atenciones distintas.', accion: 'Verificar', fecha: '16 jun', resuelta: true },
];

export default function AlertasPage() {
  const [alertas, setAlertas] = useState(ALERTAS_INICIALES);
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
          <p className="text-sm text-gray-500">{pendientes} requieren atención</p>
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
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                alerta.severidad === 'alta' ? 'bg-red-500' : alerta.severidad === 'media' ? 'bg-amber-400' : 'bg-gray-300'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alerta.titulo}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{alerta.detalle}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-gray-400">{alerta.fecha}</span>
                </div>
                {!alerta.resuelta && (
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" onClick={() => resolver(alerta.id)}>{alerta.accion}</Button>
                    <button
                      onClick={() => resolver(alerta.id)}
                      className="text-[12px] text-gray-400 hover:text-gray-600"
                    >
                      Descartar
                    </button>
                  </div>
                )}
                {alerta.resuelta && (
                  <p className="mt-2 text-[11px] text-gray-400">Resuelta</p>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filtradas.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">Sin alertas {filtro !== 'todas' ? filtro : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}
