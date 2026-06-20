// Tipos compartidos de la aplicación

export interface Clinica {
  id: string;
  nombre: string;
  rut: string;
  direccion?: string;
  telefono?: string;
  created_at: string;
}

export interface Perfil {
  id: string;
  user_id: string;
  clinica_id: string;
  rol: 'admin' | 'staff';
  nombre?: string;
  email: string;
}

export interface Bono {
  id: string;
  clinica_id: string;
  archivo_id?: string;
  folio: string;
  fecha: string;
  paciente_nombre?: string;
  paciente_rut?: string;
  prestacion_cod: string;
  prestacion_nombre?: string;
  aseguradora: string;
  monto_total: number;
  bonificacion: number;
  copago: number;
  estado: 'pendiente' | 'conciliado' | 'rechazado';
  razon_rechazo?: string;
  liquidacion_id?: string;
  diferencia_monto: number;
}

export interface Liquidacion {
  id: string;
  clinica_id: string;
  archivo_id?: string;
  aseguradora: string;
  periodo: string;
  folio_bono?: string;
  paciente_rut?: string;
  prestacion_cod?: string;
  fecha_prestacion?: string;
  monto_presentado: number;
  monto_reconocido: number;
  estado: 'aprobado' | 'rechazado' | 'parcial';
  razon_rechazo?: string;
}
