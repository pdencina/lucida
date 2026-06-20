CREATE TABLE convenios (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id            UUID NOT NULL REFERENCES clinicas(id),
  aseguradora           TEXT NOT NULL,
  fecha_inicio          DATE NOT NULL,
  fecha_vencimiento     DATE NOT NULL,
  estado                TEXT NOT NULL DEFAULT 'vigente'
                        CHECK (estado IN ('vigente', 'por_vencer', 'vencido')),
  notas                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE mapeos_columnas (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id    UUID NOT NULL REFERENCES clinicas(id),
  nombre        TEXT NOT NULL,
  tipo          TEXT NOT NULL CHECK (tipo IN ('bonos', 'liquidaciones', 'movimientos_banco', 'pagos_tarjeta')),
  mapeo         JSONB NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);
