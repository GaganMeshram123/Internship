import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function InsideEarthPracticeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'inside-earth-practice-intro',
      conceptId: 'inside-earth-practice-concept',
      conceptName: 'Gravitation Inside Earth Practice Problems',
      type: 'learning',
      description: 'Introduction to practice problems on gravity inside Earth, shell theorem applications, and height-depth equivalence'
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
                These problems explore the fascinating world of gravity inside Earth, testing your understanding 
                of how gravitational force changes with depth, the linear relationship inside uniform spheres, 
                and the equivalence between height and depth effects.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Key Concepts and Formulas:</h4>
                <div className="space-y-2">
                  <div><strong>Inside Earth (uniform density):</strong> <InlineMath math="F(r) = mg \cdot \frac{r}{R}" /></div>
                  <div><strong>Above Earth:</strong> <InlineMath math="F(r) = mg \cdot \frac{R^2}{r^2}" /></div>
                  <div><strong>At surface:</strong> <InlineMath math="F(R) = mg" /></div>
                  <div><strong>Force proportional to distance from center inside uniform sphere</strong></div>
                  <div><strong>Shell Theorem:</strong> Only inner mass contributes to force</div>
                  <div><strong>Zero gravity at Earth's center</strong></div>
                </div>
              </div>
            </div>
          </div>
        </TrackedInteraction>

        <div className="space-y-6">
          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 1: Height vs Depth Gravitational Equivalence
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                One of the most elegant results in gravitational physics is the equivalence between gravity at altitude 
                and gravity at depth. Let's explore this fascinating relationship.
              </p>
              <p>
                <strong>Part A:</strong> Find the depth <InlineMath math="d" /> at which gravity equals the gravity 
                at height <InlineMath math="h" />. Show that <InlineMath math="d = 2h" /> for small heights.
              </p>
              <p>
                <strong>Part B:</strong> Calculate the specific depth below Earth's surface where gravity equals 
                the gravity at the International Space Station's altitude (408 km). Compare this depth to 
                the deepest mines on Earth (~4 km) and deepest ocean trenches (~11 km).
              </p>
              <p>
                <strong>Part C:</strong> Explain why this 2:1 ratio (depth = 2 × height) exists. What does this tell 
                us about the different ways gravitational force changes with position?
              </p>
              <p>
                <strong>Part D:</strong> A science fiction story describes miners working at a depth where gravity 
                is half of surface gravity. At what altitude above Earth would gravity also be half? 
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 2: The Impossible Mission to Earth's Core
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Science fiction often depicts journeys to Earth's center. Let's use physics to analyze 
                what would really happen during such a journey.
              </p>
              <p>
                <strong>Part A:</strong> The machine's weight (measured by an onboard scale) changes during the descent. 
                Calculate the machine's apparent weight as a percentage of its surface weight when it reaches 
                depths of 1000 km, 3000 km, and 6000 km below the surface.
              </p>
              <p>
                <strong>Part B:</strong> Real Earth has a denser core than the uniform density model predicts. 
                Explain how this would affect your calculations and whether gravity would actually be 
                stronger or weaker than predicted at various depths.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Problem 3: Seismic Wave Analysis and Earth's Internal Structure
            </h3>
            <div className="space-y-3 text-lg">
              <p>
                Seismic waves from earthquakes travel through Earth's interior, and their behavior is affected 
                by both density changes and gravitational effects. Let's analyze this connection.
              </p>
              <p>
                <strong>Part A:</strong> If Earth had truly uniform density as assumed in our models, 
                calculate the density required to produce the observed surface gravity of 9.8 m/s². 
                Compare this to Earth's average density (5.5 g/cm³) and explain the discrepancy.
              </p>
              <p>
                <strong>Part B:</strong> Real Earth has a dense iron core (≈13 g/cm³) and lighter mantle (≈4.5 g/cm³). 
                Sketch how this would modify the gravitational force vs. depth graph from our uniform density model. 
                Would gravity increase, decrease, or stay the same in the transition zones?
              </p>
              <p>
                <strong>Part C:</strong> Seismic waves change speed when they encounter density boundaries. 
                Using the shell theorem, explain why a seismic wave traveling from Earth's surface 
                toward the center would experience changing gravitational acceleration along its path.
              </p>
              <p>
                <strong>Part D:</strong> The inner core boundary is at about 1220 km radius from Earth's center. 
                Calculate what the gravitational field strength would be at this boundary assuming: 
                (1) uniform density throughout Earth, (2) a simplified two-layer model with dense core 
                and lighter outer layers. Take the density of the core to be 13 g/cm³ and the density of the mantle to be 4.5 g/cm³.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="inside-earth-practice-problems"
      slideTitle="Practice Problems"
      moduleId="gravitation-0001"
      submoduleId="gravitation-inside-earth"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 