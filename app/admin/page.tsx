'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from './components/admin-layout';
import { Card, CardHeader, CardContent, LinkButton, Badge } from './components/ui';

// Icons
const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </svg>
);

interface DashboardPost {
  slug: string;
  title: string;
  date: string;
  type: 'original' | 'external';
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // For now, simulate data
    setTimeout(() => {
      setPosts([
        {
          slug: 'test-post',
          title: 'Test Blog Post',
          date: '2025-03-19',
          type: 'original'
        }
      ]);
      setIsLoading(false);
    }, 500);
    
    // Uncomment when API is ready
    // fetchPosts();
  }, []);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Welcome to the Solistic Healing admin dashboard"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Blog Posts</p>
                  <h3 className="text-2xl font-bold mt-1">{posts.length}</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <BlogIcon />
                </div>
              </div>
              <div className="mt-4">
                <LinkButton href="/admin/blog" variant="ghost" size="sm" className="px-0 hover:bg-transparent">
                  View all posts
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </LinkButton>
              </div>
            </CardContent>
          </Card>
          
          {/* Add more stat cards here as needed */}
        </motion.div>
        
        {/* Welcome Message */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-2">Welcome to your admin dashboard</h2>
              <p className="text-muted-foreground">
                This is your central hub for managing your Solistic Healing website. 
                Use the navigation menu to access different sections.
              </p>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LinkButton href="/admin/blog/new" variant="outline" className="justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Create New Blog Post
                </LinkButton>
                
                <LinkButton href="/admin/blog" variant="outline" className="justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10M7 12h10M7 17h10"/>
                  </svg>
                  Manage Blog Posts
                </LinkButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
