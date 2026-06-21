# Remis — Conciliación de Ingresos Clínicos

SaaS chileno que concilia los ingresos de centros médicos y clínicas: cruza lo facturado (bonos), lo pagado por FONASA/Isapres (liquidaciones), lo procesado por tarjeta (Transbank/WebPay) y lo que llegó al banco — mostrando cuánta plata quedó atrapada y por qué.

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: API Routes (serverless functions)
- **Base de datos**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth
- **Deploy**: Vercel (serverless)

## Estructura

```
src/
├── app/           → Pages (SSR) + API Routes
├── components/    → UI components
├── lib/           → Lógica de negocio (parser, conciliación, auditor)
└── types/         → TypeScript types
supabase/
├── migrations/    → SQL migrations
└── seed.sql       → Datos de ejemplo
```

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# Editar con tus credenciales de Supabase

# 3. Ejecutar migraciones en Supabase
# (desde el dashboard de Supabase o CLI)

# 4. Levantar dev server
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (solo server-side) |

## Deploy en Vercel

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno
3. Deploy automático en cada push a `main`

## Licencia

Privado — Todos los derechos reservados.
