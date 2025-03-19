import Link from 'next/link';
import AdminLayout from './components/admin-layout';
import { Card, CardContent } from './components/ui';
import { FiPlus, FiList, FiGithub, FiServer, FiMail, FiCalendar, FiFileText, FiAlertCircle } from 'react-icons/fi';

export default async function AdminDashboard() {
  // Simulate blog posts data for now
  const posts = [{ slug: 'test-post', title: 'Test Blog Post', date: '2025-03-19', type: 'original' as const }];
  const postCount = posts.length;
  
  // Calculate days since site launch (March 19th, 2025)
  const launchDate = new Date('2025-03-19');
  const today = new Date();
  const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <AdminLayout title="Admin Dashboard" description="Welcome to the Solistic Healing admin dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-light text-lime-500 mb-3">Site Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GitHub Repository */}
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group dark:border-none border border-gray-100">
              <CardContent className="p-4 flex items-start">
                <div className="mr-4 p-2 bg-lime-50/50 dark:bg-lime-950/20 rounded-full transition-all duration-300 group-hover:bg-lime-100 dark:group-hover:bg-lime-950/30 group-hover:scale-110">
                  <FiGithub className="h-6 w-6 text-lime-700/70 dark:text-lime-300/70" />
                </div>
                <div>
                  <h3 className="text-sm font-medium group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">GitHub Repository</h3>
                  <p className="text-xs text-foreground/60 mt-1">cbarrett3/solistic-healing</p>
                  <Link 
                    href="https://github.com/cbarrett3/solistic-healing" 
                    target="_blank"
                    className="text-xs text-lime-500 hover:text-lime-600 mt-2 inline-block"
                  >
                    View Repository →
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Hosting Platform */}
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group dark:border-none border border-gray-100">
              <CardContent className="p-4 flex items-start">
                <div className="mr-4 p-2 bg-lime-50/50 dark:bg-lime-950/20 rounded-full transition-all duration-300 group-hover:bg-lime-100 dark:group-hover:bg-lime-950/30 group-hover:scale-110">
                  <FiServer className="h-6 w-6 text-lime-700/70 dark:text-lime-300/70" />
                </div>
                <div>
                  <h3 className="text-sm font-medium group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">Hosting Platform</h3>
                  <p className="text-xs text-foreground/60 mt-1">Vercel (Next.js 15)</p>
                  <Link 
                    href="https://vercel.com/dashboard" 
                    target="_blank"
                    className="text-xs text-lime-500 hover:text-lime-600 mt-2 inline-block"
                  >
                    View Dashboard →
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Email Platform */}
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group dark:border-none border border-gray-100">
              <CardContent className="p-4 flex items-start">
                <div className="mr-4 p-2 bg-lime-50/50 dark:bg-lime-950/20 rounded-full transition-all duration-300 group-hover:bg-lime-100 dark:group-hover:bg-lime-950/30 group-hover:scale-110">
                  <FiMail className="h-6 w-6 text-lime-700/70 dark:text-lime-300/70" />
                </div>
                <div>
                  <h3 className="text-sm font-medium group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">Email Platform</h3>
                  <p className="text-xs text-foreground/60 mt-1">Resend API</p>
                  <Link 
                    href="https://resend.com/dashboard" 
                    target="_blank"
                    className="text-xs text-lime-500 hover:text-lime-600 mt-2 inline-block"
                  >
                    View Dashboard →
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Days Since Launch */}
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group dark:border-none border border-gray-100">
              <CardContent className="p-4 flex items-start">
                <div className="mr-4 p-2 bg-lime-50/50 dark:bg-lime-950/20 rounded-full transition-all duration-300 group-hover:bg-lime-100 dark:group-hover:bg-lime-950/30 group-hover:scale-110">
                  <FiCalendar className="h-6 w-6 text-lime-700/70 dark:text-lime-300/70" />
                </div>
                <div>
                  <h3 className="text-sm font-medium group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">Site Launch</h3>
                  <p className="text-xs text-foreground/60 mt-1">March 19, 2025</p>
                  <p className="text-xs text-lime-500 mt-2">{daysSinceLaunch} days online</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Blog Posts Count */}
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group md:col-span-2 dark:border-none border border-gray-100">
              <CardContent className="p-4 flex items-start">
                <div className="mr-4 p-2 bg-lime-50/50 dark:bg-lime-950/20 rounded-full transition-all duration-300 group-hover:bg-lime-100 dark:group-hover:bg-lime-950/30 group-hover:scale-110">
                  <FiFileText className="h-6 w-6 text-lime-700/70 dark:text-lime-300/70" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">Blog Posts</h3>
                    <span className="text-xs bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300 px-2 py-1 rounded-full">
                      {postCount} total
                    </span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Link 
                      href="/admin/blog" 
                      className="text-xs text-lime-500 hover:text-lime-600 inline-block"
                    >
                      View All Posts →
                    </Link>
                    <Link 
                      href="/admin/blog/new" 
                      className="text-xs text-lime-500 hover:text-lime-600 inline-block"
                    >
                      Create New Post →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-lg font-light text-lime-500 mb-3">Quick Actions</h2>
          
          <Card className="border-none shadow-sm dark:border-none border border-gray-100">
            <CardContent className="p-4 space-y-3">
              <Link 
                href="/admin/blog/new" 
                className="flex items-center justify-between p-3 bg-lime-50 dark:bg-lime-950/30 text-lime-700 dark:text-lime-300 rounded-lg hover:bg-lime-100 dark:hover:bg-lime-950/50 transition-all duration-300 hover:shadow-sm hover:translate-x-1 cursor-pointer border border-lime-100 dark:border-transparent"
              >
                <span className="flex items-center">
                  <FiPlus className="mr-2" />
                  Create New Blog Post
                </span>
                <span className="text-xs">→</span>
              </Link>
              
              <Link 
                href="/admin/blog" 
                className="flex items-center justify-between p-3 bg-lime-50/30 dark:bg-lime-950/10 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-lime-50 dark:hover:bg-lime-950/20 hover:text-lime-700 dark:hover:text-lime-300 transition-all duration-300 hover:shadow-sm hover:translate-x-1 cursor-pointer border border-gray-100 dark:border-transparent"
              >
                <span className="flex items-center">
                  <FiList className="mr-2" />
                  Manage Blog Posts
                </span>
                <span className="text-xs">→</span>
              </Link>
              
              <Link 
                href="https://github.com/cbarrett3/solistic-healing/issues/new" 
                target="_blank"
                className="flex items-center justify-between p-3 bg-lime-50/30 dark:bg-lime-950/10 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-lime-50 dark:hover:bg-lime-950/20 hover:text-lime-700 dark:hover:text-lime-300 transition-all duration-300 hover:shadow-sm hover:translate-x-1 cursor-pointer border border-gray-100 dark:border-transparent"
              >
                <span className="flex items-center">
                  <FiAlertCircle className="mr-2" />
                  Open GitHub Issue
                </span>
                <span className="text-xs">→</span>
              </Link>
              
              <Link 
                href="/" 
                target="_blank"
                className="flex items-center justify-between p-3 bg-lime-50/30 dark:bg-lime-950/10 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-lime-50 dark:hover:bg-lime-950/20 hover:text-lime-700 dark:hover:text-lime-300 transition-all duration-300 hover:shadow-sm hover:translate-x-1 cursor-pointer border border-gray-100 dark:border-transparent"
              >
                <span className="flex items-center">
                  <FiServer className="mr-2" />
                  View Live Site
                </span>
                <span className="text-xs">→</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
