'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Paso = 'subir' | 'preview' | 'mapeo' | 'resultado';

const TIPOS_ARCHIVO = [
  { value: 'bonos', label: 'Bonos emitidos' },
  { value: 'liquidaciones', label: 'Liquidaciones (Isapre/FONASA)' },
  { value: 'movimientos_banco', label: 'Movimientos bancarios' },
  { value: 'pagos_tarjeta', label: 'Pagos tarjeta (Transbank)' },
];

const MOCK_HISTORIAL = [
  { id: '1', nombre: 'bonos_junio_2026.xlsx', tipo: 'Bonos', filas: 234, fecha: '18/06/2026', estado: 'ok' },
  { id: '2', nombre: 'liquidacion_fonasa_may.csv', tipo: 'Liquidaciones', filas: 189, fecha: '15/06/2026', estado: 'ok' },
  { id: '3', nombre: 'movimientos_bci_jun.xlsx', tipo: 'Mov. Banco', filas: 56, fecha: '14/06/2026', estado: 'ok' },
  { id: '4', nombre: 'transbank_mayo.csv', tipo: 'Pagos Tarjeta', filas: 92, fecha: '10/06/2026', estado: 'error' },
];

export default function CargaPage() {
  const [paso, setPaso] = useState<Paso>('subir');
  const [tipoArchivo, setTipoArchivo] = useState('bonos');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

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

  function simularCarga() {
    setPaso('preview');
    setTimeout(() => setPaso('resultado'), 1500);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Carga de Archivos</h1>
        <p className="text-sm text-gray-500">Sube archivos Excel o CSV para procesar</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Panel de carga */}
        <div className="lg:col-span-2">
          <Card>
            {paso === 'subir' && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de archivo</label>
                  <select
                    value={tipoArchivo}
                    onChange={(e) => setTipoArchivo(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {TIPOS_ARCHIVO.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors ${
                    dragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <span className="mb-2 text-4xl">📁</span>
                  <p className="text-sm text-gray-600">
                    Arrastra un archivo aquí o{' '}
                    <label className="cursor-pointer font-medium text-primary-600 hover:text-primary-500">
                      selecciona uno
                      <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileSelect} />
                    </label>
                  </p>
                  <p className="mt-1 text-xs text-gray-400">CSV, Excel (.xlsx, .xls) — Máx. 10MB</p>
                </div>

                {archivo && (
                  <div className="flex items-center justify-between rounded-lg border bg-green-50 p-3">
                    <div className="flex items-center gap-2">
                      <span>📄</span>
                      <span className="text-sm font-medium text-gray-700">{archivo.name}</span>
                      <span className="text-xs text-gray-400">({(archivo.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <Button size="sm" onClick={simularCarga}>Procesar</Button>
                  </div>
                )}
              </div>
            )}

            {paso === 'preview' && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600"></div>
                <p className="text-sm text-gray-600">Procesando archivo...</p>
              </div>
            )}

            {paso === 'resultado' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-medium text-green-800">Archivo procesado correctamente</p>
                    <p className="text-sm text-green-600">234 filas importadas, 2 errores descartados</p>
                  </div>
                </div>
                <Button variant="secondary" onClick={() => { setPaso('subir'); setArchivo(null); }}>
                  Cargar otro archivo
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Historial */}
        <div>
          <Card>
            <h2 className="mb-4 text-sm font-semibold text-gray-700">Últimas cargas</h2>
            <div className="space-y-3">
              {MOCK_HISTORIAL.map((h) => (
                <div key={h.id} className="flex items-start gap-2 rounded-md border p-2.5">
                  <span className="mt-0.5">{h.estado === 'ok' ? '✅' : '❌'}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-gray-700">{h.nombre}</p>
                    <p className="text-xs text-gray-400">{h.tipo} · {h.filas} filas · {h.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
