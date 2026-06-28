-- Schema multi-tenant para Remis
-- Cada clínica tiene sus propios datos aislados

-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla: clínicas
CREATE TABLE IF NOT EXISTS public.clinicas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  rut TEXT NOT NULL,
  direccion TEXT,
  telefono TEXT,
  email TEXT,
  plan TEXT DEFAULT 'basico',
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: perfiles (liga usuarios auth con clínicas)
CREATE TABLE IF NOT EXISTS public.perfiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE CASCADE,
  rol TEXT NOT NULL DEFAULT 'admin' CHECK (rol IN ('superadmin', 'admin', 'staff')),
  nombre TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Tabla: archivos cargados
CREATE TABLE IF NOT EXISTS public.archivos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('bonos', 'liquidaciones', 'movimientos_banco', 'pagos_tarjeta')),
  filas_total INT DEFAULT 0,
  filas_ok INT DEFAULT 0,
  filas_error INT DEFAULT 0,
  estado TEXT DEFAULT 'procesado' CHECK (estado IN ('procesando', 'procesado', 'error')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: bonos
CREATE TABLE IF NOT EXISTS public.bonos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE CASCADE,
  archivo_id UUID REFERENCES public.archivos(id) ON DELETE SET NULL,
  folio TEXT NOT NULL,
  fecha DATE NOT NULL,
  paciente_nombre TEXT,
  paciente_rut TEXT,
  prestacion_cod TEXT NOT NULL,
  prestacion_nombre TEXT,
  aseguradora TEXT NOT NULL,
  monto_total INT NOT NULL DEFAULT 0,
  bonificacion INT NOT NULL DEFAULT 0,
  copago INT NOT NULL DEFAULT 0,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'conciliado', 'rechazado')),
  razon_rechazo TEXT,
  liquidacion_id UUID,
  diferencia_monto INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: liquidaciones
CREATE TABLE IF NOT EXISTS public.liquidaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE CASCADE,
  archivo_id UUID REFERENCES public.archivos(id) ON DELETE SET NULL,
  aseguradora TEXT NOT NULL,
  periodo TEXT NOT NULL,
  folio_bono TEXT,
  paciente_rut TEXT,
  prestacion_cod TEXT,
  fecha_prestacion DATE,
  monto_presentado INT NOT NULL DEFAULT 0,
  monto_reconocido INT NOT NULL DEFAULT 0,
  estado TEXT NOT NULL DEFAULT 'aprobado' CHECK (estado IN ('aprobado', 'rechazado', 'parcial')),
  razon_rechazo TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: alertas
CREATE TABLE IF NOT EXISTS public.alertas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  severidad TEXT NOT NULL CHECK (severidad IN ('alta', 'media', 'baja')),
  titulo TEXT NOT NULL,
  detalle TEXT,
  resuelta BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_bonos_clinica ON public.bonos(clinica_id);
CREATE INDEX IF NOT EXISTS idx_bonos_estado ON public.bonos(clinica_id, estado);
CREATE INDEX IF NOT EXISTS idx_bonos_fecha ON public.bonos(clinica_id, fecha);
CREATE INDEX IF NOT EXISTS idx_liquidaciones_clinica ON public.liquidaciones(clinica_id);
CREATE INDEX IF NOT EXISTS idx_alertas_clinica ON public.alertas(clinica_id, resuelta);
CREATE INDEX IF NOT EXISTS idx_perfiles_user ON public.perfiles(user_id);
CREATE INDEX IF NOT EXISTS idx_archivos_clinica ON public.archivos(clinica_id);

-- RLS (Row Level Security) — cada usuario solo ve datos de su clínica
ALTER TABLE public.clinicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bonos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.liquidaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archivos ENABLE ROW LEVEL SECURITY;

-- Política: usuarios ven solo datos de su clínica
CREATE POLICY "Users see own clinica" ON public.clinicas
  FOR ALL USING (
    id IN (SELECT clinica_id FROM public.perfiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users see own perfil" ON public.perfiles
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users see own bonos" ON public.bonos
  FOR ALL USING (
    clinica_id IN (SELECT clinica_id FROM public.perfiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users see own liquidaciones" ON public.liquidaciones
  FOR ALL USING (
    clinica_id IN (SELECT clinica_id FROM public.perfiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users see own alertas" ON public.alertas
  FOR ALL USING (
    clinica_id IN (SELECT clinica_id FROM public.perfiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users see own archivos" ON public.archivos
  FOR ALL USING (
    clinica_id IN (SELECT clinica_id FROM public.perfiles WHERE user_id = auth.uid())
  );

-- Trigger: actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bonos_updated_at BEFORE UPDATE ON public.bonos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER clinicas_updated_at BEFORE UPDATE ON public.clinicas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
