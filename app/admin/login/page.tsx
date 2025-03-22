'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (loading || !answer.trim()) return; // Prevent double submission or empty submission
    
    setLoading(true);
    setError('');

    try {
      // Normalize the answer to match the expected format (lowercase "cloquet")
      const normalizedAnswer = answer.trim().toLowerCase();

      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: normalizedAnswer }),
      });

      if (response.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.message || 'Incorrect answer');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center bg-background overflow-hidden pt-[5vh]">
      <div className="w-full max-w-sm px-4">
        <Link href="/" className="inline-flex items-center text-xs text-foreground/60 hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-3 h-3 mr-1" />
          Return to site
        </Link>
        
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4">
            <h1 className="text-lg font-medium">Admin Access</h1>
            <p className="text-foreground/60 text-xs mt-1">Security verification required</p>
          </div>

          {error && (
            <motion.div 
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="answer" className="block text-sm font-medium mb-1.5">
                What is the secret?
              </label>
              <input
                id="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
                autoFocus
                autoComplete="off"
                placeholder="Enter your answer"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
                loading 
                  ? 'bg-foreground/20 text-foreground/50 cursor-not-allowed' 
                  : 'bg-foreground text-background hover:bg-foreground/90'
              }`}
            >
              {loading ? 'Verifying...' : 'Continue'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-foreground/40">Protected area • Administrators only</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
