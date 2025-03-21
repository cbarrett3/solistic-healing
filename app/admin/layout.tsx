import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ToastProvider } from './components/ui/toast';
import NavigationLinks from './components/navigation-links';
import { Metadata } from 'next';

// Define viewport for Next.js 15
export const viewport = {
  colorScheme: "light dark",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Admin Header */}
        <header className="bg-background/90 backdrop-blur-sm border-b border-border/5 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-5 sm:px-8 md:px-10 py-4 sm:py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link 
                  href="/admin" 
                  className="flex items-center group cursor-pointer"
                >
                  <div className="mr-3 md:mr-4 transition-all duration-300 ease-out group-hover:scale-110">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                      {/* Tree of life / peace symbol inspired icon - same as main site */}
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(var(--color-primary-rgb)/0.8)]">
                        {/* Circle */}
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        
                        {/* Tree/peace symbol */}
                        <path 
                          d="M12 4V20" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                        />
                        
                        {/* Branches/peace lines */}
                        <path 
                          d="M12 8L8 12M12 8L16 12" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                        />
                        
                        <path 
                          d="M12 14L9 17M12 14L15 17" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                        />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-base sm:text-lg font-normal tracking-wider text-foreground/80 transition-colors duration-300 hover:text-primary relative">
                    Admin
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                  </h1>
                </Link>
                
                <NavigationLinks />
              </div>
              
              <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
                <Link 
                  href="/" 
                  className="relative text-sm font-medium uppercase tracking-wider text-foreground/90 hover:text-primary transition-colors duration-300 bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded border border-border/20 hover:border-primary/30"
                >
                  Return to Main Site
                </Link>
                <Link 
                  href="/admin/logout" 
                  className="relative text-sm font-medium uppercase tracking-wider text-destructive/90 hover:text-destructive transition-colors duration-300 bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded border border-border/20 hover:border-destructive/30"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="container mx-auto px-5 sm:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
