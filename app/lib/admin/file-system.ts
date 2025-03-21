import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';
import { 
  getAllBlogFilesFromGitHub, 
  getFileFromGitHub, 
  createOrUpdateFileInGitHub,
  deleteFileFromGitHub
} from './github-service';
import { envConfig } from './env-config';

// Constants
const BLOG_DIR = path.join(process.cwd(), 'app', 'content', 'blog');
const IMAGES_DIR = path.join(process.cwd(), 'app', 'content', 'assets', 'images');
const BLOG_CONTENT_PATH = envConfig.blogContentPath;
const IMAGES_CONTENT_PATH = envConfig.imagesContentPath;

// Determine if we're in development or production
const isDevelopment = envConfig.isDevelopment;

/**
 * Ensure content directories exist
 */
export async function ensureContentDirs() {
  if (isDevelopment) {
    try {
      await fs.mkdir(BLOG_DIR, { recursive: true });
      await fs.mkdir(IMAGES_DIR, { recursive: true });
      return true;
    } catch (error) {
      console.error('Failed to create content directories:', error);
      return false;
    }
  }
  return true; // In production, we don't need to create directories
}

/**
 * Get all blog posts
 */
export async function getAllPosts(options?: { raw?: boolean }): Promise<BlogPost[]> {
  try {
    await ensureContentDirs();
    
    let mdxFiles: string[] = [];
    
    if (isDevelopment) {
      // In development, read from local file system
      const files = await fs.readdir(BLOG_DIR);
      mdxFiles = files.filter(file => file.endsWith('.mdx'));
    } else {
      // In production, read from GitHub
      mdxFiles = await getAllBlogFilesFromGitHub();
    }
    
    const postsWithNulls = await Promise.all(
      mdxFiles.map(async (file) => {
        let content: string;
        
        if (isDevelopment) {
          // In development, read from local file system
          const filePath = path.join(BLOG_DIR, file);
          content = await fs.readFile(filePath, 'utf8');
        } else {
          // In production, read from GitHub
          const filePath = `${BLOG_CONTENT_PATH}/${file}`;
          const fileData = await getFileFromGitHub(filePath);
          
          if (!fileData) {
            console.warn(`File ${filePath} not found in GitHub`);
            return null;
          }
          
          content = fileData.content;
        }
        
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
    
    // Initialize content variable
    let content = '';
    
    // Create frontmatter object with only the metadata fields
    // Filter out undefined values to prevent YAML serialization errors
    const frontmatter: Record<string, unknown> = {
      type,
      title: post.title,
      slug: post.slug,
      date: post.date,
    };
    
    // Add optional fields only if they exist
    if (post.excerpt) frontmatter.excerpt = post.excerpt;
    if (post.featuredImage) frontmatter.featuredImage = post.featuredImage;
    if (post.category) frontmatter.category = post.category;
    if (post.tags && post.tags.length > 0) frontmatter.tags = post.tags;
    if (post.featured) frontmatter.featured = post.featured;
    
    // Add type-specific fields
    if (type === 'original') {
      const originalPost = post as OriginalPost;
      content = originalPost.markdownContent || originalPost.content || '';
    } else if (type === 'external') {
      const externalPost = post as ExternalPost;
      content = externalPost.markdownCommentary || externalPost.commentary || '';
      
      // Add external-specific fields
      if (externalPost.externalUrl) frontmatter.externalUrl = externalPost.externalUrl;
      if (externalPost.sourceName) frontmatter.sourceName = externalPost.sourceName;
      if (externalPost.sourceAuthor) frontmatter.sourceAuthor = externalPost.sourceAuthor;
    }
    
    console.log('Saving post with slug:', slug, 'and type:', type);
    console.log('Frontmatter:', JSON.stringify(frontmatter, null, 2));
    
    // Create MDX content with frontmatter
    const mdxContent = matter.stringify(content || '', frontmatter);
    
    if (isDevelopment) {
      // In development, write to local file system
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, mdxContent, 'utf8');
    } else {
      // In production, write to GitHub
      const githubPath = `${BLOG_CONTENT_PATH}/${slug}.mdx`;
      
      // Check if file already exists to get its SHA
      const existingFile = await getFileFromGitHub(githubPath);
      const existingSha = existingFile ? existingFile.sha : undefined;
      
      // Create commit message
      const commitMessage = existingSha 
        ? `Update blog post: ${slug}`
        : `Create blog post: ${slug}`;
      
      // Save to GitHub
      await createOrUpdateFileInGitHub(
        githubPath,
        mdxContent,
        commitMessage,
        existingSha
      );
    }
    
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
    if (isDevelopment) {
      // In development, delete from local file system
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
      await fs.unlink(filePath);
    } else {
      // In production, delete from GitHub
      const githubPath = `${BLOG_CONTENT_PATH}/${slug}.mdx`;
      const success = await deleteFileFromGitHub(
        githubPath,
        `Delete blog post: ${slug}`
      );
      
      if (!success) {
        throw new Error(`Failed to delete post from GitHub: ${slug}`);
      }
    }
    
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
    
    if (isDevelopment) {
      // In development, write to local file system
      await fs.writeFile(filePath, buffer);
    } else {
      // In production, write to GitHub
      const githubPath = `${IMAGES_CONTENT_PATH}/${finalFilename}`;
      
      // Create commit message
      const commitMessage = `Upload image: ${finalFilename}`;
      
      // Convert buffer to base64 for GitHub API
      const base64Content = buffer.toString('base64');
      
      // Create or update file in GitHub
      const success = await createOrUpdateFileInGitHub(
        githubPath,
        base64Content,
        commitMessage,
        undefined
      );
      
      if (!success) {
        throw new Error(`Failed to save image to GitHub: ${finalFilename}`);
      }
    }
    
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
    
    let files: string[] = [];
    
    if (isDevelopment) {
      // In development, read from local file system
      const fileNames = await fs.readdir(IMAGES_DIR);
      files = fileNames.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      ).map(file => `/content/assets/images/${file}`);
    } else {
      // In production, read from GitHub
      const githubFiles = await getAllBlogFilesFromGitHub();
      files = githubFiles.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      ).map(file => `/content/assets/images/${file}`);
    }
    
    return files;
  } catch (error) {
    console.error('Failed to get images:', error);
    return [];
  }
}
