export type TipoArchivo = 'bonos' | 'liquidaciones' | 'movimientos_banco' | 'pagos_tarjeta';

export interface MapeoColumnas {
  [campoDestino: string]: string;
}

export interface FilaError {
  fila: number;
  campo: string;
  valor: string;
  mensaje: string;
}

export interface ResultadoParseo {
  filas: Record<string, unknown>[];
  errores: FilaError[];
  totalFilas: number;
  filasOk: number;
  filasError: number;
}

export interface VistaPrevia {
  columnas: string[];
  filas: string[][];
  totalFilas: number;
}
