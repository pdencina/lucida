export const APP_NAME = 'Lúcida';
export const TIMEZONE = 'America/Santiago';
export const LOCALE = 'es-CL';
export const ITEMS_PER_PAGE = 50;
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ASEGURADORAS = [
  'FONASA',
  'Banmédica',
  'Cruz Blanca',
  'Colmena',
  'Vida Tres',
  'Consalud',
  'Masvida',
  'Nueva Masvida',
] as const;

export const ESTADOS_BONO = ['pendiente', 'conciliado', 'rechazado'] as const;
export const ROLES = ['admin', 'staff'] as const;
