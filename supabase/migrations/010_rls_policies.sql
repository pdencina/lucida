-- RLS: Row Level Security para aislamiento multi-tenant

-- Perfiles
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuarios_ven_su_perfil" ON perfiles
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "admin_inserta_perfiles" ON perfiles
  FOR INSERT WITH CHECK (
    clinica_id = get_user_clinica_id()
    AND EXISTS (
      SELECT 1 FROM perfiles WHERE user_id = auth.uid() AND rol = 'admin'
    )
  );

-- Macro: política estándar para tablas de negocio
-- Se aplica a: bonos, liquidaciones, movimientos_banco, pagos_tarjeta,
--              conciliaciones, alertas_auditor, archivos_carga, convenios, mapeos_columnas

ALTER TABLE clinicas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clinica_propia" ON clinicas
  FOR ALL USING (id = get_user_clinica_id())
  WITH CHECK (id = get_user_clinica_id());

ALTER TABLE bonos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bonos_clinica" ON bonos
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE liquidaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "liquidaciones_clinica" ON liquidaciones
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE movimientos_banco ENABLE ROW LEVEL SECURITY;
CREATE POLICY "movimientos_clinica" ON movimientos_banco
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE pagos_tarjeta ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pagos_clinica" ON pagos_tarjeta
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE conciliaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conciliaciones_clinica" ON conciliaciones
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE alertas_auditor ENABLE ROW LEVEL SECURITY;
CREATE POLICY "alertas_clinica" ON alertas_auditor
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE archivos_carga ENABLE ROW LEVEL SECURITY;
CREATE POLICY "archivos_clinica" ON archivos_carga
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE convenios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "convenios_clinica" ON convenios
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());

ALTER TABLE mapeos_columnas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mapeos_clinica" ON mapeos_columnas
  FOR ALL USING (clinica_id = get_user_clinica_id())
  WITH CHECK (clinica_id = get_user_clinica_id());
