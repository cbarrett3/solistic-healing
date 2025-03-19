'use client';

import { useRouter } from 'next/navigation';
import AdminLayout from '../../components/admin-layout';
import PostForm from '../components/post-form';

export default function NewBlogPostPage() {
  const router = useRouter();
  
  return (
    <AdminLayout 
      title="New Post" 
      description="Create a new blog post"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push('/admin/blog')}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </button>
        </div>
        
        <PostForm />
      </div>
    </AdminLayout>
  );
}
