import Papa from 'papaparse';
import { type ResultadoParseo, type VistaPrevia } from './types';

/**
 * Genera una vista previa del CSV (primeras 10 filas)
 */
export function previsualizarCSV(contenido: string): VistaPrevia {
  const result = Papa.parse(contenido, {
    header: false,
    preview: 11, // 1 header + 10 filas
    skipEmptyLines: true,
  });

  const filas = result.data as string[][];
  const columnas = filas[0] || [];
  const datos = filas.slice(1);

  return {
    columnas,
    filas: datos,
    totalFilas: contenido.split('\n').filter(l => l.trim()).length - 1,
  };
}

/**
 * Parsea un CSV completo con headers
 */
export function parsearCSV(contenido: string): ResultadoParseo {
  const result = Papa.parse(contenido, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim().toLowerCase(),
  });

  const errores = result.errors.map((e, i) => ({
    fila: e.row ?? i,
    campo: '',
    valor: '',
    mensaje: e.message,
  }));

  const filas = result.data as Record<string, unknown>[];

  return {
    filas,
    errores,
    totalFilas: filas.length + errores.length,
    filasOk: filas.length,
    filasError: errores.length,
  };
}
