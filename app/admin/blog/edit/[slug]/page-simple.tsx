import { notFound } from 'next/navigation';
import Link from 'next/link';
import { adminAuthGuard } from '@/app/lib/admin/auth';
import { getPostBySlug } from '@/app/lib/admin/file-system';

export default async function EditBlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Server-side auth check
  await adminAuthGuard();
  
  // Get the post data
  const post = await getPostBySlug(params.slug);
  
  // If post not found, show 404
  if (!post) {
    notFound();
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground mt-2">
          Editing: {post.title}
        </p>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm p-6">
        <p className="text-center text-muted-foreground py-12">
          Edit functionality will be implemented in the next phase.
        </p>
        
        <div className="flex justify-center mt-4">
          <Link
            href="/admin/blog"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
