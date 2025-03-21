'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LogoutPage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    async function handleLogout() {
      try {
        const response = await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Start countdown for redirect
          timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                // Force navigation to login page
                window.location.href = '/admin/login';
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setError(true);
          console.error('Logout failed');
        }
      } catch (error) {
        setError(true);
        console.error('Error during logout:', error);
      }
    }

    // Perform logout when component mounts
    handleLogout();

    // Cleanup timer on unmount
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  // Force redirect after 5 seconds even if the API call fails
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      window.location.href = '/admin/login';
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-sm"
      >
        <h1 className="text-xl font-medium mb-2">Logging out...</h1>
        <p className="text-foreground/60 text-sm">
          {error 
            ? "There was an issue logging you out. Redirecting anyway..."
            : `Redirecting to login page in ${countdown} seconds`
          }
        </p>
        
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
        
        <div className="mt-8">
          <Link 
            href="/admin/login" 
            className="text-sm text-primary hover:text-primary/80 underline underline-offset-2"
          >
            Click here if you're not redirected automatically
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
