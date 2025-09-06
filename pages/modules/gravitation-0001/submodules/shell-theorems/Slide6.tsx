import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SuperpositionPracticeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'superposition-practice-intro',
      conceptId: 'superposition-practice-concept',
      conceptName: 'Gravitation and Superposition Practice Problems',
      type: 'learning',
      description: 'Introduction to practice problems on superposition principle, shell theorem, and solid sphere analysis'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const slideContent = (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="p-8 mx-auto max-w-4xl">
        
        <TrackedInteraction 
          interaction={slideInteractions[0]} 
          onInteractionComplete={handleInteractionComplete}
        >
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg mb-8">
            <div className="space-y-4 text-lg">
              <p className="leading-relaxed">
                These problems will test your understanding of the superposition principle, shell theorem applications, 
                and gravitational analysis of extended objects. Focus on physical reasoning, geometric insights, 
                and real-world applications rather than just mathematical calculations.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Key Concepts and Theorems:</h4>
                <div className="space-y-2">
                  <div><strong>Superposition Principle:</strong> Total force = vector sum of individual forces</div>
                  <div><strong>Shell Theorem (External):</strong> Uniform shell acts like point mass at center for external points</div>
                  <div><strong>Shell Theorem (Internal):</strong> Uniform shell exerts zero net force on internal points</div>
                  <div><strong>Solid Sphere:</strong> Can be divided into concentric shells, each following shell theorem</div>
                  <div><strong>Inside Solid Sphere:</strong> Only inner shells contribute; outer shells have zero effect</div>
                </div>
              </div>
            </div>
          </div>
        </TrackedInteraction>

        <div className="space-y-6">
          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 1: The Hollow Earth Theory Debunked
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                In the 17th and 18th centuries, some proposed that Earth might be hollow with a habitable interior surface. 
                Let's use the shell theorem to analyze what gravity would be like inside such a hollow Earth.
              </p>
              <p>
                <strong>Part A:</strong> Consider a spherical shell with Earth's mass and radius, but completely hollow inside. 
                Using the shell theorem, determine the gravitational force on a person standing anywhere inside this hollow shell.
              </p>
              <p>
                <strong>Part B:</strong> Explain why people couldn't "walk around" on the inner surface of a hollow Earth. 
                What would happen to objects dropped inside the hollow space?
              </p>
              <p>
                <strong>Part C:</strong> If you drilled a small hole through the shell and dropped a ball through it, 
                describe the ball's motion. Would it oscillate? Compare this to dropping a ball through a solid Earth.
              </p>
              <p>
                <strong>Part D:</strong> Some hollow Earth proponents suggested there might be a small central sun inside. 
                Analyze how this would affect the gravitational situation and whether it would make the hollow Earth habitable.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use the shell theorem to explain why the hollow Earth theory is physically impossible for human habitation.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 2: Journey to the Center of the Earth
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Imagine Jules Verne's scenario: drilling a tunnel all the way through Earth's center to the other side. 
                Assume Earth has uniform density for simplicity.
              </p>
              <p>
                <strong>Part A:</strong> A person starts at the surface and descends into the tunnel. 
                As they go deeper, how does the gravitational force on them change? Derive a formula for the gravitational 
                force as a function of distance from Earth's center.
              </p>
              <p>
                <strong>Part B:</strong> At what depth below the surface would the gravitational force be exactly half 
                of its surface value? Express your answer as a fraction of Earth's radius.
              </p>
              <p>
                <strong>Part C:</strong> What happens to the gravitational force when the person reaches Earth's center? 
                Explain this result using the shell theorem.
              </p>
              <p>
                <strong>Part D:</strong> If the person is dropped into the tunnel (ignoring air resistance and heat), 
                describe their motion. Would they oscillate back and forth through the center? 
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show how the shell theorem provides insights into the internal structure effects of gravitational fields.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="superposition-practice-problems"
      slideTitle="Practice Problems"
      moduleId="gravitation-0001"
      submoduleId="shell-theorems"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 