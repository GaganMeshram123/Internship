import { Slide, SlideInteractionData, InteractionResponse, InteractionQuestionMeta } from './concept';
import CompletionSlide from './CompletionSlide';
import React from 'react';

/**
 * Adds a completion slide to the end of a slide array
 * @param slides - Array of slides to append completion slide to
 * @returns New array with completion slide appended
 */
export function addCompletionSlide(slides: Slide[]): Slide[] {
  // Create a copy of the slides array
  const slidesWithCompletion = [...slides];
  
  // Create the completion slide
  const completionSlide: Slide = {
    type: 'interactive',
    title: 'Completion',
    content: '',
    component: CompletionSlide,
    id: 'completion-slide'
    // The userData will be automatically passed from the parent component to this slide
    // No need to specify it here as it comes from ConceptSlides props
  };
  
  // Add the completion slide to the end
  slidesWithCompletion.push(completionSlide);
  
  return slidesWithCompletion;
} 

/**
 * Saves interaction data to the backend (per slide)
 * @param moduleId - ID or slug of the module
 * @param submoduleId - ID of the submodule
 * @param interactionData - Single-slide interaction data
 */
export async function saveInteractionData(
  moduleId: string,
  submoduleId: string,
  interactionData: SlideInteractionData
): Promise<void> {
  try {
    // In test mode, just log the interaction data instead of saving to backend
    console.log('Test Mode: Interaction data for', moduleId, submoduleId, interactionData);
    
    // Only log interactions if there are any meaningful ones
    const interactionCount = Object.keys(interactionData.interactions).length;
    if (interactionCount === 0 && interactionData.timeSpent < 5000) {
      console.log('Test Mode: Skipping save - no meaningful interactions');
      return;
    }

    console.log('Test Mode: Would save interaction data:', {
      moduleId,
      submoduleId,
      slideId: interactionData.slideId,
      slideTitle: interactionData.slideTitle,
      timeSpent: interactionData.timeSpent,
      interactions: interactionData.interactions,
      timestamp: new Date().toISOString(),
      interactionCount
    });

    // Simulate successful save
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Test Mode: Interaction data logged successfully');
  } catch (error) {
    console.error('Test Mode: Error logging interaction data:', error);
  }
}

/**
 * Creates a tracked interaction response (canonical shape)
 */
export function createInteractionResponse(
  interactionId: string,
  value: string | number | string[] | { key: string; value: string }[],
  isCorrect?: boolean,
  conceptId?: string,
  conceptName?: string,
  conceptDescription?: string,
  question?: InteractionQuestionMeta
): InteractionResponse {
  return {
    interactionId,
    value,
    isCorrect,
    timestamp: Date.now(),
    conceptId,
    conceptName,
    conceptDescription,
    question
  };
}

// Adding a default export component to fix Next.js build error
const SlideUtilsComponent: React.FC = () => {
  return (
    <div>
      <h1>Slide Utilities</h1>
      <p>This is a utility component for slide management.</p>
    </div>
  );
};

export default SlideUtilsComponent; 

