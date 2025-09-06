import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function IntroGravitationSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedScale, setSelectedScale] = useState<string>('personal');
  const [scaleValue, setScaleValue] = useState<number>(0); // 0-4 for different scales
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showGravityWaves, setShowGravityWaves] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();
  const animationRef = useRef<number>();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'gravity-cosmic-reach',
      conceptId: 'gravity-cosmic-reach-concept',
      conceptName: 'Cosmic Reach of Gravitational Force',
      type: 'learning',
      description: 'Understanding how gravitational force extends across the universe'
    },
    {
      id: 'gravity-scale-exploration',
      conceptId: 'gravity-scale-concept',
      conceptName: 'Gravitational Effects at Different Scales',
      type: 'learning',
      description: 'Exploring gravitational effects from personal to cosmic scales'
    },
    {
      id: 'gravity-universality',
      conceptId: 'gravity-universality-concept',
      conceptName: 'Universal Nature of Gravity',
      type: 'learning',
      description: 'Understanding that gravity affects everything in the universe'
    },
    {
      id: 'scale-interaction',
      conceptId: 'scale-interaction-concept',
      conceptName: 'Interactive Scale Exploration',
      type: 'learning',
      description: 'Using slider to explore different gravitational scales'
    },
    {
      id: 'scale-ratio-quiz',
      conceptId: 'scale-ratio-concept',
      conceptName: 'Scale Ratio Understanding',
      type: 'judging',
      description: 'Testing understanding of scale ratios between gravitational systems'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const scales = [
    {
      id: 'personal',
      title: 'Personal Scale',
      subtitle: 'You & Earth',
      description: 'Gravity holds you to Earth',
      distance: '6,400 km from Earth\'s center',
      effect: 'You experience 9.8 m/s² acceleration',
      forceStrength: '~700 N (for 70 kg person)',
      visualSize: 1,
      color: '#3B82F6'
    },
    {
      id: 'planetary',
      title: 'Planetary Scale',
      subtitle: 'Moon & Earth', 
      description: 'Gravity keeps Moon orbiting Earth',
      distance: '384,000 km',
      effect: 'Moon stays in stable orbit',
      forceStrength: '1.98 × 10²⁰ N',
      visualSize: 10,
      color: '#10B981'
    },
    {
      id: 'solar',
      title: 'Solar System Scale',
      subtitle: 'Earth & Sun',
      description: 'Gravity keeps Earth orbiting Sun',
      distance: '150 million km',
      effect: 'Earth maintains yearly orbit',
      forceStrength: '3.52 × 10²² N',
      visualSize: 50,
      color: '#F59E0B'
    },
    {
      id: 'galactic',
      title: 'Galactic Scale',
      subtitle: 'Stars & Milky Way',
      description: 'Gravity holds billions of stars together',
      distance: '26,000 light-years from center',
      effect: 'Stars bound in galactic structure',
      forceStrength: '~10³⁶ N (collective)',
      visualSize: 200,
      color: '#8B5CF6'
    },
    {
      id: 'intergalactic',
      title: 'Intergalactic Scale',
      subtitle: 'Galaxy Clusters',
      description: 'Gravity binds galaxy groups',
      distance: '2.3 million light-years',
      effect: 'Galaxies gravitationally bound',
      forceStrength: '~10⁴⁰ N (cluster-scale)',
      visualSize: 400,
      color: '#EF4444'
    }
  ];

  const currentScale = scales[scaleValue];

  // Handle scale slider change
  const handleScaleChange = (value: number) => {
    setScaleValue(value);
    setSelectedScale(scales[value].id);
    setIsAnimating(true);
    setShowGravityWaves(true);
    
    // Track interaction
    const response: InteractionResponse = {
      interactionId: 'scale-interaction',
      value: scales[value].title,
      timestamp: Date.now(),
      conceptId: 'scale-interaction-concept',
      conceptName: 'Interactive Scale Exploration',
      conceptDescription: `Explored ${scales[value].title}: ${scales[value].description}`
    };
    handleInteractionComplete(response);

    // Stop animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
      setShowGravityWaves(false);
    }, 2000);
  };

  // Generate orbiting particles for animation
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * 360,
      radius: 80 + (i % 3) * 20,
      speed: 0.5 + (i % 3) * 0.3
    }));
  };

  const particles = generateParticles(currentScale.visualSize / 10);

  // Handle quiz answer selection
  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowQuizFeedback(true);
    
    const isCorrect = answer === 'C';
    const optionMap: Record<string, string> = {
      A: 'About 1,000 times larger',
      B: 'About 1,000,000 times larger',
      C: 'About 650,000,000 times larger',
      D: 'About 1,000,000,000,000 times larger'
    };
    const selectedText = optionMap[answer] || answer;

    const response: InteractionResponse = {
      interactionId: 'scale-ratio-quiz',
      value: selectedText,
      isCorrect: isCorrect,
      timestamp: Date.now(),
      conceptId: 'scale-ratio-concept',
      conceptName: 'Scale Ratio Understanding',
      conceptDescription: `Selected answer: ${selectedText}. ${isCorrect ? 'Correct!' : 'Incorrect.'} Moon-Earth distance is ~384,000 km, while our distance from galactic center is ~26,000 light-years (~2.5×10¹⁷ km), making the ratio approximately 650,000,000 times larger.`,
      question: {
        type: 'mcq',
        question: 'How many times larger is the Milky Way scale compared to the Moon-Earth system?',
        options: [
          'About 1,000 times larger',
          'About 1,000,000 times larger',
          'About 650,000,000 times larger',
          'About 1,000,000,000,000 times larger'
        ]
      }
    };
    handleInteractionComplete(response);
  };

  return (
    <SlideComponentWrapper
      slideId="gravitation-intro-cosmic-reach"
      slideTitle="Gravity's Cosmic Scale Explorer"
      moduleId="gravitation-0001"
      submoduleId="introduction-to-gravitation"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          {/* Left column - Interactive Scale Visualization */}
          <div className="space-y-6">
            {/* Scale Visualization */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
                Gravity Across Cosmic Scales
              </h3>
              
              {/* Main visualization area */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-lg mb-6 overflow-hidden">
                {/* Central gravitational source */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-white font-bold border-4"
                  style={{
                    backgroundColor: currentScale.color,
                    borderColor: `${currentScale.color}66`,
                    // Much larger Earth for personal scale - very zoomed in!
                    width: `${scaleValue === 0 ? 150 : scaleValue === 1 ? 70 : scaleValue === 2 ? 90 : scaleValue === 3 ? 65 : 75}px`,
                    height: `${scaleValue === 0 ? 150 : scaleValue === 1 ? 70 : scaleValue === 2 ? 90 : scaleValue === 3 ? 65 : 75}px`,
                    fontSize: `${scaleValue === 0 ? 60 : scaleValue === 1 ? 28 : scaleValue === 2 ? 36 : scaleValue === 3 ? 24 : 30}px`
                  }}
                  animate={{
                    scale: isAnimating ? [1, 1.2, 1] : 1,
                    boxShadow: isAnimating 
                      ? `0 0 ${40 + scaleValue * 20}px ${currentScale.color}` 
                      : `0 0 ${20 + scaleValue * 10}px ${currentScale.color}`,
                  }}
                  transition={{ duration: 2, repeat: isAnimating ? Infinity : 0 }}
                >
                  {scaleValue === 0 ? '🌍' : scaleValue === 1 ? '🌍' : scaleValue === 2 ? '☀️' : scaleValue === 3 ? '🕳️' : '🌌'}
                </motion.div>



                {/* Orbiting celestial bodies with proper representations */}
                <AnimatePresence>
                  {(() => {
                    // Define scale-specific orbital systems
                    type CelestialBody = {
                      emoji: string;
                      size: number;
                      radius: number;
                      speed: number;
                      color: string;
                      name: string;
                      angle: number;
                    };

                    const orbitalSystems: { [key: number]: CelestialBody[] } = {
                      0: [ // Personal Scale: Just Earth (no orbiting)
                      ],
                      1: [ // Planetary Scale: Moon around Earth  
                        { emoji: '🌙', size: 24, radius: 90, speed: 0.8, color: '#E5E7EB', name: 'Moon', angle: 0 }
                      ],
                      2: [ // Solar Scale: Planets around Sun
                        { emoji: '☿️', size: 12, radius: 80, speed: 1.2, color: '#A16207', name: 'Mercury', angle: 0 },
                        { emoji: '♀️', size: 16, radius: 100, speed: 0.9, color: '#FbbF24', name: 'Venus', angle: 90 },
                        { emoji: '🌍', size: 18, radius: 120, speed: 0.7, color: '#3B82F6', name: 'Earth', angle: 180 },
                        { emoji: '♂️', size: 14, radius: 145, speed: 0.5, color: '#EF4444', name: 'Mars', angle: 270 }
                      ],
                      3: [ // Galactic Scale: Stars around Black Hole
                        { emoji: '⭐', size: 14, radius: 85, speed: 0.6, color: '#FbbF24', name: 'Star A', angle: 0 },
                        { emoji: '🌟', size: 16, radius: 110, speed: 0.4, color: '#F97316', name: 'Star B', angle: 120 },
                        { emoji: '✨', size: 12, radius: 135, speed: 0.3, color: '#8B5CF6', name: 'Star C', angle: 240 }
                      ],
                      4: [ // Intergalactic Scale: Galaxies around Cluster Center
                        { emoji: '🌌', size: 18, radius: 90, speed: 0.3, color: '#8B5CF6', name: 'Galaxy 1', angle: 0 },
                        { emoji: '🌠', size: 16, radius: 120, speed: 0.2, color: '#EC4899', name: 'Galaxy 2', angle: 180 }
                      ]
                    };

                    const currentSystem = orbitalSystems[scaleValue] || [];
                    
                    return currentSystem.map((celestialBody: CelestialBody, index: number) => (
                      <div
                        key={`orbit-container-${scaleValue}-${index}`}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          width: `${celestialBody.radius * 2}px`,
                          height: `${celestialBody.radius * 2}px`,
                        }}
                      >
                        <motion.div
                          className="absolute rounded-full border-2 flex items-center justify-center font-bold"
                          style={{
                            top: 0,
                            left: '50%',
                            width: `${celestialBody.size}px`,
                            height: `${celestialBody.size}px`,
                            backgroundColor: celestialBody.color,
                            borderColor: `${celestialBody.color}66`,
                            fontSize: `${celestialBody.size * 0.6}px`,
                            color: 'white',
                            textShadow: '0 0 3px rgba(0,0,0,0.8)',
                            transform: `translateX(-50%)`,
                            transformOrigin: `50% ${celestialBody.radius}px`
                          }}
                          animate={{
                            rotate: isAnimating ? [celestialBody.angle, celestialBody.angle + 360] : celestialBody.angle,
                          }}
                          transition={{
                            rotate: {
                              duration: 20 / celestialBody.speed, // Orbital period
                              repeat: Infinity,
                              ease: "linear"
                            }
                          }}
                          title={celestialBody.name}
                        >
                          {celestialBody.emoji}
                        </motion.div>
                      </div>
                    ));
                  })()}
                </AnimatePresence>

                {/* Orbital paths for celestial bodies */}
                {(() => {
                  const orbitalSystems: { [key: number]: number[] } = {
                    0: [], // Personal: No orbital paths (just Earth)
                    1: [90], // Planetary: Moon around Earth
                    2: [80, 100, 120, 145], // Solar: Mercury, Venus, Earth, Mars orbits
                    3: [85, 110, 135], // Galactic: Star orbits around black hole
                    4: [90, 120] // Intergalactic: Galaxy orbits
                  };

                  const currentOrbits = orbitalSystems[scaleValue] || [];
                  
                  return currentOrbits.map((radius: number, index: number) => (
                    <div
                      key={`orbit-${scaleValue}-${index}`}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/25 rounded-full"
                      style={{
                        width: `${radius * 2}px`,
                        height: `${radius * 2}px`,
                        borderStyle: 'dashed',
                        borderWidth: '1px'
                      }}
                    />
                  ));
                })()}

                {/* Gravity field effect */}
                <AnimatePresence>
                  {showGravityWaves && (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full"
                          style={{
                            borderColor: currentScale.color,
                            borderWidth: '1px',
                          }}
                          initial={{ width: 0, height: 0, opacity: 0.8 }}
                          animate={{ 
                            width: 150 + i * 60, 
                            height: 150 + i * 60, 
                            opacity: 0 
                          }}
                          transition={{
                            duration: 2.5,
                            delay: i * 0.4,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>



                {/* Object labels */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg border border-white/20">
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2" style={{backgroundColor: currentScale.color, borderColor: `${currentScale.color}66`}}></div>
                      <span>{scaleValue === 0 ? '🌍 Earth' : scaleValue === 1 ? '🌍 Earth' : scaleValue === 2 ? '☀️ Sun' : scaleValue === 3 ? '🕳️ Black Hole' : '🌌 Cluster Center'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 border border-red-300"></div>
                      <span>{scaleValue === 0 ? '🌍 Zoomed Earth' : scaleValue === 1 ? '🌙 Moon' : scaleValue === 2 ? '🌍 Planets' : scaleValue === 3 ? '⭐ Stars' : '🌌 Galaxies'}</span>
                    </div>
                    <div className="text-xs opacity-75 mt-2 border-t border-white/20 pt-1">
                      {scaleValue === 0 && 'Close-up view of Earth showing personal scale'}
                      {scaleValue === 1 && 'Moon orbits Earth due to gravity'}
                      {scaleValue === 2 && 'Planets orbit the Sun in our solar system'}
                      {scaleValue === 3 && 'Stars orbit around the galactic black hole'}
                      {scaleValue === 4 && 'Galaxies cluster due to dark matter gravity'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Scale Slider */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Personal</span>
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Cosmic</span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={scaleValue}
                  onChange={(e) => handleScaleChange(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, ${currentScale.color} 0%, ${currentScale.color} ${(scaleValue / 4) * 100}%, #e5e7eb ${(scaleValue / 4) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                
                <div className="flex justify-between mt-2 text-xs">
                  {scales.map((scale, index) => (
                    <span
                      key={scale.id}
                      className={`text-center ${index === scaleValue ? 'font-bold' : 'text-gray-400'}`}
                      style={{
                        color: index === scaleValue ? currentScale.color : undefined,
                        fontSize: '10px'
                      }}
                    >
                                            {scale.id.charAt(0).toUpperCase()}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        </div>
          
          {/* Right column - Scale Details and Properties */}
          <div className="space-y-6">
            {/* Current Scale Info */}
            <motion.div 
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6"
              key={currentScale.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {currentScale.title}
              </h4>
              
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description:
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    {currentScale.description}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Distance Scale:
                  </div>
                  <div className="text-lg text-blue-600 dark:text-blue-400 font-mono">
                    {currentScale.distance}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gravitational Effect:
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    {currentScale.effect}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <InlineMath math="|F_g|" /> (Force Magnitude):
                  </div>
                  <div className="text-lg text-blue-600 dark:text-blue-400 font-mono">
                    {currentScale.forceStrength}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Universal Properties */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Universal Properties of Gravity
              </h4>
              
              <div className="space-y-3">
                {[
                  { title: "Universal Reach", desc: "Extends across all scales of the universe" },
                  { title: "Always Attractive", desc: "Gravity always pulls, never pushes" },
                  { title: "No Shielding", desc: "Cannot be blocked by any material" },
                  { title: "Universal Interaction", desc: "Every particle attracts every other particle" }
                ].map((property, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                    <div>
                      <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
                        {property.title}
                      </div>
                      <div className="text-lg text-gray-600 dark:text-gray-400">
                        {property.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
           
            {/* Quick Check Quiz */}
             <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
               <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                 Quick Check
               </h4>
               
               <div className="space-y-4">
                 <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                   How many times larger is the Milky Way scale compared to the Moon-Earth system?
                 </p>
                 
                 <div className="space-y-2">
                   {[
                     { id: 'A', text: 'About 1,000 times larger' },
                     { id: 'B', text: 'About 1,000,000 times larger' },
                     { id: 'C', text: 'About 650,000,000 times larger' },
                     { id: 'D', text: 'About 1,000,000,000,000 times larger' }
                   ].map((option) => (
                     <motion.button
                       key={option.id}
                       className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-lg ${
                         selectedAnswer === option.id
                           ? selectedAnswer === 'C'
                             ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300'
                             : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300'
                           : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                       }`}
                       onClick={() => handleQuizAnswer(option.id)}
                       disabled={selectedAnswer !== null}
                       whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                       whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                     >
                       <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">
                         {option.id}.
                       </span>
                       {option.text}
                     </motion.button>
                   ))}
                 </div>

                 {showQuizFeedback && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`p-4 rounded-lg text-lg ${
                       selectedAnswer === 'C'
                         ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                         : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                     }`}
                   >
                     {selectedAnswer === 'C' ? (
                       <div>
                         <div className="font-bold mb-2">🎉 Correct!</div>
                         <div>
                           Moon-Earth distance: ~384,000 km<br/>
                           Our distance from galactic center: ~26,000 light-years (~2.5×10¹⁷ km)<br/>
                           Ratio: approximately 650 million times larger!
                         </div>
                       </div>
                     ) : (
                       <div>
                         <div className="font-bold mb-2">❌ Not quite right</div>
                         <div>
                           The correct answer is C. The Milky Way scale is about 650 million times larger than the Moon-Earth system. 
                           This shows the incredible range of gravitational effects across the universe!
                         </div>
                       </div>
                     )}
                   </motion.div>
                 )}
               </div>
             </div>
           </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 