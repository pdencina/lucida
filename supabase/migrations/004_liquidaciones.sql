CREATE TABLE liquidaciones (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id        UUID NOT NULL REFERENCES clinicas(id),
  archivo_id        UUID REFERENCES archivos_carga(id),
  aseguradora       TEXT NOT NULL,
  periodo           TEXT NOT NULL,
  folio_bono        TEXT,
  paciente_rut      TEXT,
  prestacion_cod    TEXT,
  fecha_prestacion  DATE,
  monto_presentado  INTEGER NOT NULL,
  monto_reconocido  INTEGER NOT NULL,
  estado            TEXT NOT NULL DEFAULT 'aprobado'
                    CHECK (estado IN ('aprobado', 'rechazado', 'parcial')),
  razon_rechazo     TEXT,
  created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_liquidaciones_clinica_periodo ON liquidaciones(clinica_id, periodo);
CREATE INDEX idx_liquidaciones_folio ON liquidaciones(clinica_id, folio_bono);

-- Agregar FK en bonos ahora que liquidaciones existe
ALTER TABLE bonos
  ADD CONSTRAINT fk_bonos_liquidacion
  FOREIGN KEY (liquidacion_id) REFERENCES liquidaciones(id);
