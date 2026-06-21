import { Card } from '@/components/ui/card';

const KPIS = [
  { label: 'Facturado', value: '$18.740.000', sub: '312 prestaciones', change: '+12%' },
  { label: 'Cobrado', value: '$14.950.000', sub: '79.8% recuperado', change: '+5%' },
  { label: 'Por cobrar', value: '$2.610.000', sub: '48 bonos en trámite', change: null },
  { label: 'Perdido', value: '$1.180.000', sub: '6.3% del facturado', change: '-2%' },
];

const RECHAZOS = [
  { razon: 'Prestación no cubierta por plan', cantidad: 14, monto: '$1.120.000' },
  { razon: 'Convenio vencido con aseguradora', cantidad: 9, monto: '$780.000' },
  { razon: 'Código de prestación incorrecto', cantidad: 7, monto: '$520.000' },
  { razon: 'Copago excede arancel pactado', cantidad: 5, monto: '$380.000' },
  { razon: 'Documentación incompleta', cantidad: 4, monto: '$290.000' },
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

export default function DashboardPage() {
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Rechazos */}
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
                </tr>
              </thead>
              <tbody>
                {RECHAZOS.map((r, i) => (
                  <tr key={r.razon} className={i < RECHAZOS.length - 1 ? 'border-b border-gray-50' : ''}>
                    <td className="px-5 py-2.5 text-gray-700">{r.razon}</td>
                    <td className="px-5 py-2.5 text-right text-gray-500">{r.cantidad}</td>
                    <td className="px-5 py-2.5 text-right font-medium text-gray-900">{r.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Distribución por aseguradora */}
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
