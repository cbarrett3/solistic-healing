import { getPostBySlug } from '@/app/lib/admin/file-system';
import { adminAuthGuard } from '@/app/lib/admin/auth';
import { notFound } from 'next/navigation';
import EditPostForm from './edit-post-form';
import AdminLayout from '../../../components/admin-layout';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  // Server-side auth check
  adminAuthGuard();
  
  // Get post data
  const post = await getPostBySlug(params.slug);
  
  // If post not found, show 404
  if (!post) {
    notFound();
  }
  
  return (
    <AdminLayout 
      title="Edit Blog Post" 
      description="Update an existing blog post"
    >
      <EditPostForm post={post} />
    </AdminLayout>
  );
}
