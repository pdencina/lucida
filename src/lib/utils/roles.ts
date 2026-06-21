export type Rol = 'admin' | 'clinica';

// Mapeo de emails a roles (después se puede mover a DB)
const ROLES: Record<string, Rol> = {
  'pablo@remis.cl': 'admin',
};

export function getRol(email: string | undefined): Rol {
  if (!email) return 'clinica';
  return ROLES[email] || 'clinica';
}

// Rutas visibles por rol
export const RUTAS_POR_ROL: Record<Rol, string[]> = {
  admin: ['/', '/bonos', '/carga', '/conciliacion', '/alertas', '/configuracion'],
  clinica: ['/', '/bonos', '/conciliacion'],
};
