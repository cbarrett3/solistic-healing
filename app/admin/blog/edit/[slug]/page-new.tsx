import { notFound } from 'next/navigation';
import { adminAuthGuard } from '@/app/lib/admin/auth';
import { getPostBySlug } from '@/app/lib/admin/file-system';
import EditPostForm from './edit-post-form';

export default async function EditBlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Server-side auth check
  adminAuthGuard();
  
  // Get the post data
  const post = await getPostBySlug(params.slug);
  
  // If post not found, show 404
  if (!post) {
    notFound();
  }
  
  return <EditPostForm post={post} />;
}
