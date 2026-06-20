'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/bonos', label: 'Bonos', icon: '📋' },
  { href: '/carga', label: 'Carga', icon: '📁' },
  { href: '/conciliacion', label: 'Conciliación', icon: '🔄' },
  { href: '/alertas', label: 'Alertas', icon: '🔔' },
  { href: '/configuracion', label: 'Configuración', icon: '⚙️' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 border-r bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary-700">Lúcida</h2>
          <p className="text-xs text-gray-400">Conciliación Clínica</p>
        </div>
        <nav className="mt-2 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
