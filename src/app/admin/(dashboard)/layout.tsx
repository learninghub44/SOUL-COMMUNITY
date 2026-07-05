'use client';

import AuthGuard from '@/components/admin/AuthGuard';

// Every route in this group renders inside AuthGuard, which verifies
// (client-side - see AuthGuard.tsx for why) that the visitor is signed
// in AND present in admin_users before rendering the sidebar/children.
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
