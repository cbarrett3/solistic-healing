'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter, Button, Input } from '../components/ui';

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
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">Please answer the security question to continue</p>
            </motion.div>
          </CardHeader>

          <CardContent>
            {error && (
              <motion.div 
                className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <p className="font-medium mb-2">What town did Eric grow up in?</p>
              </div>
              
              <Input
                id="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                fullWidth
                required
                autoFocus
                placeholder="Enter your answer"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Checking...' : 'Continue'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p>Protected area for site administrators only</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
