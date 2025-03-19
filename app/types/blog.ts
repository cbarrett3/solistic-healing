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
  content: string;
}

// External link post
export interface ExternalPost extends BasePost {
  type: 'external';
  externalUrl: string;
  sourceName?: string;
  sourceAuthor?: string;
  commentary: string;
}

// Union type for all post types
export type BlogPost = OriginalPost | ExternalPost;

// Post status for admin UI
export type PostStatus = 'draft' | 'published';
