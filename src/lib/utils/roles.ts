export type Rol = 'superadmin' | 'cliente';

// Mapeo de emails a roles (después se mueve a DB con tabla perfiles)
const SUPERADMINS: string[] = [
  'pablo@remis.cl',
];

export function getRol(email: string | undefined): Rol {
  if (!email) return 'cliente';
  return SUPERADMINS.includes(email) ? 'superadmin' : 'cliente';
}

// Rutas visibles por rol
// El cliente ve TODO de su clínica — es autónomo
export const RUTAS_POR_ROL: Record<Rol, string[]> = {
  superadmin: ['/dashboard', '/bonos', '/carga', '/conciliacion', '/alertas', '/configuracion'],
  cliente: ['/dashboard', '/bonos', '/carga', '/conciliacion', '/alertas', '/configuracion'],
};
