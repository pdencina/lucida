import { NextRequest } from 'next/server';
import { jsonOk, jsonError } from '@/lib/api/response';
import { parsearCSV } from '@/lib/parser/csv';
import { parsearExcel } from '@/lib/parser/excel';
import { aplicarMapeo } from '@/lib/parser/mapeo';
import { type TipoArchivo, type MapeoColumnas } from '@/lib/parser/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const tipo = formData.get('tipo') as TipoArchivo | null;
    const mapeoRaw = formData.get('mapeo') as string | null;

    if (!file || !tipo || !mapeoRaw) {
      return jsonError('Archivo, tipo y mapeo son requeridos', 400);
    }

    const mapeo: MapeoColumnas = JSON.parse(mapeoRaw);
    const fileName = file.name.toLowerCase();
    let resultado;

    if (fileName.endsWith('.csv')) {
      const text = await file.text();
      resultado = parsearCSV(text);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const buffer = await file.arrayBuffer();
      resultado = parsearExcel(buffer);
    } else {
      return jsonError('Formato no soportado', 400);
    }

    // Aplicar mapeo de columnas
    const filasMapeadas = aplicarMapeo(resultado.filas, mapeo);

    // TODO: Guardar en Supabase (tabla bonos, liquidaciones, etc. según tipo)
    // Por ahora retornamos el resultado del procesamiento

    return jsonOk({
      tipo,
      totalFilas: resultado.totalFilas,
      filasOk: resultado.filasOk,
      filasError: resultado.filasError,
      errores: resultado.errores.slice(0, 10), // Primeros 10 errores
      muestra: filasMapeadas.slice(0, 5), // Muestra de datos procesados
    });
  } catch (error) {
    return jsonError('Error al procesar el archivo', 500);
  }
}
