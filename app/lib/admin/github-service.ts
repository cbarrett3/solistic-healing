import { Octokit } from '@octokit/rest';
import { envConfig } from './env-config';

// GitHub repository information
const REPO_OWNER = envConfig.githubRepoOwner;
const REPO_NAME = envConfig.githubRepoName;
const BLOG_CONTENT_PATH = envConfig.blogContentPath;
const IMAGES_CONTENT_PATH = envConfig.imagesContentPath;

/**
 * Get Octokit instance with GitHub token
 */
function getOctokit() {
  const token = envConfig.githubToken;
  
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }
  
  return new Octokit({ auth: token });
}

/**
 * Get the current commit SHA of the main branch
 */
export async function getMainBranchSha(): Promise<string> {
  try {
    const octokit = getOctokit();
    
    const { data } = await octokit.repos.getBranch({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      branch: 'main',
    });
    
    return data.commit.sha;
  } catch (error) {
    console.error('Failed to get main branch SHA:', error);
    throw error;
  }
}

/**
 * Get file content and metadata from GitHub
 */
export async function getFileFromGitHub(path: string): Promise<{ content: string; sha: string } | null> {
  try {
    const octokit = getOctokit();
    
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
    });
    
    if ('content' in data && 'sha' in data) {
      // Decode base64 content
      const content = Buffer.from(data.content, 'base64').toString('utf8');
      return { content, sha: data.sha };
    }
    
    return null;
  } catch (error: any) {
    // If file doesn't exist, return null
    if (error.status === 404) {
      return null;
    }
    
    console.error(`Failed to get file ${path} from GitHub:`, error);
    throw error;
  }
}

/**
 * Get all blog post files from GitHub
 */
export async function getAllBlogFilesFromGitHub(contentPath: string = BLOG_CONTENT_PATH): Promise<string[]> {
  try {
    const octokit = getOctokit();
    
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: contentPath,
    });
    
    if (Array.isArray(data)) {
      // Filter for files only
      return data
        .filter(item => item.type === 'file')
        .map(item => item.name);
    }
    
    return [];
  } catch (error: any) {
    // If directory doesn't exist yet, return empty array
    if (error.status === 404) {
      return [];
    }
    
    console.error(`Failed to get files from GitHub path ${contentPath}:`, error);
    throw error;
  }
}

/**
 * Get all image files from GitHub
 */
export async function getAllImagesFromGitHub(): Promise<string[]> {
  return getAllBlogFilesFromGitHub(IMAGES_CONTENT_PATH);
}

/**
 * Create or update a file in GitHub
 */
export async function createOrUpdateFileInGitHub(
  path: string, 
  content: string, 
  commitMessage: string,
  existingSha?: string
): Promise<boolean> {
  try {
    const octokit = getOctokit();
    
    // Encode content to base64 if it's not already
    const contentBase64 = content.startsWith('data:') || /^[A-Za-z0-9+/=]+$/.test(content)
      ? content
      : Buffer.from(content).toString('base64');
    
    // Create or update file
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message: commitMessage,
      content: contentBase64,
      sha: existingSha, // Include SHA only if updating an existing file
    });
    
    return true;
  } catch (error) {
    console.error(`Failed to ${existingSha ? 'update' : 'create'} file ${path} in GitHub:`, error);
    return false;
  }
}

/**
 * Delete a file from GitHub
 */
export async function deleteFileFromGitHub(path: string, commitMessage: string): Promise<boolean> {
  try {
    const octokit = getOctokit();
    
    // Get file SHA first
    const file = await getFileFromGitHub(path);
    
    if (!file) {
      console.error(`File ${path} not found in GitHub`);
      return false;
    }
    
    // Delete file
    await octokit.repos.deleteFile({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message: commitMessage,
      sha: file.sha,
    });
    
    return true;
  } catch (error) {
    console.error(`Failed to delete file ${path} from GitHub:`, error);
    return false;
  }
}
