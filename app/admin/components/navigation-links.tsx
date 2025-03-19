'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationLinks() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Manage Blog', href: '/admin/blog' }
  ];
  
  return (
    <nav className="hidden sm:flex items-center ml-8 space-x-4 md:space-x-6 lg:space-x-8">
      {navItems.map((item) => {
        // Check if current path matches this nav item
        // For the dashboard, only match exact path
        // For other sections, match if the path starts with the href
        const isActive = 
          item.href === '/admin' 
            ? pathname === '/admin'
            : pathname.startsWith(item.href);
            
        return (
          <Link 
            key={item.name}
            href={item.href}
            className={`
              relative text-sm font-light uppercase tracking-wider
              transition-colors duration-300
              ${isActive 
                ? 'text-primary font-medium' 
                : 'text-foreground hover:text-primary'}
            `}
          >
            {item.name}
            <span 
              className={`
                absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ease-out
                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
              `}
            />
          </Link>
        );
      })}
    </nav>
  );
}
