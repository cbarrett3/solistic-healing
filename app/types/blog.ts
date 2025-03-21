/**
 * Blog post type definitions
 */

// Base post interface with common properties
export interface BasePost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
}

// Original content post
export interface OriginalPost extends BasePost {
  type: 'original';
  content: string; // HTML content for rendering
  markdownContent?: string; // Raw markdown content for editing
}

// External link post
export interface ExternalPost extends BasePost {
  type: 'external';
  externalUrl: string;
  sourceName?: string;
  sourceAuthor?: string;
  commentary: string; // HTML content for rendering
  markdownCommentary?: string; // Raw markdown content for editing
}

// Union type for all post types
export type BlogPost = OriginalPost | ExternalPost;

// Post status for admin UI
export type PostStatus = 'draft' | 'published';
