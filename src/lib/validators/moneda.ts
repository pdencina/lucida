/**
 * Formatea un monto entero a formato CLP: '$1.234.567'
 */
export function formatearCLP(monto: number): string {
  return '$' + monto.toLocaleString('es-CL');
}

/**
 * Parsea un string de monto CLP a entero.
 * Acepta: '1.234.567', '$1.234.567', '1234567'
 */
export function parsearMontoCLP(valor: string): number {
  const clean = valor.replace(/[$.\s]/g, '').replace(',', '.');
  const parsed = parseInt(clean, 10);

  if (isNaN(parsed)) {
    throw new Error(`Monto inválido: "${valor}"`);
  }

  return parsed;
}
