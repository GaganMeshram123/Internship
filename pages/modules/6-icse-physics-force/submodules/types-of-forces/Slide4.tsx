import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function ElectrostaticForceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const { isDarkMode } = useThemeContext();
  
  const [selectedDemo, setSelectedDemo] = useState<string>('balloon');
  const [isRubbing, setIsRubbing] = useState<boolean>(false);
  const [showForce, setShowForce] = useState<boolean>(false);
  const [chargeConfiguration, setChargeConfiguration] = useState<string>('attract');
  
  const slideInteractions: Interaction[] = [
    {
      id: 'electrostatic-force-concept',
      conceptId: 'electrostatic-force-understanding',
      conceptName: 'Electrostatic Force Concept',
      type: 'learning',
      description: 'Understanding electrostatic force and charging'
    },
    {
      id: 'charging-demo',
      conceptId: 'charging-demonstration',
      conceptName: 'Charging Demonstration',
      type: 'learning',
      description: 'Demonstrating how objects become charged'
    },
    {
      id: 'charge-interaction',
      conceptId: 'charge-interaction',
      conceptName: 'Charge Interaction',
      type: 'learning',
      description: 'Understanding how charges interact'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const chargingDemos = [
    {
      id: 'balloon',
      name: 'Balloon & Hair',
      object1: 'Balloon',
      object2: 'Hair',
      result: 'Hair sticks to balloon',
      color1: '#EF4444',
      color2: '#92400E'
    },
    {
      id: 'comb',
      name: 'Comb & Paper',
      object1: 'Comb',
      object2: 'Paper',
      result: 'Paper pieces jump to comb',
      color1: '#3B82F6',
      color2: '#F3F4F6'
    },
    {
      id: 'socks',
      name: 'Socks & Carpet',
      object1: 'Socks',
      object2: 'Carpet',
      result: 'Static shock when touched',
      color1: '#10B981',
      color2: '#7C2D12'
    }
  ];

  const selectedDemoData = chargingDemos.find(d => d.id === selectedDemo) || chargingDemos[0];

  const handleDemoSelect = (demoId: string) => {
    setSelectedDemo(demoId);
    setIsRubbing(false);
    setShowForce(false);
    
    const response: InteractionResponse = {
      interactionId: 'charging-demo',
      value: `demo_${demoId}`,
      timestamp: Date.now(),
      conceptId: 'charging-demonstration',
      conceptName: 'Charging Demonstration',
      conceptDescription: `User selected ${demoId} charging demonstration`
    };
    
    handleInteractionComplete(response);
  };

  const startRubbing = () => {
    if (isRubbing) return;
    
    setIsRubbing(true);
    setShowForce(false);
    
    setTimeout(() => {
      setIsRubbing(false);
      setShowForce(true);
    }, 2000);
  };

  const ElectricFieldDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = isDarkMode ? '#0F172A' : '#F8FAFC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const posX = 150;
      const posY = 150;
      const negX = 250;
      const negY = 150;

      const charges = [
        { x: posX, y: posY, charge: 1 },
        { x: negX, y: negY, charge: -1 }
      ];

      for (let i = 0; i < 16; i++) {
        const angle = (i * 22.5) * Math.PI / 180;
        const startRadius = 25;
        const startX = posX + startRadius * Math.cos(angle);
        const startY = posY + startRadius * Math.sin(angle);
        
        let x = startX, y = startY;
        const points = [{ x, y }];
        
        for (let j = 0; j < 100; j++) {
          let Ex = 0, Ey = 0;
          
          charges.forEach(charge => {
            const dx = x - charge.x;
            const dy = y - charge.y;
            const r = Math.sqrt(dx * dx + dy * dy);
            if (r > 5) {
              const E = (charge.charge) / (r * r * r);
              Ex += E * dx;
              Ey += E * dy;
            }
          });
          
          const magnitude = Math.sqrt(Ex * Ex + Ey * Ey);
          if (magnitude < 0.001) break;
          
          const normalizedX = Ex / magnitude;
          const normalizedY = Ey / magnitude;
          
          x += normalizedX * 2;
          y += normalizedY * 2;
          
          if (x < 0 || x > 400 || y < 0 || y > 300) break;
          
          const distToNeg = Math.sqrt((x - negX) * (x - negX) + (y - negY) * (y - negY));
          if (distToNeg < 20) break;
          
          points.push({ x, y });
        }
        
        if (points.length > 3) {
          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.8;
          
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          points.forEach(point => ctx.lineTo(point.x, point.y));
          ctx.stroke();
          
          if (points.length > 10) {
            const arrowIndex = Math.floor(points.length * 0.6);
            const point = points[arrowIndex];
            const nextPoint = points[arrowIndex + 1];
            
            if (nextPoint) {
              const dx = nextPoint.x - point.x;
              const dy = nextPoint.y - point.y;
              const angle = Math.atan2(dy, dx);
              
              ctx.save();
              ctx.translate(point.x, point.y);
              ctx.rotate(angle);
              ctx.fillStyle = '#10B981';
              ctx.globalAlpha = 1;
              
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(-8, -3);
              ctx.lineTo(-8, 3);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.arc(posX, posY, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#B91C1C';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', posX, posY);

      ctx.fillStyle = '#1E40AF';
      ctx.beginPath();
      ctx.arc(negX, negY, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.fillStyle = 'white';
      ctx.fillText('−', negX, negY);
    }, [isDarkMode]);

    useEffect(() => {
      draw();
    }, [draw]);

    return (
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="rounded-lg border border-gray-300 dark:border-gray-600"
        style={{ 
          background: isDarkMode ? '#0F172A' : '#F8FAFC',
          width: '400px',
          height: '300px'
        }}
      />
    );
  };

  const ChargeInteractionDemo = () => {
    const configurations = [
      {
        id: 'attract',
        name: 'Unlike Charges (+,-)',
        type: 'attraction',
        description: 'Unlike charges attract each other',
        color: '#10B981'
      },
      {
        id: 'repel-positive',
        name: 'Like Charges (+,+)',
        type: 'repulsion',
        description: 'Like charges repel each other',
        color: '#EF4444'
      },
      {
        id: 'repel-negative',
        name: 'Like Charges (-,-)',
        type: 'repulsion',
        description: 'Like charges repel each other',
        color: '#EF4444'
      }
    ];

    const selectedConfig = configurations.find(c => c.id === chargeConfiguration) || configurations[0];

    const handleConfigSelect = (configId: string) => {
      setChargeConfiguration(configId);
      
      const response: InteractionResponse = {
        interactionId: 'charge-interaction',
        value: `config_${configId}`,
        timestamp: Date.now(),
        conceptId: 'charge-interaction',
        conceptName: 'Charge Interaction',
        conceptDescription: `User selected ${configId} charge configuration`
      };
      
      handleInteractionComplete(response);
    };

    return (
      <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3">
          Charge Interactions
        </h5>
        
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-3">
            {configurations.map((config) => (
              <motion.button
                key={config.id}
                onClick={() => handleConfigSelect(config.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg text-left transition-all ${
                  chargeConfiguration === config.id
                    ? 'border-2 text-white'
                    : isDarkMode
                      ? 'border border-slate-600 bg-slate-700 hover:bg-slate-600 text-gray-300'
                      : 'border border-slate-300 bg-slate-50 hover:bg-slate-100 text-gray-700'
                }`}
                style={chargeConfiguration === config.id ? { 
                  borderColor: config.color, 
                  backgroundColor: config.color 
                } : {}}
              >
                <div className="font-medium">{config.name}</div>
                <div className="text-xs opacity-80">{config.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} flex justify-center items-center h-32`}>
          <div className="flex items-center space-x-8">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                chargeConfiguration === 'repel-negative' ? 'bg-blue-600' : 'bg-red-600'
              }`}>
                {chargeConfiguration === 'repel-negative' ? '−' : '+'}
              </div>
            </div>
            
            <div className="flex-1 flex justify-center items-center">
              {selectedConfig.type === 'attraction' ? (
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-2xl"
                    style={{ color: selectedConfig.color }}
                  >
                    ←
                  </motion.div>
                  <span className="text-sm font-medium" style={{ color: selectedConfig.color }}>
                    ATTRACT
                  </span>
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-2xl"
                    style={{ color: selectedConfig.color }}
                  >
                    →
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-2xl"
                    style={{ color: selectedConfig.color }}
                  >
                    ←
                  </motion.div>
                  <span className="text-sm font-medium" style={{ color: selectedConfig.color }}>
                    REPEL
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-2xl"
                    style={{ color: selectedConfig.color }}
                  >
                    →
                  </motion.div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                chargeConfiguration === 'attract' ? 'bg-blue-600' : 
                (chargeConfiguration === 'repel-negative' ? 'bg-blue-600' : 'bg-red-600')
              }`}>
                {chargeConfiguration === 'attract' ? '−' : 
                 (chargeConfiguration === 'repel-negative' ? '−' : '+')}
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  When certain materials are <span className="text-green-600 dark:text-green-300 font-medium">rubbed together</span>, they gain or lose electric charges.
                </p>

                <div className={`rounded-lg p-4 ${
                  isDarkMode 
                    ? 'bg-slate-700' 
                    : 'bg-gray-100'
                }`}>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">What Happens:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Objects become <strong>electrically charged</strong></li>
                    <li>• One becomes <strong>positively charged</strong> (+)</li>
                    <li>• The other becomes <strong>negatively charged</strong> (−)</li>
                    <li>• Charges then attract or repel each other</li>
                  </ul>
                </div>

                <div className={`rounded-lg p-4 border-l-4 border-green-500 ${
                  isDarkMode 
                    ? 'bg-green-950/50' 
                    : 'bg-green-100/50'
                }`}>
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">The Rule</h4>
                  <div className="text-gray-700 dark:text-gray-300 space-y-2">
                    <p><span className="text-red-600 font-medium">Like charges repel:</span> + pushes +, − pushes −</p>
                    <p><span className="text-green-600 font-medium">Unlike charges attract:</span> + pulls −, − pulls +</p>
                  </div>
                </div>

                <div className={`rounded-lg p-4 ${
                  isDarkMode 
                    ? 'bg-slate-700' 
                    : 'bg-yellow-100'
                }`}>
                  <h4 className="font-medium text-yellow-600 dark:text-yellow-400 mb-2">Common Examples:</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Balloon sticking to hair after rubbing</li>
                    <li>• Paper pieces jumping to a plastic comb</li>
                    <li>• Static shock from socks on carpet</li>
                    <li>• Clothes sticking together from dryer</li>
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
                Charging Demonstrations
              </h4>
              
              <div className="mb-4">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Choose a demo:</p>
                <div className="grid grid-cols-1 gap-3">
                  {chargingDemos.map((demo) => (
                    <motion.button
                      key={demo.id}
                      onClick={() => handleDemoSelect(demo.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedDemo === demo.id
                          ? 'border-2 border-green-500 bg-green-500 text-white'
                          : isDarkMode
                            ? 'border border-slate-600 bg-slate-700 hover:bg-slate-600 text-gray-300'
                            : 'border border-slate-300 bg-slate-50 hover:bg-slate-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{demo.name}</div>
                      <div className="text-xs opacity-80">{demo.result}</div>
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
                  <h5 className="text-lg font-medium">Rubbing Demo</h5>
                  <motion.button
                    onClick={startRubbing}
                    disabled={isRubbing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isRubbing
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isRubbing ? 'Rubbing...' : 'Start Rubbing'}
                  </motion.button>
                </div>

                <div className="flex justify-center items-center h-32 space-x-8">
                  <motion.div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: selectedDemoData.color1 }}
                    animate={isRubbing ? {
                      x: [0, 10, -10, 0],
                      rotate: [0, 5, -5, 0]
                    } : showForce ? {
                      x: [0, -5, 0]
                    } : {}}
                    transition={{ 
                      duration: isRubbing ? 0.3 : 1,
                      repeat: isRubbing ? Infinity : showForce ? Infinity : 0
                    }}
                  >
                    {selectedDemoData.object1}
                  </motion.div>
                  
                  <motion.div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-black font-bold"
                    style={{ backgroundColor: selectedDemoData.color2 }}
                    animate={isRubbing ? {
                      x: [0, -10, 10, 0],
                      rotate: [0, -5, 5, 0]
                    } : showForce ? {
                      x: [0, 5, 0]
                    } : {}}
                    transition={{ 
                      duration: isRubbing ? 0.3 : 1,
                      repeat: isRubbing ? Infinity : showForce ? Infinity : 0
                    }}
                  >
                    {selectedDemoData.object2}
                  </motion.div>
                </div>

                {showForce && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-center"
                  >
                    <p className="font-medium">
                      ✨ {selectedDemoData.result}
                    </p>
                    <p className="text-sm mt-1">
                      Objects are now electrically charged!
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </TrackedInteraction>

          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <ChargeInteractionDemo />
          </TrackedInteraction>

          <div className={`rounded-lg p-4 ${
            isDarkMode 
              ? 'bg-slate-800' 
              : 'bg-white'
          }`}>
            <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3">
              Electric Field Pattern
            </h5>
            <div className="flex justify-center">
              <ElectricFieldDemo />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Field lines go from positive (+) to negative (−) charge
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="electrostatic-force"
      slideTitle="Electrostatic Force"
      moduleId="6-icse-physics-force"
      submoduleId="types-of-forces"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}