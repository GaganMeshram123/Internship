import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function EarthSurfacePracticeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'earth-surface-practice-intro',
      conceptId: 'earth-surface-practice-concept',
      conceptName: 'Gravitation Near Earth Surface Practice Problems',
      type: 'learning',
      description: 'Introduction to practice problems on gravity, height variations, and approximations'
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
                These problems will test your understanding of gravity near Earth's surface, height variations, 
                approximation techniques, and the physical meaning behind mathematical relationships. 
                Focus on explanations and physical reasoning, not just calculations.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Key Concepts and Formulas:</h4>
                <div className="space-y-2">
                  <div>Surface gravity: <InlineMath math="g = G \frac{M}{R^2} \approx 9.8 \text{ m/s}^2" /></div>
                  <div>Gravity at height: <InlineMath math="g(h) = g \cdot \frac{R^2}{(R+h)^2}" /></div>
                  <div>Approximation for small heights: <InlineMath math="g(h) \approx g\left(1 - 2\frac{h}{R}\right)" /></div>
                  <div>Earth's radius: <InlineMath math="R = 6.37 \times 10^6 \text{ m}" /></div>
                  <div>Binomial approximation: <InlineMath math="(1+x)^n \approx 1 + nx" /> when <InlineMath math="|x| \ll 1" /></div>
                </div>
              </div>
            </div>
          </div>
        </TrackedInteraction>

        <div className="space-y-6">
          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 1: The Mystery of Mass Independence
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Galileo famously dropped objects from the Leaning Tower of Pisa and observed that they fell at the same rate, 
                regardless of their mass. This seemed to contradict the idea that heavier objects should fall faster.
              </p>
              <p>
                <strong>Part A:</strong> Using Newton's universal law of gravitation and his second law, 
                derive why the acceleration due to gravity is independent of the falling object's mass.
              </p>
              <p>
                <strong>Part B:</strong> Explain why this mathematical result was so surprising historically. 
                What everyday experience might lead people to think heavier objects fall faster?
              </p>
              <p>
                <strong>Part C:</strong> On the Moon, where there's no atmosphere, an astronaut drops a hammer and a feather. 
                Predict what happens and explain your reasoning using physics principles.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Focus on the physical meaning rather than just the algebra. Why is this result so fundamental to our understanding of gravity?
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 2: Skydiving from the Edge of Space
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Felix Baumgartner jumped from a height of 39 km above Earth's surface in 2012, breaking the sound barrier during his fall.
              </p>
              <p>
                <strong>Part A:</strong> Calculate the gravitational acceleration at 39 km altitude using both the exact formula 
                and the binomial approximation. Compare your results.
              </p>
              <p>
                <strong>Part B:</strong> The approximation <InlineMath math="g(h) \approx g\left(1 - 2\frac{h}{R}\right)" /> is only valid when <InlineMath math="h \ll R" />. 
                Determine the percentage error in this approximation at 39 km height and explain whether it's reasonable to use.
              </p>
              <p>
                <strong>Part C:</strong> At what altitude would the gravitational acceleration be exactly half of its surface value? 
                Would the binomial approximation give a reasonable estimate at this height?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show your work and discuss the limitations of approximations in real-world scenarios.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 3: Weighing the Earth with a Pendulum
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Before space missions directly measured Earth's mass, scientists used clever methods to "weigh" our planet. 
                A simple pendulum can help determine Earth's mass if we know other parameters.
              </p>
              <p>
                <strong>Part A:</strong> The period of a simple pendulum is <InlineMath math="T = 2\pi\sqrt{\frac{L}{g}}" />. 
                Rearrange this to express <InlineMath math="g" /> in terms of measurable quantities <InlineMath math="T" /> and <InlineMath math="L" />.
              </p>
              <p>
                <strong>Part B:</strong> Using your expression for <InlineMath math="g" /> and the relationship <InlineMath math="g = \frac{GM}{R^2}" />, 
                derive a formula for Earth's mass <InlineMath math="M" /> in terms of the pendulum measurements and known constants.
              </p>
              <p>
                <strong>Part C:</strong> If a 1-meter pendulum has a period of 2.006 seconds at sea level, calculate Earth's mass. 
                Compare your result to the accepted value of <InlineMath math="5.97 \times 10^{24}" /> kg.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explain how this historical method demonstrates the interconnectedness of different physics concepts.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 4: Gravity Anomalies and Hidden Structures
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Geologists use gravity measurements to detect underground structures like oil deposits, mineral veins, or caverns. 
                The idea is that different densities create slight variations in local gravitational acceleration.
              </p>
              <p>
                <strong>Part A:</strong> Consider a large underground spherical cavern of radius 50 m located 100 m below the surface. 
                If the surrounding rock has density 2500 kg/m³, calculate the gravitational acceleration difference at the surface 
                directly above the cavern compared to nearby solid ground.
              </p>
              <p>
                <strong>Part B:</strong> Modern gravimeters can detect changes as small as <InlineMath math="10^{-8}" /> m/s². 
                Would the cavern in Part A be detectable? Show your calculation and reasoning.
              </p>
              <p>
                <strong>Part C:</strong> Explain why these gravity surveys are more effective for detecting large, shallow structures 
                rather than small, deep ones. What does this tell us about how gravitational effects scale with distance?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Consider how the inverse square law affects the detectability of underground features.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="earth-surface-practice-problems"
      slideTitle="Practice Problems"
      moduleId="gravitation-0001"
      submoduleId="gravitation-near-earth-surface"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 