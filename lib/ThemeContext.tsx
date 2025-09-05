import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
  isTransitioning: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with dark mode (matching your current setup)
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Add state to track if theme is transitioning
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update the HTML class when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Start transition animation
    setIsTransitioning(true);
    
    // After a short delay, change the theme
    setTimeout(() => {
      // Add active class to overlay for blur effect
      const overlay = document.querySelector('.theme-transition-overlay');
      if (overlay) {
        overlay.classList.add('active');
      }
      
      // Change the theme after a short delay
      setTimeout(() => {
        setIsDarkMode(!isDarkMode);
        
        // End transition after theme change completes
        setTimeout(() => {
          if (overlay) {
            overlay.classList.remove('active');
          }
          setTimeout(() => {
            setIsTransitioning(false);
          }, 300);
        }, 600); // Match this to the CSS transition duration
      }, 150);
    }, 50);
    
    // Save preference to localStorage
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const setDarkMode = (isDark: boolean) => {
    // Start transition animation
    setIsTransitioning(true);
    
    // After a short delay, change the theme
    setTimeout(() => {
      // Add active class to overlay for blur effect
      const overlay = document.querySelector('.theme-transition-overlay');
      if (overlay) {
        overlay.classList.add('active');
      }
      
      // Change the theme after a short delay
      setTimeout(() => {
        setIsDarkMode(isDark);
        
        // End transition after theme change completes
        setTimeout(() => {
          if (overlay) {
            overlay.classList.remove('active');
          }
          setTimeout(() => {
            setIsTransitioning(false);
          }, 300);
        }, 600); // Match this to the CSS transition duration
      }, 150);
    }, 50);
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  // Check for saved theme preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If no saved preference, use system preference
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setDarkMode, isTransitioning }}>
      {children}
      {/* Theme transition overlay */}
      {isTransitioning && (
        <div className="theme-transition-overlay">
          <div className="theme-transition-circle"></div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
} 