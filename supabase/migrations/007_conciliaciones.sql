CREATE TABLE conciliaciones (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id          UUID NOT NULL REFERENCES clinicas(id),
  periodo             TEXT NOT NULL,
  emitido             INTEGER NOT NULL DEFAULT 0,
  liquidado           INTEGER NOT NULL DEFAULT 0,
  depositado          INTEGER NOT NULL DEFAULT 0,
  atrapado            INTEGER NOT NULL DEFAULT 0,
  pendiente           INTEGER NOT NULL DEFAULT 0,
  brecha_liquidacion  INTEGER NOT NULL DEFAULT 0,
  brecha_banco        INTEGER NOT NULL DEFAULT 0,
  total_bonos         INTEGER NOT NULL DEFAULT 0,
  bonos_conciliados   INTEGER NOT NULL DEFAULT 0,
  bonos_rechazados    INTEGER NOT NULL DEFAULT 0,
  bonos_pendientes    INTEGER NOT NULL DEFAULT 0,
  ejecutado_at        TIMESTAMPTZ DEFAULT now(),
  created_at          TIMESTAMPTZ DEFAULT now(),
  UNIQUE(clinica_id, periodo)
);

-- Agregar FK en movimientos_banco
ALTER TABLE movimientos_banco
  ADD CONSTRAINT fk_movimientos_conciliacion
  FOREIGN KEY (conciliacion_id) REFERENCES conciliaciones(id);
