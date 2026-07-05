'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminProfile {
  email: string;
  full_name: string | null;
}

/**
 * Client-side gate for the admin dashboard.
 *
 * This app is a static export (output: 'export' in next.config.ts,
 * deployed as static files to Cloudflare Pages) — there is no server
 * at request time, so middleware and server-rendered auth checks
 * cannot run here. Session + admin-membership checks happen in the
 * browser instead.
 *
 * This is a UX guard, not the security boundary: the real protection
 * is Postgres Row Level Security on every table (see supabase/schema.sql
 * and add_admin.sql), which rejects reads/writes from anyone not in
 * admin_users regardless of what the client does.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<'checking' | 'authorized'>('checking');
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    async function check() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace(
          `/admin/login?redirectTo=${encodeURIComponent(pathname)}`
        );
        return;
      }

      const { data: admin } = await supabase
        .from('admin_users')
        .select('id, email, full_name')
        .eq('id', user.id)
        .single();

      if (!active) return;

      if (!admin) {
        await supabase.auth.signOut();
        router.replace('/admin/login?error=not_admin');
        return;
      }

      setProfile({ email: admin.email, full_name: admin.full_name });
      setStatus('authorized');
    }

    check();

    // Also react to sign-out happening in another tab.
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/admin/login');
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (status === 'checking' || !profile) {
    return (
      <div className="min-h-screen bg-soul-cream flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
      </div>
    );
  }

  return <AdminSidebar profile={profile}>{children}</AdminSidebar>;
}
