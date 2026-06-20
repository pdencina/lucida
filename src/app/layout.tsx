import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lúcida — Conciliación de Ingresos Clínicos',
  description: 'Plataforma de conciliación financiera para centros médicos y clínicas en Chile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
