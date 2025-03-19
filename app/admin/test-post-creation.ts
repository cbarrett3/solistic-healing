import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, OriginalPost, ExternalPost } from '../types/blog';

// Constants
const BLOG_DIR = path.join(process.cwd(), 'app', 'content', 'blog');
const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'test-post-creation.log');

// Debug logging function
async function log(message: string, data?: any) {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] ${message}\n`;
    
    if (data) {
      logMessage += `Data: ${JSON.stringify(data, null, 2)}\n`;
    }
    
    await fs.appendFile(LOG_FILE, logMessage + '\n');
    console.log(message, data);
  } catch (err) {
    console.error('Failed to write to log:', err);
  }
}

// Ensure content directories exist
async function ensureContentDirs() {
  try {
    await fs.mkdir(BLOG_DIR, { recursive: true });
    return true;
  } catch (error) {
    await log('Failed to create content directories:', error);
    return false;
  }
}

// Save a test post
async function saveTestPost(post: BlogPost): Promise<boolean> {
  try {
    await ensureContentDirs();
    
    const { slug, type } = post;
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    
    await log('Saving post to path:', filePath);
    
    // Extract content/commentary from the post object
    let content: string;
    const frontmatter: Record<string, any> = { ...post };
    
    if (type === 'original') {
      content = (post as OriginalPost).content;
      delete frontmatter.content;
    } else {
      content = (post as ExternalPost).commentary;
      delete frontmatter.commentary;
    }
    
    // Create MDX content with frontmatter
    const mdxContent = matter.stringify(content, frontmatter);
    
    await log('MDX content created:', { contentLength: mdxContent.length });
    
    // Write to file
    await fs.writeFile(filePath, mdxContent);
    await log('File written successfully');
    return true;
  } catch (error) {
    await log('Failed to save post:', error);
    return false;
  }
}

// Create a test post
export async function createTestPost() {
  await log('Starting test post creation');
  
  const testPost: OriginalPost = {
    type: 'original',
    title: 'Test Blog Post',
    slug: 'test-blog-post',
    date: new Date().toISOString().split('T')[0],
    content: '# Test Blog Post\n\nThis is a test blog post created to verify the post creation system works correctly.'
  };
  
  await log('Test post object created', testPost);
  
  const success = await saveTestPost(testPost);
  
  if (success) {
    await log('Test post created successfully');
  } else {
    await log('Failed to create test post');
  }
  
  return success;
}

// Create a test external post
export async function createTestExternalPost() {
  await log('Starting test external post creation');
  
  const testPost: ExternalPost = {
    type: 'external',
    title: 'Test External Link',
    slug: 'test-external-link',
    date: new Date().toISOString().split('T')[0],
    externalUrl: 'https://example.com/article',
    sourceName: 'Example Website',
    commentary: 'This is a test external post with commentary to verify the external post creation system works correctly.'
  };
  
  await log('Test external post object created', testPost);
  
  const success = await saveTestPost(testPost);
  
  if (success) {
    await log('Test external post created successfully');
  } else {
    await log('Failed to create test external post');
  }
  
  return success;
}
