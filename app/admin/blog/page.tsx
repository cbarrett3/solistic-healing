import { adminAuthGuard } from '@/app/lib/admin/auth';

export default function AdminBlogPage() {
  // Server-side auth check
  adminAuthGuard();
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          New Post
        </button>
      </div>
      
      <div className="bg-card rounded-lg shadow p-6">
        <p className="text-center text-muted-foreground py-12">
          No blog posts yet. Create your first post to get started.
        </p>
      </div>
    </div>
  );
}
