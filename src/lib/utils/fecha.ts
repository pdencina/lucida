import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'America/Santiago';

/**
 * Formatea una fecha a 'dd/MM/yyyy'
 */
export function formatearFecha(date: Date): string {
  const zoned = toZonedTime(date, TIMEZONE);
  return format(zoned, 'dd/MM/yyyy', { locale: es });
}

/**
 * Verifica si una fecha tiene más de X días desde hoy
 */
export function esMayorA(date: Date, dias: number): boolean {
  return diasTranscurridos(date) > dias;
}

/**
 * Calcula días transcurridos desde una fecha hasta hoy
 */
export function diasTranscurridos(desde: Date): number {
  const now = toZonedTime(new Date(), TIMEZONE);
  return differenceInDays(now, desde);
}
