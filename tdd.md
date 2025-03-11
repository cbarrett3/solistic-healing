# Solistic Healing - Technical Design Document (TDD)

## Technology Stack

### Frontend

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Rich Text Editor:** TipTap
- **Form Validation:** Zod
- **Maps:** Mapbox
- **Analytics:** Vercel Analytics (free tier)

### Backend

- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Email:** Resend
- **File Storage:** Supabase Storage
- **Deployment:** Vercel

## Architecture

### Database Schema

```sql
-- Blog Posts
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image VARCHAR,
  meta_description VARCHAR(160),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email_sent_at TIMESTAMPTZ,
  email_status VARCHAR
);

-- SEO Metadata
CREATE TABLE seo_metadata (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  path VARCHAR NOT NULL UNIQUE,
  title VARCHAR NOT NULL,
  description VARCHAR(160),
  og_image VARCHAR,
  schema_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Component Architecture

### Core Components

1. Layout Components

   - RootLayout
   - Header
   - Footer
   - Navigation

2. Page Components

   - HomePage
   - AboutPage
   - ServicesPage
   - BlogPage
   - BlogPostPage
   - ContactPage
   - AdminDashboard

3. Feature Components
   - ContactForm
   - MapComponent
   - BlogEditor
   - SEOMetadata
   - AdminNavigation

### Admin Interface

- Protected routes using middleware
- Dashboard layout
- Blog post management
- Contact submission viewing
- Simple analytics

## SEO Implementation

### 1. Metadata Configuration

```typescript
// app/layout.tsx
export const metadata: Metadata = {
	metadataBase: new URL('https://solistichealing.com'),
	title: {
		default: 'Solistic Healing | Minneapolis Therapy Services',
		template: '%s | Solistic Healing',
	},
	description: 'Professional therapy services in Minneapolis...',
	openGraph: {
		// OpenGraph configuration
	},
	robots: {
		index: true,
		follow: true,
	},
};
```

### 2. Structured Data

- Local Business Schema
- Article Schema for blog posts
- BreadcrumbList Schema
- FAQPage Schema

### 3. Technical SEO

- Automated sitemap generation
- robots.txt configuration
- Meta robots tags
- Canonical URLs
- Structured URL patterns

## API Routes

### Public Routes

```typescript
/api/contact - POST (contact form submission)
/api/blog - GET (blog posts listing)
/api/blog/[slug] - GET (single blog post)
```

### Admin Routes

```typescript
/api/adimn / posts - GET,
	POST / api / admin / posts / [id] - PUT,
	DELETE / api / admin / contact - GET(submissions);
```

## Security Measures

1. Authentication

   - Supabase Auth for admin access
   - Secure session management
   - Protected API routes

2. Data Protection

   - Input validation with Zod
   - SQL injection prevention
   - XSS protection
   - CSRF protection

3. Rate Limiting
   - Contact form submissions
   - Admin login attempts

## Performance Optimization

### 1. Image Optimization

- Next.js Image component
- Responsive images
- WebP format
- Lazy loading

### 2. Code Optimization

- Route segments
- Component code splitting
- Dynamic imports
- Bundle size monitoring

### 3. Caching Strategy

- Static page generation
- Incremental Static Regeneration
- API route caching
- Database query caching

## Monitoring and Analytics

1. Performance Monitoring

   - Vercel Analytics
   - Core Web Vitals tracking
   - Error tracking

2. SEO Monitoring
   - Search Console integration
   - Sitemap monitoring
   - Ranking tracking

## Development Workflow

1. Version Control

   - Feature branches
   - Pull request reviews
   - Semantic versioning

2. Testing

   - Component testing
   - API route testing
   - E2E testing (as needed)

3. Deployment
   - Vercel preview deployments
   - Production deployments
   - Rollback capability

## Future Technical Considerations

1. Scalability

   - Database optimization
   - Cache strategies
   - Content delivery optimization

2. Feature Extensions
   - Newsletter integration
   - Advanced analytics
   - Appointment scheduling
   - Multi-language support
