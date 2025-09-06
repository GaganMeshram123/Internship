import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function GravitationPracticeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'gravitation-practice-intro',
      conceptId: 'gravitation-practice-concept',
      conceptName: 'Newton\'s Law of Gravitation Practice Problems',
      type: 'learning',
      description: 'Introduction to practice problems on universal gravitation and force calculations'
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
                Apply your understanding of Newton's law of universal gravitation to solve these challenging problems. 
                These questions will test your ability to calculate gravitational forces, understand field concepts, 
                apply Newton's third law, and work with the inverse square relationship.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Key Formulas and Constants:</h4>
                <div className="space-y-2">
                  <div>Newton's law: <InlineMath math="F = G \frac{m_1 m_2}{r^2}" /></div>
                  <div>Gravitational constant: <InlineMath math="G = 6.674 \times 10^{-11} \text{ N⋅m}^2/\text{kg}^2" /></div>
                  <div>Earth's mass: <InlineMath math="M_E = 5.97 \times 10^{24} \text{ kg}" /></div>
                  <div>Earth's radius: <InlineMath math="R_E = 6.37 \times 10^6 \text{ m}" /></div>
                  <div>Newton's second law: <InlineMath math="F = ma" /></div>
                </div>
              </div>
            </div>
          </div>
        </TrackedInteraction>

        <div className="space-y-6">
          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 1: Gravitational Force Between Celestial Bodies
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Calculate the gravitational force between the Earth and the Moon. Given:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Mass of Earth: <InlineMath math="M_E = 5.97 \times 10^{24} \text{ kg}" /></li>
                <li>Mass of Moon: <InlineMath math="M_M = 7.35 \times 10^{22} \text{ kg}" /></li>
                <li>Earth-Moon distance: <InlineMath math="r = 3.84 \times 10^8 \text{ m}" /></li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Express your answer in scientific notation and explain why this force doesn't cause the Moon to crash into Earth.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 2: Third Law Force Pairs and Accelerations
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                A 70 kg astronaut floats 10 meters away from a 100,000 kg space station in deep space.
              </p>
              <p>
                <strong>Part A:</strong> Calculate the gravitational force between them.
              </p>
              <p>
                <strong>Part B:</strong> Using Newton's third law, find the acceleration of both the astronaut and the space station.
              </p>
              <p>
                <strong>Part C:</strong> If they start from rest, how long will it take for them to meet? 
                (Assume they move only due to their mutual gravitational attraction)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explain why the astronaut moves much faster than the space station despite experiencing equal forces.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 3: Field Line Density and Force Strength
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Consider a spherical mass M creating a gravitational field. Field lines emanate radially outward from the center.
              </p>
              <p>
                <strong>Part A:</strong> If 100 field lines pass through a spherical surface of radius <InlineMath math="r_1 = 2 \text{ m}" />, 
                how many field lines pass through a spherical surface of radius <InlineMath math="r_2 = 6 \text{ m}" />?
              </p>
              <p>
                <strong>Part B:</strong> Prove that field line density follows the same <InlineMath math="1/r^2" /> law as gravitational force.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use this to explain why field lines provide a visual representation of force strength.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="gravitation-practice-problems"
      slideTitle="Practice Problems"
      moduleId="gravitation-0001"
      submoduleId="newtons-law-of-gravitation"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 