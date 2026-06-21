import { Card } from '@/components/ui/card';

const KPIS = [
  { label: 'Emitido', value: '$12.450.000', sub: '234 bonos', trend: null },
  { label: 'Liquidado', value: '$9.820.000', sub: '78.9%', trend: 'up' },
  { label: 'Atrapado', value: '$2.630.000', sub: '21.1%', trend: 'down' },
  { label: 'Pendiente', value: '$1.180.000', sub: '45 bonos', trend: null },
];

const RECHAZOS = [
  { razon: 'Prestación no cubierta', cantidad: 12, monto: '$890.000' },
  { razon: 'Convenio vencido', cantidad: 8, monto: '$620.000' },
  { razon: 'Error en código prestación', cantidad: 6, monto: '$410.000' },
  { razon: 'Copago excede arancel', cantidad: 4, monto: '$340.000' },
  { razon: 'Duplicado', cantidad: 3, monto: '$180.000' },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Junio 2026</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <Card key={kpi.label} className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{kpi.label}</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">{kpi.value}</p>
            <p className="mt-0.5 text-xs text-gray-500">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="p-0">
        <div className="border-b border-gray-100 px-5 py-3">
          <h2 className="text-sm font-medium text-gray-900">Razones de rechazo</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
              <th className="px-5 py-2.5 font-medium">Razón</th>
              <th className="px-5 py-2.5 font-medium text-right">Bonos</th>
              <th className="px-5 py-2.5 font-medium text-right">Monto</th>
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
  );
}
