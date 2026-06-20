import { NextResponse } from 'next/server';

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonUnauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
}

export function jsonForbidden() {
  return NextResponse.json({ error: 'Sin permisos' }, { status: 403 });
}
