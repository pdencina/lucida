import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
              <span className="text-xs font-bold text-white">R</span>
            </div>
            <span className="text-[15px] font-semibold text-gray-900">Remis</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#como-funciona" className="hidden text-sm text-gray-500 hover:text-gray-900 sm:block">Cómo funciona</a>
            <a href="#precio" className="hidden text-sm text-gray-500 hover:text-gray-900 sm:block">Precio</a>
            <Link href="/login" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              Acceder
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-32">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium text-gray-400">Conciliación de ingresos clínicos</p>
          <h1 className="text-3xl font-semibold leading-[1.2] tracking-tight text-gray-900 sm:text-[42px]">
            Controle cada peso que entra a su clínica.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-gray-500">
            Cruzamos lo que factura con lo que le pagan FONASA e Isapres. Le mostramos dónde se queda su dinero y qué puede recuperar.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a href="#contacto" className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 active:scale-[0.98]">
              Solicitar demo
            </a>
            <a href="#como-funciona" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Ver cómo funciona →
            </a>
          </div>
        </div>
      </section>

      {/* Métricas */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-gray-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Stat value="8-15%" label="de los ingresos se pierden sin seguimiento" />
          <Stat value="24-48h" label="para su primer análisis real" />
          <Stat value="$0" label="de implementación técnica" />
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-medium text-gray-400">Proceso</p>
        <h2 className="mt-2 text-2xl font-semibold text-gray-900">Nosotros operamos. Usted ve resultados.</h2>
        <p className="mt-3 max-w-lg text-sm text-gray-500">No necesita instalar nada ni capacitar a su equipo. El proceso completo lo hacemos nosotros.</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <ProcessStep n="01" titulo="Nos envía sus archivos" desc="Los mismos Excel que ya maneja: bonos emitidos y liquidaciones de FONASA o Isapres. Por email o WhatsApp." />
          <ProcessStep n="02" titulo="Cruzamos y analizamos" desc="Conciliamos cada bono contra su liquidación. Identificamos rechazos, montos pendientes y diferencias." />
          <ProcessStep n="03" titulo="Accede a su panel" desc="Ve exactamente cuánto cobró, cuánto está pendiente y cuánto puede recuperar. Con acciones concretas." />
        </div>
      </section>

      {/* Qué obtiene */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-sm font-medium text-gray-400">Plataforma</p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">Todo lo que necesita para no perder dinero.</h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature titulo="Conciliación automática" desc="Cruce de bonos vs liquidaciones bono por bono, peso por peso." />
            <Feature titulo="Detección de rechazos" desc="Sepa qué bonos se rechazaron, por qué, y cuáles puede reclamar." />
            <Feature titulo="Análisis por aseguradora" desc="Identifique qué Isapre le paga bien y cuál le debe." />
            <Feature titulo="Dinero recuperable" desc="Cuánto puede recuperar corrigiendo errores comunes de facturación." />
            <Feature titulo="Evolución mensual" desc="Vea cómo mejora su recuperación período a período." />
            <Feature titulo="Alertas proactivas" desc="Le avisamos si hay bonos sin respuesta, convenios por vencer o tasas anómalas." />
          </div>
        </div>
      </section>

      {/* Precio */}
      <section id="precio" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium text-gray-400">Precio</p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">Una tarifa simple. Sin sorpresas.</h2>
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-3xl font-semibold text-gray-900">$89.000 <span className="text-base font-normal text-gray-400">/ mes + IVA</span></p>
            <p className="mt-2 text-sm text-gray-500">Todo incluido. Sin implementación. Sin permanencia.</p>
            <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
              <CheckItem text="Conciliación mensual completa" />
              <CheckItem text="Dashboard con resultados en tiempo real" />
              <CheckItem text="Alertas de bonos rechazados y pendientes" />
              <CheckItem text="Soporte directo por WhatsApp" />
              <CheckItem text="Sin contrato ni permanencia mínima" />
              <CheckItem text="Sin costo de implementación" />
            </ul>
            <a href="#contacto" className="mt-6 block rounded-lg bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98]">
              Solicitar demo
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold text-gray-900">Preguntas frecuentes</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Faq q="¿Necesito instalar algo?" a="No. Todo funciona desde el navegador. No hay software que instalar ni configurar en su clínica." />
            <Faq q="¿Qué archivos necesitan?" a="Los Excel de bonos emitidos y la liquidación de FONASA o Isapre del mes. Los que ya maneja hoy." />
            <Faq q="¿Quién administra el sistema?" a="Nosotros hacemos todo. Usted solo revisa los resultados y decide qué reclamar." />
            <Faq q="¿Cuánto tarda la primera entrega?" a="24 a 48 horas desde que recibimos sus archivos. Sin reuniones largas de implementación." />
            <Faq q="¿Puedo cancelar cuando quiera?" a="Sí. Sin contrato, sin penalización. Si no le sirve, deja de pagar y listo." />
            <Faq q="¿Es seguro compartir mis datos?" a="Sus datos están aislados y encriptados. Solo usted y su equipo pueden verlos." />
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-900">¿Le interesa probarlo?</h2>
          <p className="mt-3 text-sm text-gray-500">Mándenos un archivo de bonos de un mes y le entregamos el análisis real de su clínica. Sin costo, sin compromiso.</p>
          <div className="mt-8 space-y-3">
            <a
              href="https://wa.me/56900000000?text=Hola%2C%20me%20interesa%20una%20demo%20de%20Remis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.08-1.107l-.292-.175-2.868.852.852-2.868-.175-.292A8 8 0 1112 20z" />
              </svg>
              Contactar por WhatsApp
            </a>
            <a
              href="mailto:contacto@remis.cl?subject=Interesado en demo de Remis"
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
            >
              Escribir por email
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">contacto@remis.cl</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-900">
                <span className="text-[9px] font-bold text-white">R</span>
              </div>
              <span className="text-xs font-medium text-gray-500">Remis</span>
            </div>
            <p className="text-xs text-gray-400">© 2026 · Chile</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-2 py-6 text-center">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}

function ProcessStep({ n, titulo, desc }: { n: string; titulo: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <span className="text-xs font-semibold text-gray-300">{n}</span>
      <h3 className="mt-3 text-sm font-semibold text-gray-900">{titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
    </div>
  );
}

function Feature({ titulo, desc }: { titulo: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-900">{titulo}</h3>
      <p className="mt-1.5 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-emerald-500">
        <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </li>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">{q}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{a}</p>
    </div>
  );
}
