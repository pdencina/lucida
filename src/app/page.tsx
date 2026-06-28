import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
              <span className="text-xs font-bold text-white">R</span>
            </div>
            <span className="text-[15px] font-semibold text-gray-900">Remis</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700">Iniciar sesión</Link>
            <Link href="/login" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Acceder
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
            Sepa exactamente cuánto le deben<br />las aseguradoras a su clínica.
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Cruzamos sus bonos con las liquidaciones de FONASA e Isapres. 
            Le mostramos cuánto cobró, cuánto está pendiente, y cuánto puede recuperar.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link href="/login" className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
              Acceder a mi cuenta
            </Link>
            <Link href="/propuesta" className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Ver propuesta →
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-xl font-semibold text-gray-900">¿Cómo funciona?</h2>
          <p className="mt-2 text-center text-sm text-gray-500">Nosotros hacemos todo el trabajo. Usted solo ve los resultados.</p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Step n={1} titulo="Nos envía sus archivos" desc="Los Excel de bonos emitidos y liquidaciones de FONASA/Isapres que ya maneja. Por email o WhatsApp." />
            <Step n={2} titulo="Procesamos y cruzamos" desc="Nuestro sistema concilia cada bono contra su liquidación correspondiente. Bono por bono, peso por peso." />
            <Step n={3} titulo="Ve sus resultados" desc="Accede a su panel con el resumen: cuánto cobró, cuánto está pendiente, cuánto puede reclamar." />
          </div>
        </div>
      </section>

      {/* Qué ve */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-xl font-semibold text-gray-900">¿Qué información obtiene?</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard titulo="Facturado vs Cobrado" desc="Cuánto emitió en bonos y cuánto le pagaron realmente las aseguradoras." />
          <InfoCard titulo="Dinero atrapado" desc="Bonos rechazados o sin respuesta que se pueden reclamar antes de que prescriban." />
          <InfoCard titulo="Por aseguradora" desc="Qué Isapre le está pagando bien y cuál le debe plata." />
          <InfoCard titulo="Tendencia mensual" desc="Cómo evoluciona su recuperación mes a mes para tomar decisiones." />
        </div>
      </section>

      {/* Precio */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Inversión</h2>
          <div className="mx-auto mt-8 max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-gray-500">Plan mensual</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">$89.000 <span className="text-base font-normal text-gray-400">/ mes + IVA</span></p>
            <ul className="mt-6 space-y-2 text-left text-sm text-gray-600">
              <li className="flex items-center gap-2"><Check /> Conciliación mensual completa</li>
              <li className="flex items-center gap-2"><Check /> Dashboard con resultados en tiempo real</li>
              <li className="flex items-center gap-2"><Check /> Alertas de bonos rechazados</li>
              <li className="flex items-center gap-2"><Check /> Sin implementación técnica</li>
              <li className="flex items-center gap-2"><Check /> Sin permanencia mínima</li>
              <li className="flex items-center gap-2"><Check /> Soporte por WhatsApp</li>
            </ul>
            <Link href="/login" className="mt-6 block rounded-lg bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800">
              Comenzar
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-xl font-semibold text-gray-900">Preguntas frecuentes</h2>
        <div className="mt-8 space-y-6">
          <Faq q="¿Necesito instalar algo?" a="No. Nosotros procesamos sus archivos y usted accede a los resultados desde el navegador. No hay software que instalar." />
          <Faq q="¿Qué archivos necesitan?" a="Los mismos Excel que ya maneja: bonos emitidos del mes y la liquidación de FONASA o Isapre. Nos los puede mandar por email o WhatsApp." />
          <Faq q="¿Cuánto tarda?" a="Desde que recibimos los archivos, en 24-48 horas tiene su análisis listo en el panel." />
          <Faq q="¿Quién administra el sistema?" a="Nosotros. Usted solo revisa los resultados y toma decisiones. No necesita personal técnico." />
          <Faq q="¿Puedo cancelar cuando quiera?" a="Sí. No hay contrato ni permanencia. Si un mes no le sirve, se cancela y listo." />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-900">
                <span className="text-[10px] font-bold text-white">R</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Remis</span>
            </div>
            <p className="text-xs text-gray-400">Conciliación de ingresos clínicos · Chile</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Step({ n, titulo, desc }: { n: number; titulo: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
        {n}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">{titulo}</h3>
      <p className="mt-2 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function InfoCard({ titulo, desc }: { titulo: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900">{titulo}</h3>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-emerald-500">
      <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">{q}</h3>
      <p className="mt-1 text-sm text-gray-500">{a}</p>
    </div>
  );
}
