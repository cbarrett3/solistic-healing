import Link from 'next/link';
import AdminLayout from './components/admin-layout';
import { Card, CardContent } from './components/ui';
import { FiGithub, FiServer, FiMail, FiCalendar, FiAlertCircle } from 'react-icons/fi';

export default async function AdminDashboard() {
  // Calculate days since site launch (March 19th, 2025)
  const launchDate = new Date('2025-03-19');
  const today = new Date();
  const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <AdminLayout title="Admin Dashboard" description="Welcome to the Solistic Healing admin dashboard">
      <div className="grid grid-cols-1 gap-6">
        {/* Site Information Cards */}
        <div className="space-y-6">
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
            
            {/* GitHub Issues Link */}
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group dark:border-none border border-gray-100">
              <CardContent className="p-4 flex items-start">
                <div className="mr-4 p-2 bg-lime-50/50 dark:bg-lime-950/20 rounded-full transition-all duration-300 group-hover:bg-lime-100 dark:group-hover:bg-lime-950/30 group-hover:scale-110">
                  <FiAlertCircle className="h-6 w-6 text-lime-700/70 dark:text-lime-300/70" />
                </div>
                <div>
                  <h3 className="text-sm font-medium group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">Report Issues</h3>
                  <p className="text-xs text-foreground/60 mt-1">GitHub Issues</p>
                  <Link 
                    href="https://github.com/cbarrett3/solistic-healing/issues/new" 
                    target="_blank"
                    className="text-xs text-lime-500 hover:text-lime-600 mt-2 inline-block"
                  >
                    Open Issue →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
