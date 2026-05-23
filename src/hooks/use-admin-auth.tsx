
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

const ADMIN_EMAIL = 'aquasaferoworks@gmail.com';

export function useAdminAuth() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        setIsAdmin(false);
        if (typeof window !== 'undefined') {
          router.push('/login');
        }
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, loading, router]);

  return { isAdmin, loading };
}
