This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Blog Content Management

This project uses a Git-based CMS approach for managing blog content. Blog posts are stored as MDX files in the `app/content/blog` directory and are committed to the repository when created or updated through the admin interface.

### Setting Up GitHub Integration

To enable the GitHub integration for the blog CMS, you need to:

1. Create a GitHub Personal Access Token with `repo` permissions
   - Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a descriptive name like "Solistic Healing Blog CMS"
   - Select the `repo` scope
   - Click "Generate token" and copy the token

2. Add the token to your environment variables:
   - For local development, create a `.env.local` file in the project root with:
     ```
     GITHUB_TOKEN=your_token_here
     ADMIN_AUTH_SECRET=your_admin_secret_here
     ```
   - For production (Vercel), add the `GITHUB_TOKEN` and `ADMIN_AUTH_SECRET` environment variables in the Vercel dashboard

### How It Works

- In development mode, blog posts are saved to the local file system
- In production mode, blog posts are committed directly to the GitHub repository
- When a post is created or updated in production, it triggers a new deployment on Vercel
- This approach ensures that content changes are versioned and can be rolled back if needed

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
