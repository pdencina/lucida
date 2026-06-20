export interface ResultadoConciliacion {
  periodo: string;
  emitido: number;
  liquidado: number;
  depositado: number;
  atrapado: number;
  pendiente: number;
  brechaLiquidacion: number;
  brechaBanco: number;
  totalBonos: number;
  bonosConciliados: number;
  bonosRechazados: number;
  bonosPendientes: number;
}

export interface MatchBono {
  bonoId: string;
  estado: 'conciliado' | 'rechazado' | 'pendiente';
  liquidacionId?: string;
  razonRechazo?: string;
  diferenciaMonto?: number;
}

export interface RazonRechazoAgrupada {
  razon: string;
  cantidadBonos: number;
  montoTotal: number;
}
