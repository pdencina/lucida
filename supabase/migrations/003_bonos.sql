CREATE TABLE bonos (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id        UUID NOT NULL REFERENCES clinicas(id),
  archivo_id        UUID REFERENCES archivos_carga(id),
  folio             TEXT NOT NULL,
  fecha             DATE NOT NULL,
  paciente_nombre   TEXT,
  paciente_rut      TEXT,
  prestacion_cod    TEXT NOT NULL,
  prestacion_nombre TEXT,
  aseguradora       TEXT NOT NULL,
  monto_total       INTEGER NOT NULL,
  bonificacion      INTEGER DEFAULT 0,
  copago            INTEGER DEFAULT 0,
  estado            TEXT NOT NULL DEFAULT 'pendiente'
                    CHECK (estado IN ('pendiente', 'conciliado', 'rechazado')),
  razon_rechazo     TEXT,
  liquidacion_id    UUID,
  diferencia_monto  INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bonos_clinica_periodo ON bonos(clinica_id, fecha);
CREATE INDEX idx_bonos_estado ON bonos(clinica_id, estado);
CREATE INDEX idx_bonos_folio ON bonos(clinica_id, folio);
CREATE INDEX idx_bonos_paciente_rut ON bonos(clinica_id, paciente_rut);
