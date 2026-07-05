// This layout wraps ALL /admin routes, including /admin/login.
// It intentionally does nothing except render children: the real
// auth-gated dashboard chrome lives in (dashboard)/layout.tsx so the
// login page itself is never wrapped in the sidebar or gated by
// requireAdmin() (that would create a redirect loop).
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
