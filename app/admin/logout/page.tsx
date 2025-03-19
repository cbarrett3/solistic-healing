'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      try {
        const response = await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Redirect to login page after successful logout
          router.push('/admin/login');
          router.refresh();
        } else {
          console.error('Logout failed');
          // Redirect to login page anyway
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Error during logout:', error);
        // Redirect to login page on error
        router.push('/admin/login');
      }
    }

    // Perform logout when component mounts
    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p className="text-muted-foreground">Please wait while we log you out.</p>
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </motion.div>
    </div>
  );
}
