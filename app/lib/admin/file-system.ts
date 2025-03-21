import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';

// Constants
const BLOG_DIR = path.join(process.cwd(), 'app', 'content', 'blog');
const IMAGES_DIR = path.join(process.cwd(), 'app', 'content', 'assets', 'images');

/**
 * Ensure content directories exist
 */
export async function ensureContentDirs() {
  try {
    await fs.mkdir(BLOG_DIR, { recursive: true });
    await fs.mkdir(IMAGES_DIR, { recursive: true });
    return true;
  } catch (error) {
    console.error('Failed to create content directories:', error);
    return false;
  }
}

/**
 * Get all blog posts
 */
export async function getAllPosts(options?: { raw?: boolean }): Promise<BlogPost[]> {
  try {
    await ensureContentDirs();
    
    const files = await fs.readdir(BLOG_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    const postsWithNulls = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const content = await fs.readFile(filePath, 'utf8');
        const { data, content: markdownContent } = matter(content);
        
        // Process markdown to HTML (only if not requesting raw content)
        let contentHtml = '';
        if (!options?.raw) {
          const processedContent = await remark()
            .use(html)
            .process(markdownContent);
          contentHtml = processedContent.toString();
        }
        
        // Basic validation
        if (!data.title || !data.slug || !data.date || !data.type) {
          console.warn(`Invalid post metadata in ${file}`);
          return null;
        }
        
        if (data.type === 'original') {
          return {
            ...data,
            content: options?.raw ? markdownContent : contentHtml, 
            markdownContent: markdownContent, 
          } as OriginalPost;
        } else if (data.type === 'external') {
          return {
            ...data,
            commentary: options?.raw ? markdownContent : contentHtml, 
            markdownCommentary: markdownContent, 
          } as ExternalPost;
        }
        
        return null;
      })
    );
    
    // Filter out null values and sort by date (newest first)
    const posts = postsWithNulls
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch (error) {
    console.error('Failed to get posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string, options?: { raw?: boolean }): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts(options);
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Failed to get post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Save a blog post
 */
export async function savePost(post: BlogPost): Promise<boolean> {
  try {
    await ensureContentDirs();
    
    const { slug, type } = post;
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    
    // Extract content/commentary from the post object
    let content: string;
    const frontmatter: Record<string, any> = { ...post };
    
    if (type === 'original') {
      const originalPost = post as OriginalPost;
      // Use markdownContent if available, otherwise use content
      content = originalPost.markdownContent || originalPost.content;
      
      // Remove HTML content and processed fields from frontmatter
      delete frontmatter.content;
      delete frontmatter.markdownContent;
    } else {
      const externalPost = post as ExternalPost;
      // Use markdownCommentary if available, otherwise use commentary
      content = externalPost.markdownCommentary || externalPost.commentary;
      
      // Remove HTML content and processed fields from frontmatter
      delete frontmatter.commentary;
      delete frontmatter.markdownCommentary;
    }
    
    console.log('Saving post with slug:', slug, 'and type:', type);
    
    // Create MDX content with frontmatter
    const mdxContent = matter.stringify(content, frontmatter);
    
    // Write to file
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, mdxContent, 'utf8');
    
    return true;
  } catch (error) {
    console.error('Failed to save post:', error);
    return false;
  }
}

/**
 * Delete a blog post
 */
export async function deletePost(slug: string): Promise<boolean> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Failed to delete post with slug ${slug}:`, error);
    return false;
  }
}

/**
 * Save an uploaded image
 */
export async function saveImage(
  file: File,
  filename?: string
): Promise<string | null> {
  try {
    await ensureContentDirs();
    
    // Generate a unique filename if not provided
    const finalFilename = filename || 
      `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${path.extname(file.name)}`;
    
    const filePath = path.join(IMAGES_DIR, finalFilename);
    const buffer = Buffer.from(await file.arrayBuffer());
    
    await fs.writeFile(filePath, buffer);
    
    // Return the path relative to the public directory
    return `/content/assets/images/${finalFilename}`;
  } catch (error) {
    console.error('Failed to save image:', error);
    return null;
  }
}

/**
 * Get all images in the images directory
 */
export async function getAllImages(): Promise<string[]> {
  try {
    await ensureContentDirs();
    
    const files = await fs.readdir(IMAGES_DIR);
    return files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    ).map(file => `/content/assets/images/${file}`);
  } catch (error) {
    console.error('Failed to get images:', error);
    return [];
  }
}
