import { format, subMonths } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'America/Santiago';

/**
 * Valida que un período tenga formato 'YYYY-MM'
 */
export function validarPeriodo(periodo: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(periodo);
}

/**
 * Retorna el período actual en formato 'YYYY-MM'
 */
export function periodoActual(): string {
  const now = toZonedTime(new Date(), TIMEZONE);
  return format(now, 'yyyy-MM');
}

/**
 * Retorna el período anterior al dado
 */
export function periodoAnterior(periodo: string): string {
  const [year, month] = periodo.split('-').map(Number);
  const date = new Date(year!, month! - 1, 1);
  const prev = subMonths(date, 1);
  return format(prev, 'yyyy-MM');
}
