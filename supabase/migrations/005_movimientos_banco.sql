CREATE TABLE movimientos_banco (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id            UUID NOT NULL REFERENCES clinicas(id),
  archivo_id            UUID REFERENCES archivos_carga(id),
  fecha                 DATE NOT NULL,
  monto                 INTEGER NOT NULL,
  glosa                 TEXT,
  referencia            TEXT,
  aseguradora_inferida  TEXT,
  conciliacion_id       UUID,
  created_at            TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_movimientos_clinica_fecha ON movimientos_banco(clinica_id, fecha);
