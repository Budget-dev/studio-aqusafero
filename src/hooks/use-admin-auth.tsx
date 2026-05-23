
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

// CRITICAL: Hardcoded Master Admin Account
const ADMIN_EMAIL = 'aquasaferoworks@gmail.com';

export function useAdminAuth() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Strictly enforce that ONLY the hardcoded email can access admin features
      if (!user || user.email !== ADMIN_EMAIL) {
        setIsAdmin(false);
        if (typeof window !== 'undefined') {
          // Redirect unauthorized attempts back to login
          router.push('/login?error=unauthorized');
        }
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, loading, router]);

  return { isAdmin, loading };
}
