// TODO: T-1.6 — Layout protegido con sidebar y auth guard SSR
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <nav className="p-4">
          <h2 className="mb-4 text-lg font-bold text-primary-900">Lúcida</h2>
          {/* Navigation links */}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
