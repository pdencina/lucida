import { Card } from '@/components/ui/card';

const MOCK_KPIS = [
  { label: 'Emitido', value: '$12.450.000', detail: '234 bonos', color: 'text-gray-900' },
  { label: 'Liquidado', value: '$9.820.000', detail: '78.9% del emitido', color: 'text-green-600' },
  { label: 'Atrapado', value: '$2.630.000', detail: '21.1% sin recuperar', color: 'text-red-600' },
  { label: 'Pendiente', value: '$1.180.000', detail: '45 bonos en espera', color: 'text-amber-600' },
];

const MOCK_RECHAZOS = [
  { razon: 'Prestación no cubierta', cantidad: 12, monto: '$890.000' },
  { razon: 'Convenio vencido', cantidad: 8, monto: '$620.000' },
  { razon: 'Error en código prestación', cantidad: 6, monto: '$410.000' },
  { razon: 'Copago excede arancel', cantidad: 4, monto: '$340.000' },
  { razon: 'Duplicado', cantidad: 3, monto: '$180.000' },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Período: Junio 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_KPIS.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
            <p className={`mt-1 text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="mt-1 text-xs text-gray-400">{kpi.detail}</p>
          </Card>
        ))}
      </div>

      {/* Top Rechazos */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Razones de Rechazo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2 font-medium">Razón</th>
                <th className="pb-2 font-medium text-right">Bonos</th>
                <th className="pb-2 font-medium text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_RECHAZOS.map((r) => (
                <tr key={r.razon} className="text-gray-700">
                  <td className="py-2.5">{r.razon}</td>
                  <td className="py-2.5 text-right">{r.cantidad}</td>
                  <td className="py-2.5 text-right font-medium">{r.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
