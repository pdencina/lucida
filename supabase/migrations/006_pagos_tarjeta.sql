CREATE TABLE pagos_tarjeta (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id          UUID NOT NULL REFERENCES clinicas(id),
  archivo_id          UUID REFERENCES archivos_carga(id),
  fecha               DATE NOT NULL,
  monto               INTEGER NOT NULL,
  medio               TEXT NOT NULL CHECK (medio IN ('debito', 'credito')),
  cod_autorizacion    TEXT,
  num_tarjeta_masked  TEXT,
  created_at          TIMESTAMPTZ DEFAULT now()
);
