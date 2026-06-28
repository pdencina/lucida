import * as XLSX from 'xlsx';
import { type ResultadoParseo, type VistaPrevia } from './types';

/**
 * Genera vista previa de un archivo Excel (primeras 10 filas)
 */
export function previsualizarExcel(buffer: ArrayBuffer): VistaPrevia {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return { columnas: [], filas: [], totalFilas: 0 };
  }

  const sheet = workbook.Sheets[sheetName]!;
  const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, defval: '' });

  const columnas = (data[0] || []).map(String);
  const filas = data.slice(1, 11).map(row => row.map(String));
  const totalFilas = data.length - 1;

  return { columnas, filas, totalFilas };
}

/**
 * Parsea un Excel completo con headers
 */
export function parsearExcel(buffer: ArrayBuffer): ResultadoParseo {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return { filas: [], errores: [], totalFilas: 0, filasOk: 0, filasError: 0 };
  }

  const sheet = workbook.Sheets[sheetName]!;
  const filas = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
    raw: false,
  });

  // Normalizar headers a lowercase
  const filasNormalizadas = filas.map(fila => {
    const nueva: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(fila)) {
      nueva[key.trim().toLowerCase()] = val;
    }
    return nueva;
  });

  return {
    filas: filasNormalizadas,
    errores: [],
    totalFilas: filasNormalizadas.length,
    filasOk: filasNormalizadas.length,
    filasError: 0,
  };
}
