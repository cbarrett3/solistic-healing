import { adminAuthGuard } from '@/app/lib/admin/auth';
import { getAllPosts } from '@/app/lib/admin/file-system';
import { BlogPost } from '@/app/types/blog';
import Link from 'next/link';
import PostItem from '@/app/admin/blog/post-item';
import AdminLayout from '../components/admin-layout';
import { Card, CardHeader, CardContent, LinkButton } from '../components/ui';

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  // Server-side auth check
  adminAuthGuard();
  
  // Get all posts
  const allPosts = await getAllPosts();
  
  // Filter posts by type if specified
  const { type } = searchParams;
  const filteredPosts = type 
    ? allPosts.filter(post => post.type === type)
    : allPosts;
  
  return (
    <AdminLayout 
      title="Blog Posts" 
      description="Manage your blog content"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <LinkButton 
            href="/admin/blog/new" 
            variant="primary"
            size="sm"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            }
            className="text-sm py-1.5 px-3"
          >
            New Post
          </LinkButton>
          
          <span className="text-sm text-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} {type ? `(${type})` : 'total'}
          </span>
        </div>
      </div>
      
      <Card className="shadow-sm border border-border/30">
        <CardHeader className="border-b border-border/30 px-4 py-2.5">
          <div className="flex gap-2">
            <Link 
              href="/admin/blog" 
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:bg-muted/80 hover:scale-105 hover:shadow-sm cursor-pointer ${!type ? 'bg-primary text-primary-foreground' : 'bg-muted hover:opacity-90'}`}
            >
              All
            </Link>
            <Link 
              href="/admin/blog?type=original" 
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:bg-muted/80 hover:scale-105 hover:shadow-sm cursor-pointer ${type === 'original' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:opacity-90'}`}
            >
              Original
            </Link>
            <Link 
              href="/admin/blog?type=external" 
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:bg-muted/80 hover:scale-105 hover:shadow-sm cursor-pointer ${type === 'external' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:opacity-90'}`}
            >
              External
            </Link>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {filteredPosts.length > 0 ? (
            <div>
              {filteredPosts.map((post) => (
                <PostItem key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                {type 
                  ? `No ${type} posts found.` 
                  : 'No blog posts yet. Create your first post to get started.'}
              </p>
              {!type && (
                <LinkButton 
                  href="/admin/blog/new" 
                  variant="primary" 
                  size="sm"
                  className="text-xs py-1 px-2.5"
                >
                  Create Your First Post
                </LinkButton>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
