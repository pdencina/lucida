'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { createClient } from '@/lib/utils/supabase/client';
import { getRol, RUTAS_POR_ROL, type Rol } from '@/lib/utils/roles';

const ALL_NAV_ITEMS = [
  { href: '/dashboard', label: 'Resumen', icon: DashboardIcon },
  { href: '/bonos', label: 'Bonos', icon: BonosIcon },
  { href: '/carga', label: 'Carga', icon: CargaIcon },
  { href: '/conciliacion', label: 'Conciliación', icon: ConciliacionIcon },
  { href: '/alertas', label: 'Alertas', icon: AlertasIcon, badge: 4 },
  { href: '/configuracion', label: 'Configuración', icon: ConfigIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [rol, setRol] = useState<Rol>('clinica');
  const [email, setEmail] = useState<string>('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const userEmail = data.user?.email || '';
      setEmail(userEmail);
      setRol(getRol(userEmail));
      setLoaded(true);
    });
  }, []);

  const navItems = ALL_NAV_ITEMS.filter((item) =>
    RUTAS_POR_ROL[rol].includes(item.href)
  );

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  const initials = email ? email.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex h-14 items-center px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
              <span className="text-xs font-bold text-white">R</span>
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-gray-900">Remis</span>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-2">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'group flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] font-medium transition-all duration-150',
                    isActive
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon active={isActive} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && rol === 'admin' && (
                    <span className={clsx(
                      'flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-semibold',
                      isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Usuario */}
        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-gray-900">BS Salud</p>
              <p className="truncate text-[11px] text-gray-400">{loaded ? email : '...'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-current">
              <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="ml-56 flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-6xl px-8 py-6">
          <div className={clsx(
            'transition-opacity duration-200',
            loaded ? 'opacity-100' : 'opacity-0'
          )}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BonosIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 6h6M5 8.5h6M5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CargaIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>
      <path d="M8 10V3m0 0L5.5 5.5M8 3l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10v2a2 2 0 002 2h6a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ConciliacionIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>
      <path d="M2 8h3l2-4 2 8 2-4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertasIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>
      <path d="M6.5 14h3M8 1.5a4.5 4.5 0 014.5 4.5c0 2.5 1 4 1 4H2.5s1-1.5 1-4A4.5 4.5 0 018 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConfigIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
