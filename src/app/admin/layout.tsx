
'use client';

import { useAdminAuth } from '@/hooks/use-admin-auth';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAdmin, loading } = useAdminAuth();

  // Allow the login page to be viewed without being redirected by the layout protector
  const isLoginPage = pathname === '/admin/login';

  if (loading && !isLoginPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If we are on the login page, just render children (the login form)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Otherwise, if not admin, return null (the useAdminAuth hook handles the redirect)
  if (!isAdmin) {
    return null; 
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
