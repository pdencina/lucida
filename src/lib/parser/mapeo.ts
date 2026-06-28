import { type MapeoColumnas, type TipoArchivo } from './types';

/**
 * Columnas esperadas por tipo de archivo
 */
const COLUMNAS_ESPERADAS: Record<TipoArchivo, string[]> = {
  bonos: ['folio', 'fecha', 'paciente_nombre', 'paciente_rut', 'prestacion_cod', 'prestacion_nombre', 'aseguradora', 'monto_total', 'bonificacion', 'copago'],
  liquidaciones: ['folio_bono', 'aseguradora', 'periodo', 'paciente_rut', 'prestacion_cod', 'fecha_prestacion', 'monto_presentado', 'monto_reconocido', 'estado', 'razon_rechazo'],
  movimientos_banco: ['fecha', 'descripcion', 'monto', 'tipo', 'referencia'],
  pagos_tarjeta: ['fecha', 'monto', 'referencia', 'comercio', 'estado'],
};

/**
 * Sugiere mapeo automático entre columnas del archivo y columnas esperadas
 * usando similitud de nombres (fuzzy match simple)
 */
export function sugerirMapeo(columnasArchivo: string[], tipo: TipoArchivo): MapeoColumnas {
  const esperadas = COLUMNAS_ESPERADAS[tipo];
  const mapeo: MapeoColumnas = {};

  for (const esperada of esperadas) {
    const match = encontrarMejorMatch(esperada, columnasArchivo);
    if (match) {
      mapeo[esperada] = match;
    }
  }

  return mapeo;
}

/**
 * Aplica un mapeo de columnas a un array de filas
 */
export function aplicarMapeo(filas: Record<string, unknown>[], mapeo: MapeoColumnas): Record<string, unknown>[] {
  return filas.map(fila => {
    const nueva: Record<string, unknown> = {};
    for (const [destino, origen] of Object.entries(mapeo)) {
      nueva[destino] = fila[origen] ?? null;
    }
    return nueva;
  });
}

/**
 * Retorna las columnas esperadas para un tipo de archivo
 */
export function getColumnasEsperadas(tipo: TipoArchivo): string[] {
  return COLUMNAS_ESPERADAS[tipo];
}

function encontrarMejorMatch(objetivo: string, candidatos: string[]): string | null {
  const normalizado = normalizar(objetivo);

  // Match exacto
  const exacto = candidatos.find(c => normalizar(c) === normalizado);
  if (exacto) return exacto;

  // Match parcial (contiene)
  const parcial = candidatos.find(c => 
    normalizar(c).includes(normalizado) || normalizado.includes(normalizar(c))
  );
  if (parcial) return parcial;

  // Match por similitud de palabras
  const palabrasObjetivo = normalizado.split(/[_\s-]+/);
  const porSimilitud = candidatos.find(c => {
    const palabrasC = normalizar(c).split(/[_\s-]+/);
    return palabrasObjetivo.some(p => palabrasC.some(pc => pc.includes(p) || p.includes(pc)));
  });

  return porSimilitud || null;
}

function normalizar(s: string): string {
  return s.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_\s-]/g, '')
    .trim();
}
