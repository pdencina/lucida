CREATE TABLE alertas_auditor (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id      UUID NOT NULL REFERENCES clinicas(id),
  tipo            TEXT NOT NULL CHECK (tipo IN (
                    'alto_rechazo', 'convenio_por_vencer', 'copago_sobre_arancel',
                    'sin_liquidar_20d', 'posible_duplicado'
                  )),
  severidad       TEXT NOT NULL CHECK (severidad IN ('alta', 'media', 'baja')),
  mensaje         TEXT NOT NULL,
  metadata        JSONB DEFAULT '{}',
  estado_alerta   TEXT NOT NULL DEFAULT 'activa'
                  CHECK (estado_alerta IN ('activa', 'resuelta', 'ignorada')),
  created_at      TIMESTAMPTZ DEFAULT now(),
  resuelto_at     TIMESTAMPTZ
);

CREATE INDEX idx_alertas_clinica_estado ON alertas_auditor(clinica_id, estado_alerta);
CREATE INDEX idx_alertas_severidad ON alertas_auditor(clinica_id, severidad);
