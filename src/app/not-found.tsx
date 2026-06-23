import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-400">404</p>
        <h1 className="mt-2 text-lg font-semibold text-gray-900">Página no encontrada</h1>
        <p className="mt-1 text-sm text-gray-500">La página que buscas no existe o fue movida.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
