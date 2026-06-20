export type TipoAlerta =
  | 'alto_rechazo'
  | 'convenio_por_vencer'
  | 'copago_sobre_arancel'
  | 'sin_liquidar_20d'
  | 'posible_duplicado';

export type Severidad = 'alta' | 'media' | 'baja';

export interface Alerta {
  tipo: TipoAlerta;
  severidad: Severidad;
  mensaje: string;
  metadata: Record<string, unknown>;
}

export interface ConfigAuditor {
  umbralRechazo: number;
  diasSinLiquidar: number;
  umbralCopagoRatio: number;
  diasConvenioAlerta: number;
}

export const CONFIG_AUDITOR_DEFAULT: ConfigAuditor = {
  umbralRechazo: 0.30,
  diasSinLiquidar: 20,
  umbralCopagoRatio: 0.50,
  diasConvenioAlerta: 30,
};
