// TODO: T-0.2 — Helper de autenticación para API routes
import { createServerClient } from '@/lib/utils/supabase/server';

export interface AuthContext {
  userId: string;
  clinicaId: string;
  rol: 'admin' | 'staff';
}

export async function getAuthContext(): Promise<AuthContext> {
  const supabase = createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    throw new Error('No autorizado');
  }

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('clinica_id, rol')
    .eq('user_id', user.id)
    .single();

  if (!perfil) {
    throw new Error('Sin perfil asociado');
  }

  return {
    userId: user.id,
    clinicaId: perfil.clinica_id,
    rol: perfil.rol as 'admin' | 'staff',
  };
}
