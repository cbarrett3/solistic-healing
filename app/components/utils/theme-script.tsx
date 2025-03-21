"use client";

import { useEffect } from "react";

export default function ThemeScript() {
  // This script component renders a script tag that runs immediately before React hydration
  // This prevents flash of unstyled content (FOUC) when navigating between pages
  
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Remove any existing theme class to prevent hydration mismatch
            document.documentElement.classList.remove('dark');
            
            // Only use system preference for theme
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Apply dark mode immediately based on system preference only
            if (systemPrefersDark) {
              document.documentElement.classList.add('dark');
            }
            
            // Set up listener for system preference changes
            function handleSystemThemeChange(e) {
              if (e.matches) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
            
            // Add event listener for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
          })();
        `,
      }}
    />
  );
}
