"use client";

import React, { useEffect, useState, useRef } from 'react';
import { InteractionResponse, SlideInteractionData } from './concept';
import { saveInteractionData } from './SlideUtils';
import { useRouter } from 'next/router';
import { useThemeContext } from '@/lib/ThemeContext';

interface SlideComponentWrapperProps {
  slideId: string;
  slideTitle: string;
  moduleId: string;
  submoduleId: string;
  children: React.ReactNode;
  interactions: Record<string, InteractionResponse>;
}

export default function SlideComponentWrapper({ 
  slideId, 
  slideTitle,
  moduleId,
  submoduleId,
  children, 
  interactions 
}: SlideComponentWrapperProps) {
  const [startTime, setStartTime] = useState<number>(Date.now());
  const router = useRouter();
  const [saveError, setSaveError] = useState<string | null>(null);
  const { isDarkMode } = useThemeContext();
  
  // Use a ref to keep track of the latest interactions without triggering effect reruns
  const interactionsRef = useRef<Record<string, InteractionResponse>>({});
  
  // Update the ref whenever interactions change
  useEffect(() => {
    interactionsRef.current = interactions;
  }, [interactions, slideId]);

  // Effect to run when the component mounts
  useEffect(() => {    
    // Set the start time when the component mounts
    setStartTime(Date.now());

    // Return a cleanup function to run when the component unmounts
    return () => {
      // Calculate time spent on the slide
      const timeSpent = Date.now() - startTime;
      
      // Get the current interactions from the ref
      const currentInteractions = interactionsRef.current;
      const interactionCount = Object.keys(currentInteractions).length;
      
      // Only save if we have meaningful interactions or spent enough time on the slide
      if (interactionCount === 0 && timeSpent < 3000) {
        return;
      }

      // Create the interaction data
      const interactionData: SlideInteractionData = {
        slideId,
        slideTitle,
        timeSpent,
        interactions: currentInteractions,
      };

      // Reset any previous save errors
      setSaveError(null);

      // Save interaction data
      saveInteractionData(
        moduleId,
        submoduleId,
        interactionData
      ).then(() => {
        console.log(`[${slideId}] Interaction data saved successfully`);
      }).catch(error => {
        const errorMessage = error?.message || 'Unknown error';
        console.error(`[${slideId}] Error saving interaction data:`, error);
        
        // Set more user-friendly error message based on error type
        let userMessage = 'Failed to save progress';
        
        if (errorMessage.includes('auth token') || errorMessage.includes('Unauthorized')) {
          userMessage = 'Authentication error - please refresh the page and try again';
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          userMessage = 'Network error - please check your internet connection';
        } else {
          userMessage = `Error saving progress: ${errorMessage}`;
        }
        
        setSaveError(userMessage);
        
        // Attempt to notify parent window of error
        try {
          if (window.parent) {
            window.parent.postMessage({
              type: 'INTERACTION_SAVE_ERROR',
              payload: {
                slideId,
                error: errorMessage
              }
            }, '*');
          }
        } catch (e) {
          console.error('Error sending postMessage:', e);
        }
      });
    };
  // Only re-run this effect if the slide ID, title, or module/submodule IDs change
  // We do NOT include interactions as a dependency to avoid re-creating the cleanup function
  }, [slideId, slideTitle, moduleId, submoduleId]);

  return (
    <div className={`slide-component-wrapper ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {children}
      {saveError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded shadow-lg max-w-md z-50">
          <p className="font-medium">{saveError}</p>
          <button 
            className="absolute top-1 right-1 text-white hover:text-gray-200"
            onClick={() => setSaveError(null)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 