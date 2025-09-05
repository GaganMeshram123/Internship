import { useThemeContext } from './ThemeContext';
import { useRef, useEffect, useState } from 'react';

function ThemeToggle() {
  const { isDarkMode, toggleTheme, isTransitioning } = useThemeContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  
  // Capture button size on mount
  useEffect(() => {
    if (buttonRef.current) {
      const { width, height } = buttonRef.current.getBoundingClientRect();
      setButtonSize({ width, height });
    }
  }, []);
  
  // Update the overlay position when the button is clicked
  useEffect(() => {
    if (isTransitioning && buttonRef.current) {
      const overlay = document.querySelector('.theme-transition-overlay') as HTMLElement;
      const circle = document.querySelector('.theme-transition-circle') as HTMLElement;
      
      if (overlay && circle && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        // Position the overlay's center at the button's center
        circle.style.left = `${buttonCenterX}px`;
        circle.style.top = `${buttonCenterY}px`;
        
        // Calculate the window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate the maximum possible distance from the button to the farthest corner
        const distanceToTopLeft = Math.sqrt(
          Math.pow(buttonCenterX, 2) + Math.pow(buttonCenterY, 2)
        );
        const distanceToTopRight = Math.sqrt(
          Math.pow(windowWidth - buttonCenterX, 2) + Math.pow(buttonCenterY, 2)
        );
        const distanceToBottomLeft = Math.sqrt(
          Math.pow(buttonCenterX, 2) + Math.pow(windowHeight - buttonCenterY, 2)
        );
        const distanceToBottomRight = Math.sqrt(
          Math.pow(windowWidth - buttonCenterX, 2) + Math.pow(windowHeight - buttonCenterY, 2)
        );
        
        // Use the maximum distance for the circle's initial size
        const maxDistance = Math.max(
          distanceToTopLeft,
          distanceToTopRight,
          distanceToBottomLeft,
          distanceToBottomRight
        );
        
        // Set a CSS variable for the maximum scale
        document.documentElement.style.setProperty('--max-scale', `${(maxDistance * 2.2) / Math.min(buttonSize.width, buttonSize.height)}`);
      }
    }
  }, [isTransitioning, buttonSize]);
  
  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors relative overflow-visible"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      disabled={isTransitioning} // Prevent multiple clicks during transition
    >
      <span className={`absolute inset-0 rounded-md ${isTransitioning ? 'animate-pulse-light' : ''}`}></span>
      {isDarkMode ? (
        // Sun icon for dark mode - solid yellow circle with rays
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 relative z-10"
        >
          <circle cx="12" cy="12" r="4" fill="#FFEB3B" />
          <line x1="12" y1="3" x2="12" y2="6" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="18" x2="12" y2="21" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="12" x2="6" y2="12" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="12" x2="21" y2="12" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="5.636" y1="5.636" x2="7.757" y2="7.757" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="16.243" y1="16.243" x2="18.364" y2="18.364" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="5.636" y1="18.364" x2="7.757" y2="16.243" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="16.243" y1="7.757" x2="18.364" y2="5.636" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        // Moon icon for light mode - solid white crescent
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 relative z-10"
        >
          <path
            fill="white"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      )}
    </button>
  );
}

export { ThemeToggle };
export default ThemeToggle; 