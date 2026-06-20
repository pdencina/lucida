-- Tabla de clínicas
CREATE TABLE clinicas (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT NOT NULL,
  rut           TEXT NOT NULL UNIQUE,
  direccion     TEXT,
  telefono      TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Tabla de perfiles (usuarios vinculados a clínicas)
CREATE TABLE perfiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clinica_id    UUID NOT NULL REFERENCES clinicas(id) ON DELETE CASCADE,
  rol           TEXT NOT NULL CHECK (rol IN ('admin', 'staff')),
  nombre        TEXT,
  email         TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, clinica_id)
);

-- Función helper para RLS
CREATE OR REPLACE FUNCTION get_user_clinica_id()
RETURNS UUID AS $$
  SELECT clinica_id FROM perfiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;
