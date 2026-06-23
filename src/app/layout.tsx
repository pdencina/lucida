import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Remis — Conciliación de Ingresos Clínicos',
  description: 'Plataforma de conciliación financiera para centros médicos y clínicas en Chile',
  metadataBase: new URL('https://remis.cl'),
  openGraph: {
    title: 'Remis — Conciliación de Ingresos Clínicos',
    description: 'Controla cada peso que entra a tu clínica. Cruza bonos, liquidaciones y depósitos bancarios en un solo lugar.',
    siteName: 'Remis',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL" className={inter.variable}>
      <body className={`${inter.className} selection:bg-gray-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
