import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function GravitationalForceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const { isDarkMode } = useThemeContext();
  
  const [selectedPlanet, setSelectedPlanet] = useState<string>('earth');
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [dropPosition, setDropPosition] = useState<number>(50);
  
  const slideInteractions: Interaction[] = [
    {
      id: 'gravitational-force-concept',
      conceptId: 'gravitational-force-understanding',
      conceptName: 'Gravitational Force Concept',
      type: 'learning',
      description: 'Understanding gravitational force and weight'
    },
    {
      id: 'planet-gravity-comparison',
      conceptId: 'planet-gravity-comparison',
      conceptName: 'Planet Gravity Comparison',
      type: 'learning',
      description: 'Comparing gravity on different planets'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const planets = [
    {
      id: 'earth',
      name: 'Earth',
      gravity: 1.0,
      color: '#4F46E5',
      description: 'Standard gravity (9.8 m/s²)'
    },
    {
      id: 'moon',
      name: 'Moon',
      gravity: 0.166,
      color: '#64748B',
      description: '1/6th of Earth\'s gravity'
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      gravity: 2.36,
      color: '#DC2626',
      description: '2.4x stronger than Earth'
    },
    {
      id: 'mars',
      name: 'Mars',
      gravity: 0.38,
      color: '#EA580C',
      description: '38% of Earth\'s gravity'
    }
  ];

  const selectedPlanetData = planets.find(p => p.id === selectedPlanet) || planets[0];

  const handlePlanetSelect = (planetId: string) => {
    setSelectedPlanet(planetId);
    setDropPosition(50);
    setIsDropping(false);
    
    const response: InteractionResponse = {
      interactionId: 'planet-gravity-comparison',
      value: `planet_${planetId}`,
      timestamp: Date.now(),
      conceptId: 'planet-gravity-comparison',
      conceptName: 'Planet Gravity Comparison',
      conceptDescription: `User selected ${planetId} for gravity comparison`
    };
    
    handleInteractionComplete(response);
  };

  const handleDrop = () => {
    if (isDropping) return;
    
    setIsDropping(true);
    setDropPosition(50);
    
    const animationDuration = Math.max(500, 2000 / selectedPlanetData.gravity);
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      const easeInQuart = (t: number) => t * t * t * t;
      const position = 50 + (350 * easeInQuart(progress));
      
      setDropPosition(position);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsDropping(false);
          setDropPosition(50);
        }, 500);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const GravitationalFieldDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = isDarkMode ? '#0F172A' : '#F8FAFC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = 200;
      const centerY = 200;
      const planetRadius = 40;

      ctx.fillStyle = selectedPlanetData.color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = isDarkMode ? '#374151' : '#6B7280';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedPlanetData.name, centerX, centerY);

      for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const startRadius = planetRadius + 10;
        const endRadius = startRadius + 30;
        
        const startX = centerX + startRadius * Math.cos(angle);
        const startY = centerY + startRadius * Math.sin(angle);
        const endX = centerX + endRadius * Math.cos(angle);
        const endY = centerY + endRadius * Math.sin(angle);

        ctx.strokeStyle = selectedPlanetData.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.7;
        
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(startX, startY);
        ctx.stroke();

        const arrowLength = 8;
        const arrowAngle = Math.PI / 6;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(
          startX + arrowLength * Math.cos(angle + Math.PI + arrowAngle),
          startY + arrowLength * Math.sin(angle + Math.PI + arrowAngle)
        );
        ctx.moveTo(startX, startY);
        ctx.lineTo(
          startX + arrowLength * Math.cos(angle + Math.PI - arrowAngle),
          startY + arrowLength * Math.sin(angle + Math.PI - arrowAngle)
        );
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    }, [selectedPlanetData, isDarkMode]);

    useEffect(() => {
      draw();
    }, [draw]);

    return (
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="rounded-lg border border-gray-300 dark:border-gray-600"
        style={{ 
          background: isDarkMode ? '#0F172A' : '#F8FAFC',
          width: '400px',
          height: '400px'
        }}
      />
    );
  };

  const slideContent = (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              
              <div className="space-y-4 text-lg">
                <p className="leading-relaxed">
                  <span className="text-red-600 dark:text-red-300 font-medium">The Earth pulls everything toward its center.</span> This invisible force is always acting on every object around us.
                </p>

                <div className={`rounded-lg p-4 ${
                  isDarkMode 
                    ? 'bg-slate-700' 
                    : 'bg-gray-100'
                }`}>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Key Facts:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Objects fall downward when dropped</li>
                    <li>• This pull gives objects their <strong>weight</strong></li>
                    <li>• <strong>Weight = Gravitational Force</strong> acting on a body</li>
                    <li>• Gravity is different on each planet</li>
                  </ul>
                </div>

                <div className={`rounded-lg p-4 border-l-4 border-red-500 ${
                  isDarkMode 
                    ? 'bg-red-950/50' 
                    : 'bg-red-100/50'
                }`}>
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Amazing Facts</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• On the Moon, gravity is <strong>1/6th</strong> of Earth's</li>
                    <li>• Astronauts can jump so high on the Moon!</li>
                    <li>• On Jupiter, gravity is much <strong>stronger</strong> than Earth</li>
                    <li>• Your weight changes on different planets!</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        
        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h4 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">
                Gravity on Different Planets
              </h4>
              
              <div className="mb-4">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Select a planet:</p>
                <div className="grid grid-cols-2 gap-3">
                  {planets.map((planet) => (
                    <motion.button
                      key={planet.id}
                      onClick={() => handlePlanetSelect(planet.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedPlanet === planet.id
                          ? 'border-2 text-white'
                          : isDarkMode
                            ? 'border border-slate-600 bg-slate-700 hover:bg-slate-600 text-gray-300'
                            : 'border border-slate-300 bg-slate-50 hover:bg-slate-100 text-gray-700'
                      }`}
                      style={selectedPlanet === planet.id ? { 
                        borderColor: planet.color, 
                        backgroundColor: planet.color 
                      } : {}}
                    >
                      <div className="font-medium">{planet.name}</div>
                      <div className="text-xs opacity-80">{planet.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className={`rounded-lg p-4 ${
                isDarkMode 
                  ? 'bg-slate-900' 
                  : 'bg-gray-50'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-medium">Drop Test</h5>
                  <motion.button
                    onClick={handleDrop}
                    disabled={isDropping}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isDropping
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isDropping ? 'Dropping...' : 'Drop Ball'}
                  </motion.button>
                </div>

                <div className="relative h-96 bg-gradient-to-b from-blue-200 to-blue-300 dark:from-blue-900 dark:to-blue-800 rounded-lg overflow-hidden">
                  <motion.div
                    className="absolute w-8 h-8 bg-red-500 rounded-full left-1/2 transform -translate-x-1/2"
                    style={{ top: `${dropPosition}px` }}
                    animate={{ 
                      rotate: isDropping ? 360 : 0,
                    }}
                    transition={{ 
                      rotate: { 
                        repeat: isDropping ? Infinity : 0, 
                        duration: 0.5, 
                        ease: "linear" 
                      }
                    }}
                  />
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className={`px-3 py-2 rounded-lg ${
                      isDarkMode ? 'bg-slate-800' : 'bg-white'
                    }`}>
                      <p className="text-sm font-medium" style={{ color: selectedPlanetData.color }}>
                        {selectedPlanetData.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Gravity: {selectedPlanetData.gravity}x Earth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="gravitational-force"
      slideTitle="Gravitational Force"
      moduleId="6-icse-physics-force"
      submoduleId="types-of-forces"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}