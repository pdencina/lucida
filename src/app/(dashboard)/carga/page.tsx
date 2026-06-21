'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Paso = 'subir' | 'procesando' | 'resultado';

const TIPOS_ARCHIVO = [
  { value: 'bonos', label: 'Bonos emitidos' },
  { value: 'liquidaciones', label: 'Liquidaciones (Isapre/FONASA)' },
  { value: 'movimientos_banco', label: 'Movimientos bancarios' },
  { value: 'pagos_tarjeta', label: 'Pagos tarjeta (Transbank)' },
];

const HISTORIAL = [
  { id: '1', nombre: 'bonos_junio_2026.xlsx', tipo: 'Bonos', filas: 234, fecha: '18/06/2026', ok: true },
  { id: '2', nombre: 'liquidacion_fonasa_may.csv', tipo: 'Liquidaciones', filas: 189, fecha: '15/06/2026', ok: true },
  { id: '3', nombre: 'movimientos_bci_jun.xlsx', tipo: 'Mov. Banco', filas: 56, fecha: '14/06/2026', ok: true },
  { id: '4', nombre: 'transbank_mayo.csv', tipo: 'Pagos Tarjeta', filas: 92, fecha: '10/06/2026', ok: false },
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

  function procesar() {
    setPaso('procesando');
    setTimeout(() => setPaso('resultado'), 1500);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Carga de archivos</h1>
        <p className="text-sm text-gray-500">Importa archivos Excel o CSV</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            {paso === 'subir' && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Tipo de archivo</label>
                  <select
                    value={tipoArchivo}
                    onChange={(e) => setTipoArchivo(e.target.value)}
                    className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-gray-400 focus:outline-none"
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
                  className={`flex flex-col items-center justify-center rounded-md border border-dashed px-6 py-12 transition-colors ${
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
                  <p className="mt-1 text-[11px] text-gray-400">CSV, XLSX — Máx. 10 MB</p>
                </div>

                {archivo && (
                  <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{archivo.name}</p>
                      <p className="text-[11px] text-gray-400">{(archivo.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button size="sm" onClick={procesar}>Procesar</Button>
                  </div>
                )}
              </div>
            )}

            {paso === 'procesando' && (
              <div className="flex flex-col items-center py-16">
                <div className="mb-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600"></div>
                <p className="text-sm text-gray-500">Procesando archivo...</p>
              </div>
            )}

            {paso === 'resultado' && (
              <div className="space-y-4">
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-medium text-emerald-800">Archivo procesado</p>
                  <p className="text-xs text-emerald-600">234 filas importadas · 2 errores descartados</p>
                </div>
                <Button variant="secondary" onClick={() => { setPaso('subir'); setArchivo(null); }}>
                  Cargar otro archivo
                </Button>
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card className="p-0">
            <div className="border-b border-gray-100 px-4 py-3">
              <h2 className="text-xs font-medium uppercase tracking-wide text-gray-400">Historial</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {HISTORIAL.map((h) => (
                <div key={h.id} className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${h.ok ? 'bg-emerald-500' : 'bg-red-400'}`} />
                    <p className="truncate text-xs font-medium text-gray-700">{h.nombre}</p>
                  </div>
                  <p className="ml-3.5 text-[11px] text-gray-400">{h.tipo} · {h.filas} filas · {h.fecha}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
