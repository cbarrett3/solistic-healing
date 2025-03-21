/**
 * Environment configuration helper
 * Centralizes environment variable access and provides type safety
 */

export const envConfig = {
  /**
   * GitHub Personal Access Token for repository access
   * Required for the Git-based CMS functionality in production
   */
  githubToken: process.env.GITHUB_TOKEN,
  
  /**
   * Admin authentication secret
   * Used to secure the admin routes
   */
  adminAuthSecret: process.env.ADMIN_AUTH_SECRET,
  
  /**
   * GitHub repository information
   */
  githubRepoOwner: 'cbarrett3',
  githubRepoName: 'solistic-healing',
  
  /**
   * Content paths
   */
  blogContentPath: 'app/content/blog',
  imagesContentPath: 'app/content/assets/images',
  
  /**
   * Determines if we're in development mode
   */
  isDevelopment: process.env.NODE_ENV === 'development',
  
  /**
   * Validates that all required environment variables are set
   * @returns An object with validation results
   */
  validate: () => {
    const missingVars: string[] = [];
    
    // In production, GitHub token is required
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      if (!process.env.GITHUB_TOKEN) {
        missingVars.push('GITHUB_TOKEN');
      }
    }
    
    // Admin auth secret is always required
    if (!process.env.ADMIN_AUTH_SECRET) {
      missingVars.push('ADMIN_AUTH_SECRET');
    }
    
    return {
      isValid: missingVars.length === 0,
      missingVars,
    };
  }
};
