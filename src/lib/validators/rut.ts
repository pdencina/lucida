// TODO: T-1.8 — Validador de RUT chileno

/**
 * Valida un RUT chileno (formato con o sin puntos/guión).
 * Ejemplo: '12345678-9', '12.345.678-9'
 */
export function validarRut(rut: string): boolean {
  // Limpiar formato
  const clean = rut.replace(/[.\-]/g, '').toUpperCase();

  if (clean.length < 2) return false;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  const dvCalculado = calcularDV(parseInt(cuerpo, 10));
  return dv === dvCalculado;
}

/**
 * Formatea RUT a formato estándar: '12.345.678-9'
 */
export function formatearRut(rut: string): string {
  const clean = rut.replace(/[.\-]/g, '').toUpperCase();
  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  const formatted = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formatted}-${dv}`;
}

/**
 * Enmascara RUT para mostrar en UI: '****678-9'
 */
export function enmascararRut(rut: string): string {
  const clean = rut.replace(/[.\-]/g, '').toUpperCase();
  if (clean.length < 5) return '****';

  const visible = clean.slice(-5); // últimos 4 dígitos + DV
  return `****${visible.slice(0, 3)}-${visible.slice(-1)}`;
}

function calcularDV(cuerpo: number): string {
  let suma = 0;
  let multiplicador = 2;
  let rutStr = cuerpo.toString();

  for (let i = rutStr.length - 1; i >= 0; i--) {
    suma += parseInt(rutStr[i]!, 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);

  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return resto.toString();
}
