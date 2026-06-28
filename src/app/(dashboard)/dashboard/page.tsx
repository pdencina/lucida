'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const KPIS = [
  { label: 'Facturado', value: '$18.740.000', sub: '312 prestaciones', change: '+12%' },
  { label: 'Cobrado', value: '$14.950.000', sub: '79.8% recuperado', change: '+5%' },
  { label: 'Por cobrar', value: '$2.610.000', sub: '48 bonos en trámite', change: null },
  { label: 'Perdido', value: '$1.180.000', sub: '6.3% del facturado', change: '-2%' },
];

const EVOLUCION = [
  { mes: 'Ene', facturado: 14200, cobrado: 11800 },
  { mes: 'Feb', facturado: 15100, cobrado: 12400 },
  { mes: 'Mar', facturado: 16800, cobrado: 13900 },
  { mes: 'Abr', facturado: 15900, cobrado: 13100 },
  { mes: 'May', facturado: 17200, cobrado: 14200 },
  { mes: 'Jun', facturado: 18740, cobrado: 14950 },
];

const RECHAZOS = [
  { razon: 'Prestación no cubierta por plan', cantidad: 14, monto: '$1.120.000', recuperable: true },
  { razon: 'Convenio vencido con aseguradora', cantidad: 9, monto: '$780.000', recuperable: true },
  { razon: 'Código de prestación incorrecto', cantidad: 7, monto: '$520.000', recuperable: true },
  { razon: 'Copago excede arancel pactado', cantidad: 5, monto: '$380.000', recuperable: false },
  { razon: 'Documentación incompleta', cantidad: 4, monto: '$290.000', recuperable: true },
];

const ASEGURADORAS = [
  { nombre: 'FONASA', monto: 7200000, porcentaje: 38.4, estado: 'ok' },
  { nombre: 'Banmédica', monto: 4100000, porcentaje: 21.9, estado: 'ok' },
  { nombre: 'Cruz Blanca', monto: 3200000, porcentaje: 17.1, estado: 'alerta' },
  { nombre: 'Colmena', monto: 2400000, porcentaje: 12.8, estado: 'ok' },
  { nombre: 'Consalud', monto: 1840000, porcentaje: 9.8, estado: 'critico' },
];

function formatCLP(n: number) {
  return '$' + n.toLocaleString('es-CL');
}

function formatTooltip(value: number) {
  return '$' + value.toLocaleString('es-CL') + '.000';
}

export default function DashboardPage() {
  const recuperable = RECHAZOS.filter(r => r.recuperable).reduce((sum, r) => {
    const monto = parseInt(r.monto.replace(/[$.\s]/g, ''), 10);
    return sum + monto;
  }, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Resumen del período</h1>
        <p className="text-sm text-gray-500">Junio 2026 · Última conciliación: hace 2 horas</p>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <Card key={kpi.label} className="p-4">
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{kpi.label}</p>
              {kpi.change && (
                <span className={`text-[11px] font-medium ${kpi.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.change}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xl font-semibold text-gray-900">{kpi.value}</p>
            <p className="mt-0.5 text-xs text-gray-500">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      {/* Gráfico de evolución + Recuperable */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">Evolución mensual</h2>
            <div className="flex items-center gap-4 text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gray-900"></span>Facturado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500"></span>Cobrado
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={EVOLUCION} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `$${v/1000}M`} />
              <Tooltip formatter={formatTooltip} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="facturado" fill="#111827" radius={[3, 3, 0, 0]} barSize={20} />
              <Bar dataKey="cobrado" fill="#10b981" radius={[3, 3, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="flex flex-col justify-between p-5">
          <div>
            <h2 className="text-sm font-medium text-gray-900">Dinero recuperable</h2>
            <p className="mt-1 text-xs text-gray-500">Monto que se puede reclamar corrigiendo errores</p>
          </div>
          <div className="my-4">
            <p className="text-3xl font-semibold text-emerald-600">{formatCLP(recuperable)}</p>
            <p className="mt-1 text-xs text-gray-500">de {formatCLP(1180000)} perdidos</p>
          </div>
          <div className="space-y-2">
            <RecuperableItem label="Corregir códigos de prestación" monto="$520.000" />
            <RecuperableItem label="Renovar convenio Cruz Blanca" monto="$780.000" />
            <RecuperableItem label="Completar documentación" monto="$290.000" />
          </div>
        </Card>
      </div>

      {/* Tabla de rechazos + Aseguradoras */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-gray-100 px-5 py-3">
              <h2 className="text-sm font-medium text-gray-900">Principales motivos de pérdida</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                  <th className="px-5 py-2 font-medium">Motivo</th>
                  <th className="px-5 py-2 font-medium text-right">Casos</th>
                  <th className="px-5 py-2 font-medium text-right">Monto</th>
                  <th className="px-5 py-2 font-medium text-center">Recuperable</th>
                </tr>
              </thead>
              <tbody>
                {RECHAZOS.map((r, i) => (
                  <tr key={r.razon} className={i < RECHAZOS.length - 1 ? 'border-b border-gray-50' : ''}>
                    <td className="px-5 py-2.5 text-gray-700">{r.razon}</td>
                    <td className="px-5 py-2.5 text-right text-gray-500">{r.cantidad}</td>
                    <td className="px-5 py-2.5 text-right font-medium text-gray-900">{r.monto}</td>
                    <td className="px-5 py-2.5 text-center">
                      {r.recuperable ? (
                        <span className="inline-block h-4 w-4 rounded-full bg-emerald-100 text-center text-[10px] leading-4 text-emerald-700">✓</span>
                      ) : (
                        <span className="inline-block h-4 w-4 rounded-full bg-gray-100 text-center text-[10px] leading-4 text-gray-400">–</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-0">
            <div className="border-b border-gray-100 px-5 py-3">
              <h2 className="text-sm font-medium text-gray-900">Por aseguradora</h2>
            </div>
            <div className="divide-y divide-gray-50 px-5">
              {ASEGURADORAS.map((a) => (
                <div key={a.nombre} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      a.estado === 'ok' ? 'bg-emerald-400' : a.estado === 'alerta' ? 'bg-amber-400' : 'bg-red-400'
                    }`} />
                    <span className="text-sm text-gray-700">{a.nombre}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{formatCLP(a.monto)}</span>
                    <span className="ml-2 text-xs text-gray-400">{a.porcentaje}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RecuperableItem({ label, monto }: { label: string; monto: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
      <span className="text-xs text-gray-600">{label}</span>
      <span className="text-xs font-medium text-emerald-600">{monto}</span>
    </div>
  );
}
