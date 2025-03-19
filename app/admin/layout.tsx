import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      {/* Admin Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link 
                href="/admin/blog" 
                className="flex items-center font-medium text-lg"
              >
                Solistic Healing Admin
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link 
                href="/admin/blog" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
              >
                Blog
              </Link>
              <Link 
                href="/api/admin/logout" 
                className="px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
