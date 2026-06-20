// TODO: Generar tipos con `supabase gen types typescript`
// Por ahora, tipos manuales basados en el schema

export interface Database {
  public: {
    Tables: {
      clinicas: {
        Row: {
          id: string;
          nombre: string;
          rut: string;
          direccion: string | null;
          telefono: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['clinicas']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['clinicas']['Insert']>;
      };
      perfiles: {
        Row: {
          id: string;
          user_id: string;
          clinica_id: string;
          rol: 'admin' | 'staff';
          nombre: string | null;
          email: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['perfiles']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['perfiles']['Insert']>;
      };
      bonos: {
        Row: {
          id: string;
          clinica_id: string;
          archivo_id: string | null;
          folio: string;
          fecha: string;
          paciente_nombre: string | null;
          paciente_rut: string | null;
          prestacion_cod: string;
          prestacion_nombre: string | null;
          aseguradora: string;
          monto_total: number;
          bonificacion: number;
          copago: number;
          estado: 'pendiente' | 'conciliado' | 'rechazado';
          razon_rechazo: string | null;
          liquidacion_id: string | null;
          diferencia_monto: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bonos']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bonos']['Insert']>;
      };
    };
  };
}
