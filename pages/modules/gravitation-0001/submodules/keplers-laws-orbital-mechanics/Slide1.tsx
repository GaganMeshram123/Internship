import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function KeplersLawsSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedLaw, setSelectedLaw] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'keplers-laws-overview',
      conceptId: 'keplers-laws-historical-discovery',
      conceptName: 'Kepler\'s Three Laws Overview',
      type: 'learning',
      description: 'Explore the three fundamental laws that govern planetary motion',
      conceptDescription: 'Understanding the historical context and significance of Kepler\'s discoveries'
    },
    {
      id: 'historical-figures',
      conceptId: 'keplers-laws-historical-discovery',
      conceptName: 'Historical Figures',
      type: 'learning',
      description: 'Learn about the key astronomers who contributed to our understanding of planetary motion',
      conceptDescription: 'Exploring the contributions of Tycho Brahe, Kepler, and Newton'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const laws = [
    {
      id: 'law-of-orbits',
      title: 'Law of Orbits',
      description: 'All planets move in elliptical orbits with the Sun at one focus',
      detail: 'Planets don\'t move in perfect circles as previously thought, but in ellipses. The Sun sits at one of the two focal points of each ellipse.',
      significance: 'Revolutionized our understanding of planetary motion and showed the universe follows mathematical laws',
      formula: 'Elliptical orbits with Sun at one focus'
    },
    {
      id: 'law-of-areas',
      title: 'Law of Areas',
      description: 'A line joining any planet to the Sun sweeps out equal areas in equal times',
      detail: 'Planets move faster when closer to the Sun and slower when farther away, but the area swept is always the same for equal time periods.',
      significance: 'Equivalent to conservation of angular momentum - a fundamental principle in physics',
      formula: '\\frac{dA}{dt} = \\text{constant}'
    },
    {
      id: 'law-of-periods',
      title: 'Law of Periods',
      description: 'The square of a planet\'s orbital period is proportional to the cube of its semimajor axis',
      detail: 'Mathematical relationship: T² ∝ a³. This allows us to calculate orbital periods and distances throughout the solar system.',
      significance: 'Provides the mathematical foundation for understanding all orbital systems',
      formula: 'T^2 \\propto a^3'
    }
  ];

  const historicalFigures = [
    {
      id: 'tycho-brahe',
      name: 'Tycho Brahe (1546-1601)',
      contribution: 'Meticulous Observer',
      description: 'The last great astronomer to make detailed observations without a telescope',
      achievement: 'Compiled the most accurate astronomical data of his era, providing the foundation for Kepler\'s discoveries',
      legacy: 'His precise measurements of planetary positions enabled Kepler to discover the laws of planetary motion',
      impact: 'Without Brahe\'s extraordinary precision, Kepler would never have been able to detect the elliptical nature of orbits.'
    },
    {
      id: 'johannes-kepler',
      name: 'Johannes Kepler (1571-1630)',
      contribution: 'Mathematical Genius',
      description: 'Used Brahe\'s data to discover the three laws of planetary motion',
      achievement: 'Spent decades analyzing Mars\' seemingly erratic motion to uncover the elliptical nature of orbits',
      legacy: 'His laws form the foundation of modern astronomy and space exploration',
      impact: 'Transformed astronomy from descriptive observations to mathematical laws governing celestial motion.'
    },
    {
      id: 'isaac-newton',
      name: 'Isaac Newton (1642-1727)',
      contribution: 'Theoretical Foundation',
      description: 'Showed that his law of universal gravitation leads to Kepler\'s laws',
      achievement: 'Provided the physical explanation for why planets follow Kepler\'s laws',
      legacy: 'United terrestrial and celestial mechanics under one mathematical framework',
      impact: 'Explained the physical cause behind Kepler\'s laws, showing gravity governs all motion in the universe.'
    }
  ];

  return (
    <SlideComponentWrapper
      slideId="keplers-laws-historical-discovery"
      slideTitle="Kepler's Laws: Historical Discovery"
      moduleId="gravitation-0001"
      submoduleId="keplers-laws-orbital-mechanics"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Explanation */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-4">
                {/* Introduction */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Kepler's Laws</h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-lg">
                    The three fundamental laws that revolutionized our understanding of planetary motion. 
                    These laws, discovered by Johannes Kepler in the early 1600s, describe the precise 
                    mathematical relationships governing how planets orbit the Sun.
                  </p>
                </div>
                
                {/* Historical Context */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">The Mystery of Planetary Motion</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">Ancient Puzzles</h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-lg space-y-1">
                        <li>• Planets "wandered" against the fixed stars</li>
                        <li>• Mars showed puzzling "loop-the-loop" motion</li>
                        <li>• Circular orbits couldn't explain observations</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">Kepler's Breakthrough</h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-lg space-y-1">
                        <li>• Used Tycho Brahe's precise measurements</li>
                        <li>• Discovered orbits are elliptical, not circular</li>
                        <li>• Found mathematical laws governing motion</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* The Three Laws */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Kepler's Three Laws</h3>
                  
                  <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">1.</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Law of Orbits:</span>{' '}
                        Planets move in elliptical orbits with the Sun at one focus
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">2.</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Law of Areas:</span>{' '}
                        Equal areas are swept out in equal times
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">3.</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Law of Periods:</span>{' '}
                        T² is proportional to a³
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Interactive Elements */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Explore the Laws</h3>
              
              {/* Law selection */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Select a Law to Explore:</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                  Click on each law to learn about its significance and mathematical formulation
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  {laws.map((law) => (
                    <button
                      key={law.id}
                      className={`p-3 rounded-md text-left transition-all duration-300 ${
                        selectedLaw === law.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedLaw(law.id);
                        const response: InteractionResponse = {
                          interactionId: 'keplers-laws-overview',
                          value: law.title,
                          timestamp: Date.now(),
                          conceptId: 'keplers-laws-historical-discovery',
                          conceptName: 'Kepler\'s Three Laws Overview',
                          conceptDescription: `Explored ${law.title}: ${law.description}`
                        };
                        handleInteractionComplete(response);
                      }}
                    >
                      <div className="font-medium text-lg mb-1">{law.title}</div>
                      <div className="text-lg opacity-90">{law.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Law details */}
              {selectedLaw && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700 mb-4">
                  <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Law Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Law: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                        {laws.find(l => l.id === selectedLaw)?.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Mathematical Form: </span>
                      <div className="text-gray-700 dark:text-gray-300 text-lg mt-1">
                        <InlineMath math={laws.find(l => l.id === selectedLaw)?.formula || ''} />
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Explanation: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {laws.find(l => l.id === selectedLaw)?.detail}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Significance: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {laws.find(l => l.id === selectedLaw)?.significance}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Historical Figures */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Key Historical Figures:</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                  Learn about the astronomers who made these discoveries possible
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  {historicalFigures.map((figure) => (
                    <button
                      key={figure.id}
                      className={`p-3 rounded-md text-left transition-all duration-300 ${
                        selectedFigure === figure.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedFigure(figure.id);
                        const response: InteractionResponse = {
                          interactionId: 'historical-figures',
                          value: figure.name,
                          timestamp: Date.now(),
                          conceptId: 'keplers-laws-historical-discovery',
                          conceptName: 'Historical Figures',
                          conceptDescription: `Explored ${figure.name}: ${figure.description}`
                        };
                        handleInteractionComplete(response);
                      }}
                    >
                      <div className="font-medium text-lg mb-1">{figure.name}</div>
                      <div className="text-lg opacity-90">{figure.contribution}</div>
                    </button>
                  ))}
                </div>
                
                {/* Figure details */}
                {selectedFigure && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-lg">Achievement: </span>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">
                          {historicalFigures.find(f => f.id === selectedFigure)?.achievement}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-lg">Legacy: </span>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">
                          {historicalFigures.find(f => f.id === selectedFigure)?.legacy}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-lg">Impact: </span>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">
                          {historicalFigures.find(f => f.id === selectedFigure)?.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 