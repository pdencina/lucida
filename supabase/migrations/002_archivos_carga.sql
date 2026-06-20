CREATE TABLE archivos_carga (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id      UUID NOT NULL REFERENCES clinicas(id),
  tipo            TEXT NOT NULL CHECK (tipo IN ('bonos', 'liquidaciones', 'movimientos_banco', 'pagos_tarjeta')),
  nombre_archivo  TEXT NOT NULL,
  periodo         TEXT NOT NULL,
  estado_parse    TEXT NOT NULL DEFAULT 'procesando'
                  CHECK (estado_parse IN ('procesando', 'completado', 'error')),
  filas_ok        INTEGER DEFAULT 0,
  filas_error     INTEGER DEFAULT 0,
  errores         JSONB DEFAULT '[]',
  storage_path    TEXT,
  mapeo_columnas  JSONB,
  created_at      TIMESTAMPTZ DEFAULT now()
);
