export default function PropuestaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-sm font-medium text-gray-400">Propuesta para</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">BS Salud</h1>
        <p className="mt-2 text-sm text-gray-500">Preparado por Remis · Junio 2026</p>
      </div>

      {/* El problema */}
      <Section titulo="El problema">
        <p>
          Cada mes tu clínica factura millones en prestaciones médicas. Ese dinero pasa por un camino largo
          antes de llegar a tu cuenta:
        </p>
        <Flow steps={[
          'Paciente se atiende',
          'Se emite el bono',
          'Se envía a FONASA o Isapre',
          'Ellos aprueban (o rechazan)',
          'Depositan en tu banco',
        ]} />
        <p>
          El problema es que <strong>entre lo que facturas y lo que realmente llega a tu cuenta hay una brecha</strong>.
          Bonos que se rechazan, pagos que se atrasan, montos que no cuadran. Y hoy nadie está mirando eso de forma sistemática.
        </p>
        <Highlight>
          En promedio, las clínicas pierden entre un 8% y 15% de sus ingresos por falta de seguimiento.
          Para una clínica que factura $18 millones al mes, eso son $1.4 a $2.7 millones que se pierden sin que nadie se dé cuenta.
        </Highlight>
      </Section>

      {/* Qué hace Remis */}
      <Section titulo="Qué hace Remis">
        <p>
          Remis es una plataforma que <strong>cruza toda la información financiera de tu clínica</strong> y te muestra
          exactamente dónde se está quedando tu plata.
        </p>
        <div className="mt-6 space-y-4">
          <Feature
            titulo="1. Subes tus archivos"
            desc="Los mismos Excel que ya manejas: bonos emitidos, liquidaciones de Isapres, cartolas del banco. Remis los lee automáticamente."
          />
          <Feature
            titulo="2. Cruzamos todo"
            desc="Comparamos lo que facturaste vs lo que te pagaron vs lo que llegó al banco. Bono por bono, peso por peso."
          />
          <Feature
            titulo="3. Te mostramos dónde está tu plata"
            desc="Un resumen claro: cuánto cobraste, cuánto está en trámite, cuánto se perdió y por qué."
          />
          <Feature
            titulo="4. Te alertamos"
            desc="Si una Isapre te está rechazando mucho, si hay bonos sin respuesta hace 20 días, si un convenio está por vencer. No tienes que acordarte de revisar."
          />
        </div>
      </Section>

      {/* Ejemplo real */}
      <Section titulo="Un ejemplo concreto">
        <p>Supongamos que en junio BS Salud factura $18.7 millones:</p>
        <table className="mt-4 w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            <Row label="Facturado (bonos emitidos)" value="$18.740.000" />
            <Row label="Cobrado (lo que sí llegó)" value="$14.950.000" highlight="emerald" />
            <Row label="En trámite (esperando respuesta)" value="$2.610.000" />
            <Row label="Perdido (rechazos sin gestión)" value="$1.180.000" highlight="red" />
          </tbody>
        </table>
        <p className="mt-4">
          Sin Remis, ese $1.180.000 perdido <strong>pasa desapercibido</strong>. Con Remis, sabes exactamente
          qué bonos se rechazaron, por qué, y qué puedes hacer para recuperar parte de ese monto (corregir códigos,
          reclamar, renovar convenios).
        </p>
      </Section>

      {/* Qué incluye */}
      <Section titulo="Qué incluye">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Item text="Carga de archivos Excel/CSV ilimitada" />
          <Item text="Conciliación automática mensual" />
          <Item text="Alertas inteligentes por email" />
          <Item text="Dashboard con KPIs en tiempo real" />
          <Item text="Detalle por aseguradora y prestación" />
          <Item text="Historial de todos los períodos" />
          <Item text="Multi-usuario (admin + staff)" />
          <Item text="Soporte por WhatsApp" />
        </div>
      </Section>

      {/* Inversión */}
      <Section titulo="Inversión">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">Plan mensual</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">$89.000 <span className="text-base font-normal text-gray-400">/ mes + IVA</span></p>
          <p className="mt-2 text-sm text-gray-500">Sin permanencia mínima · Cancela cuando quieras</p>
        </div>
        <Highlight>
          Si Remis te ayuda a recuperar aunque sea $500.000 al mes de lo que hoy se pierde,
          el retorno es de 5x la inversión. En la práctica, los centros que hacen seguimiento activo
          recuperan entre $800.000 y $2.000.000 mensuales.
        </Highlight>
      </Section>

      {/* Próximos pasos */}
      <Section titulo="Próximos pasos">
        <div className="space-y-3">
          <Step n={1} text="Nos envías un archivo de bonos de ejemplo (el que tengas a mano)" />
          <Step n={2} text="Lo procesamos y te mostramos el análisis real de tu clínica" />
          <Step n={3} text="Si te hace sentido, activamos tu cuenta y empezamos" />
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Sin compromiso. Si el análisis no te muestra valor, no pagas nada.
        </p>
      </Section>

      {/* Footer */}
      <div className="mt-16 border-t border-gray-100 pt-8 text-center">
        <p className="text-sm font-medium text-gray-900">remis</p>
        <p className="mt-1 text-xs text-gray-400">Conciliación de ingresos clínicos</p>
        <p className="mt-3 text-xs text-gray-400">contacto@remis.cl</p>
      </div>
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-base font-semibold text-gray-900">{titulo}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-gray-600">{children}</div>
    </section>
  );
}

function Feature({ titulo, desc }: { titulo: string; desc: string }) {
  return (
    <div className="rounded-md border border-gray-100 bg-gray-50 px-4 py-3">
      <p className="text-sm font-medium text-gray-900">{titulo}</p>
      <p className="mt-0.5 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">{step}</span>
          {i < steps.length - 1 && <span className="text-gray-300">→</span>}
        </span>
      ))}
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 border-l-2 border-gray-900 bg-gray-50 px-4 py-3 text-sm text-gray-700">
      {children}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: 'emerald' | 'red' }) {
  return (
    <tr>
      <td className="py-2 text-gray-600">{label}</td>
      <td className={`py-2 text-right font-medium ${
        highlight === 'emerald' ? 'text-emerald-600' : highlight === 'red' ? 'text-red-600' : 'text-gray-900'
      }`}>{value}</td>
    </tr>
  );
}

function Item({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-100 px-3 py-2">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-emerald-500">
        <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">{n}</span>
      <p className="text-sm text-gray-700 pt-0.5">{text}</p>
    </div>
  );
}
