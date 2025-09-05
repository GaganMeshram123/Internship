import React, { useEffect, useState } from 'react';
import { useThemeContext } from '@/lib/ThemeContext';

interface PyodideLoaderProps {
  onLoad?: () => void;
}

const PyodideLoader: React.FC<PyodideLoaderProps> = ({ onLoad }) => {
  const [loadAttempted, setLoadAttempted] = useState(false);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    // Only load once
    if (loadAttempted) return;
    setLoadAttempted(true);

    const loadPyodide = async () => {
      try {
        // Check if Pyodide script is already loaded
        if (document.getElementById('pyodide-script')) {
          console.log('Pyodide script already in DOM');
          // Still wait a bit to make sure it's initialized
          setTimeout(() => {
            if (onLoad) onLoad();
          }, 100);
          return;
        }

        // Check if pyodide is already available
        if (typeof window !== 'undefined' && 'loadPyodide' in window) {
          console.log('window.loadPyodide already available');
          if (onLoad) onLoad();
          return;
        }

        console.log('Loading Pyodide script');
        // Create the script element
        const script = document.createElement('script');
        script.id = 'pyodide-script';
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.async = true;
        
        // Create proper load handlers
        script.onload = () => {
          console.log('Pyodide script loaded successfully');
          if (onLoad) {
            // Small delay to ensure everything is initialized
            setTimeout(() => {
              onLoad();
            }, 200);
          }
        };
        
        script.onerror = (e) => {
          console.error('Error loading Pyodide script:', e);
        };

        // Append the script to the document head
        document.head.appendChild(script);
      } catch (err) {
        console.error('Error in PyodideLoader:', err);
      }
    };

    loadPyodide();
  }, [onLoad, loadAttempted]);

  return null; // This component doesn't render anything
};

export default PyodideLoader; 