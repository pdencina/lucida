import { NextRequest } from 'next/server';
import { jsonOk, jsonError } from '@/lib/api/response';
import { previsualizarCSV } from '@/lib/parser/csv';
import { previsualizarExcel } from '@/lib/parser/excel';
import { sugerirMapeo } from '@/lib/parser/mapeo';
import { type TipoArchivo } from '@/lib/parser/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const tipo = formData.get('tipo') as TipoArchivo | null;

    if (!file || !tipo) {
      return jsonError('Archivo y tipo son requeridos', 400);
    }

    const fileName = file.name.toLowerCase();
    let preview;

    if (fileName.endsWith('.csv')) {
      const text = await file.text();
      preview = previsualizarCSV(text);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const buffer = await file.arrayBuffer();
      preview = previsualizarExcel(buffer);
    } else {
      return jsonError('Formato no soportado. Use CSV o Excel (.xlsx)', 400);
    }

    // Sugerir mapeo automático
    const mapeoSugerido = sugerirMapeo(preview.columnas, tipo);

    return jsonOk({
      preview,
      mapeoSugerido,
      tipo,
    });
  } catch (error) {
    return jsonError('Error al procesar el archivo', 500);
  }
}
