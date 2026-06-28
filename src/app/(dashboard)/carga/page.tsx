'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Paso = 'subir' | 'preview' | 'procesando' | 'resultado';
type TipoArchivo = 'bonos' | 'liquidaciones' | 'movimientos_banco' | 'pagos_tarjeta';

interface PreviewData {
  columnas: string[];
  filas: string[][];
  totalFilas: number;
  mapeoSugerido: Record<string, string>;
}

interface ResultadoData {
  totalFilas: number;
  filasOk: number;
  filasError: number;
  errores: Array<{ fila: number; mensaje: string }>;
}

const TIPOS_ARCHIVO = [
  { value: 'bonos', label: 'Bonos emitidos', desc: 'Archivo con las prestaciones facturadas' },
  { value: 'liquidaciones', label: 'Liquidaciones', desc: 'Respuesta de FONASA o Isapres' },
  { value: 'movimientos_banco', label: 'Movimientos bancarios', desc: 'Cartola del banco' },
  { value: 'pagos_tarjeta', label: 'Pagos tarjeta', desc: 'Detalle de Transbank/WebPay' },
];

export default function CargaPage() {
  const [paso, setPaso] = useState<Paso>('subir');
  const [tipoArchivo, setTipoArchivo] = useState<TipoArchivo>('bonos');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [resultado, setResultado] = useState<ResultadoData | null>(null);
  const [error, setError] = useState('');

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setArchivo(file);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setArchivo(file);
  }

  async function handlePreview() {
    if (!archivo) return;
    setError('');
    setPaso('preview');

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('tipo', tipoArchivo);

    try {
      const res = await fetch('/api/carga/preview', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al previsualizar');
        setPaso('subir');
        return;
      }

      setPreview({
        columnas: data.preview.columnas,
        filas: data.preview.filas,
        totalFilas: data.preview.totalFilas,
        mapeoSugerido: data.mapeoSugerido,
      });
    } catch {
      setError('Error de conexión');
      setPaso('subir');
    }
  }

  async function handleProcesar() {
    if (!archivo || !preview) return;
    setPaso('procesando');

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('tipo', tipoArchivo);
    formData.append('mapeo', JSON.stringify(preview.mapeoSugerido));

    try {
      const res = await fetch('/api/carga/process', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al procesar');
        setPaso('preview');
        return;
      }

      setResultado({
        totalFilas: data.totalFilas,
        filasOk: data.filasOk,
        filasError: data.filasError,
        errores: data.errores,
      });
      setPaso('resultado');
    } catch {
      setError('Error de conexión');
      setPaso('preview');
    }
  }

  function reiniciar() {
    setPaso('subir');
    setArchivo(null);
    setPreview(null);
    setResultado(null);
    setError('');
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Carga de archivos</h1>
        <p className="text-sm text-gray-500">Importe sus archivos para procesar la conciliación</p>
      </div>

      {/* Pasos indicador */}
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
        <StepIndicator label="Subir" active={paso === 'subir'} done={paso !== 'subir'} />
        <span>→</span>
        <StepIndicator label="Previsualizar" active={paso === 'preview'} done={paso === 'procesando' || paso === 'resultado'} />
        <span>→</span>
        <StepIndicator label="Procesar" active={paso === 'procesando' || paso === 'resultado'} done={paso === 'resultado'} />
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Paso 1: Subir */}
      {paso === 'subir' && (
        <Card>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-gray-700">Tipo de archivo</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TIPOS_ARCHIVO.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTipoArchivo(t.value as TipoArchivo)}
                    className={`rounded-lg border px-4 py-3 text-left transition-all ${
                      tipoArchivo === t.value
                        ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">{t.label}</p>
                    <p className="text-xs text-gray-500">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 transition-colors ${
                dragging ? 'border-gray-400 bg-gray-50' : 'border-gray-200'
              }`}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-3 text-gray-300">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-gray-500">
                Arrastra un archivo o{' '}
                <label className="cursor-pointer font-medium text-gray-900 hover:underline">
                  selecciona
                  <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileSelect} />
                </label>
              </p>
              <p className="mt-1 text-[11px] text-gray-400">CSV, Excel (.xlsx) — Máx. 10 MB</p>
            </div>

            {archivo && (
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{archivo.name}</p>
                  <p className="text-[11px] text-gray-400">{(archivo.size / 1024).toFixed(1)} KB</p>
                </div>
                <Button onClick={handlePreview}>Previsualizar</Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Paso 2: Preview */}
      {paso === 'preview' && preview && (
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-900">Vista previa</h2>
                <p className="text-xs text-gray-500">{preview.totalFilas} filas detectadas · {preview.columnas.length} columnas</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={reiniciar}>Cancelar</Button>
                <Button onClick={handleProcesar}>Procesar {preview.totalFilas} filas</Button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b bg-gray-50">
                    {preview.columnas.map((col, i) => (
                      <th key={i} className="whitespace-nowrap px-3 py-2 text-left font-medium text-gray-500">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.filas.slice(0, 5).map((fila, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      {fila.map((cell, j) => (
                        <td key={j} className="whitespace-nowrap px-3 py-2 text-gray-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {Object.keys(preview.mapeoSugerido).length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-gray-700">Mapeo automático detectado</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(preview.mapeoSugerido).map(([destino, origen]) => (
                    <span key={destino} className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
                      {origen} → {destino}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Paso 3: Procesando */}
      {paso === 'procesando' && (
        <Card>
          <div className="flex flex-col items-center py-16">
            <div className="mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900"></div>
            <p className="text-sm text-gray-600">Procesando archivo...</p>
            <p className="mt-1 text-xs text-gray-400">Esto puede tomar unos segundos</p>
          </div>
        </Card>
      )}

      {/* Paso 4: Resultado */}
      {paso === 'resultado' && resultado && (
        <Card>
          <div className="space-y-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4">
              <p className="text-sm font-medium text-emerald-800">Archivo procesado correctamente</p>
              <p className="mt-1 text-xs text-emerald-600">
                {resultado.filasOk} filas importadas
                {resultado.filasError > 0 && ` · ${resultado.filasError} errores`}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-gray-200 p-3 text-center">
                <p className="text-lg font-semibold text-gray-900">{resultado.totalFilas}</p>
                <p className="text-[11px] text-gray-500">Total filas</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3 text-center">
                <p className="text-lg font-semibold text-emerald-600">{resultado.filasOk}</p>
                <p className="text-[11px] text-gray-500">Importadas</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3 text-center">
                <p className="text-lg font-semibold text-red-600">{resultado.filasError}</p>
                <p className="text-[11px] text-gray-500">Errores</p>
              </div>
            </div>

            {resultado.errores.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-gray-700">Errores encontrados</h3>
                <div className="mt-2 space-y-1">
                  {resultado.errores.map((e, i) => (
                    <p key={i} className="text-[11px] text-red-600">Fila {e.fila}: {e.mensaje}</p>
                  ))}
                </div>
              </div>
            )}

            <Button variant="secondary" onClick={reiniciar}>
              Cargar otro archivo
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function StepIndicator({ label, active, done }: { label: string; active: boolean; done: boolean }) {
  return (
    <span className={`rounded-md px-2 py-1 text-xs font-medium ${
      active ? 'bg-gray-900 text-white' : done ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
    }`}>
      {done && !active ? '✓ ' : ''}{label}
    </span>
  );
}
