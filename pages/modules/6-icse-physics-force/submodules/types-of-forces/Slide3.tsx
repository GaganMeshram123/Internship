import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function MagneticForceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const { isDarkMode } = useThemeContext();
  
  const [selectedMaterial, setSelectedMaterial] = useState<string>('iron');
  const [magnetPosition, setMagnetPosition] = useState<{ x: number; y: number }>({ x: 100, y: 200 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showAttraction, setShowAttraction] = useState<boolean>(false);
  
  const slideInteractions: Interaction[] = [
    {
      id: 'magnetic-force-concept',
      conceptId: 'magnetic-force-understanding',
      conceptName: 'Magnetic Force Concept',
      type: 'learning',
      description: 'Understanding magnetic force and materials'
    },
    {
      id: 'material-testing',
      conceptId: 'magnetic-material-testing',
      conceptName: 'Material Testing',
      type: 'learning',
      description: 'Testing different materials with magnets'
    },
    {
      id: 'pole-interaction',
      conceptId: 'magnetic-pole-interaction',
      conceptName: 'Pole Interaction',
      type: 'learning',
      description: 'Understanding magnetic pole interactions'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const materials = [
    {
      id: 'iron',
      name: 'Iron',
      isMagnetic: true,
      color: '#6B7280',
      description: 'Strongly attracted to magnets'
    },
    {
      id: 'nickel',
      name: 'Nickel',
      isMagnetic: true,
      color: '#A3A3A3',
      description: 'Attracted to magnets'
    },
    {
      id: 'cobalt',
      name: 'Cobalt',
      isMagnetic: true,
      color: '#3B82F6',
      description: 'Attracted to magnets'
    },
    {
      id: 'wood',
      name: 'Wood',
      isMagnetic: false,
      color: '#92400E',
      description: 'Not attracted to magnets'
    },
    {
      id: 'plastic',
      name: 'Plastic',
      isMagnetic: false,
      color: '#EF4444',
      description: 'Not attracted to magnets'
    },
    {
      id: 'aluminum',
      name: 'Aluminum',
      isMagnetic: false,
      color: '#64748B',
      description: 'Not attracted to magnets'
    }
  ];

  const selectedMaterialData = materials.find(m => m.id === selectedMaterial) || materials[0];

  const handleMaterialSelect = (materialId: string) => {
    setSelectedMaterial(materialId);
    setShowAttraction(false);
    
    const response: InteractionResponse = {
      interactionId: 'material-testing',
      value: `material_${materialId}`,
      timestamp: Date.now(),
      conceptId: 'magnetic-material-testing',
      conceptName: 'Material Testing',
      conceptDescription: `User selected ${materialId} for magnetic testing`
    };
    
    handleInteractionComplete(response);
  };

  const testMaterial = () => {
    setShowAttraction(true);
    setTimeout(() => setShowAttraction(false), 2000);
  };

  const MagneticFieldDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = isDarkMode ? '#0F172A' : '#F8FAFC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const northX = 150;
      const northY = 150;
      const southX = 250;
      const southY = 150;

      const fieldLines = [
        { start: { x: northX, y: northY - 30 }, curve: [
          { x: northX + 20, y: northY - 50 },
          { x: northX + 50, y: northY - 60 },
          { x: northX + 80, y: northY - 50 },
          { x: southX - 20, y: southY - 30 }
        ]},
        { start: { x: northX, y: northY }, curve: [
          { x: northX + 25, y: northY - 10 },
          { x: northX + 50, y: northY - 15 },
          { x: northX + 75, y: northY - 10 },
          { x: southX, y: southY }
        ]},
        { start: { x: northX, y: northY + 30 }, curve: [
          { x: northX + 20, y: northY + 50 },
          { x: northX + 50, y: northY + 60 },
          { x: northX + 80, y: northY + 50 },
          { x: southX - 20, y: southY + 30 }
        ]}
      ];

      fieldLines.forEach(line => {
        ctx.strokeStyle = '#7C3AED';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        
        line.curve.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        
        ctx.stroke();

        const arrowPoint = line.curve[Math.floor(line.curve.length / 2)];
        const nextPoint = line.curve[Math.floor(line.curve.length / 2) + 1];
        
        if (arrowPoint && nextPoint) {
          const dx = nextPoint.x - arrowPoint.x;
          const dy = nextPoint.y - arrowPoint.y;
          const angle = Math.atan2(dy, dx);
          
          ctx.save();
          ctx.translate(arrowPoint.x, arrowPoint.y);
          ctx.rotate(angle);
          ctx.fillStyle = '#7C3AED';
          ctx.globalAlpha = 1;
          
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-8, -3);
          ctx.lineTo(-8, 3);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });

      ctx.globalAlpha = 1;
      
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(northX - 15, northY - 20, 30, 40);
      ctx.strokeStyle = '#B91C1C';
      ctx.lineWidth = 3;
      ctx.strokeRect(northX - 15, northY - 20, 30, 40);
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', northX, northY);

      ctx.fillStyle = '#1E40AF';
      ctx.fillRect(southX - 15, southY - 20, 30, 40);
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 3;
      ctx.strokeRect(southX - 15, southY - 20, 30, 40);
      
      ctx.fillStyle = 'white';
      ctx.fillText('S', southX, southY);
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

  const PoleInteractionDemo = () => {
    const [poleConfiguration, setPoleConfiguration] = useState<string>('attract');
    
    const configurations = [
      {
        id: 'attract',
        name: 'Unlike Poles (N-S)',
        type: 'attraction',
        description: 'Unlike poles attract each other',
        color: '#10B981'
      },
      {
        id: 'repel',
        name: 'Like Poles (N-N)',
        type: 'repulsion',
        description: 'Like poles repel each other',
        color: '#EF4444'
      }
    ];

    const selectedConfig = configurations.find(c => c.id === poleConfiguration) || configurations[0];

    const handleConfigSelect = (configId: string) => {
      setPoleConfiguration(configId);
      
      const response: InteractionResponse = {
        interactionId: 'pole-interaction',
        value: `config_${configId}`,
        timestamp: Date.now(),
        conceptId: 'magnetic-pole-interaction',
        conceptName: 'Pole Interaction',
        conceptDescription: `User selected ${configId} pole configuration`
      };
      
      handleInteractionComplete(response);
    };

    return (
      <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3">
          Magnetic Pole Interactions
        </h5>
        
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            {configurations.map((config) => (
              <motion.button
                key={config.id}
                onClick={() => handleConfigSelect(config.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg text-left transition-all ${
                  poleConfiguration === config.id
                    ? 'border-2 text-white'
                    : isDarkMode
                      ? 'border border-slate-600 bg-slate-700 hover:bg-slate-600 text-gray-300'
                      : 'border border-slate-300 bg-slate-50 hover:bg-slate-100 text-gray-700'
                }`}
                style={poleConfiguration === config.id ? { 
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
              <div className="w-12 h-16 bg-red-600 rounded flex items-center justify-center text-white font-bold">
                N
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
              <div className={`w-12 h-16 rounded flex items-center justify-center text-white font-bold ${
                selectedConfig.type === 'attraction' ? 'bg-blue-600' : 'bg-red-600'
              }`}>
                {selectedConfig.type === 'attraction' ? 'S' : 'N'}
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
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                Magnetic Force
              </h2>
              
              <div className="space-y-4 text-lg">
                <p className="leading-relaxed">
                  <span className="text-purple-600 dark:text-purple-300 font-medium">Only some materials</span> are attracted by magnets. These are called <strong>magnetic materials</strong>.
                </p>

                <div className={`rounded-lg p-4 ${
                  isDarkMode 
                    ? 'bg-slate-700' 
                    : 'bg-gray-100'
                }`}>
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Magnetic Materials:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• <strong>Iron</strong> - Strongly attracted</li>
                    <li>• <strong>Nickel</strong> - Attracted to magnets</li>
                    <li>• <strong>Cobalt</strong> - Attracted to magnets</li>
                  </ul>
                </div>

                <div className={`rounded-lg p-4 ${
                  isDarkMode 
                    ? 'bg-slate-700' 
                    : 'bg-gray-100'
                }`}>
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Non-Magnetic Materials:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Wood, Plastic, Paper, Glass</li>
                    <li>• Aluminum (not attracted)</li>
                    <li>• Most everyday materials</li>
                  </ul>
                </div>

                <div className={`rounded-lg p-4 border-l-4 border-purple-500 ${
                  isDarkMode 
                    ? 'bg-purple-950/50' 
                    : 'bg-purple-100/50'
                }`}>
                  <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Magnetic Poles</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Every magnet has <strong>two poles</strong></li>
                    <li>• <strong>North Pole (N)</strong> and <strong>South Pole (S)</strong></li>
                    <li>• <span className="text-red-600">Like poles repel</span> (N-N or S-S)</li>
                    <li>• <span className="text-green-600">Unlike poles attract</span> (N-S)</li>
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
                Test Magnetic Materials
              </h4>
              
              <div className="mb-4">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Select a material:</p>
                <div className="grid grid-cols-3 gap-2">
                  {materials.map((material) => (
                    <motion.button
                      key={material.id}
                      onClick={() => handleMaterialSelect(material.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-2 rounded-lg text-center transition-all text-sm ${
                        selectedMaterial === material.id
                          ? 'border-2 text-white'
                          : isDarkMode
                            ? 'border border-slate-600 bg-slate-700 hover:bg-slate-600 text-gray-300'
                            : 'border border-slate-300 bg-slate-50 hover:bg-slate-100 text-gray-700'
                      }`}
                      style={selectedMaterial === material.id ? { 
                        borderColor: material.color, 
                        backgroundColor: material.color 
                      } : {}}
                    >
                      <div className="font-medium">{material.name}</div>
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
                  <h5 className="text-lg font-medium">Magnet Test</h5>
                  <motion.button
                    onClick={testMaterial}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all"
                  >
                    Test Material
                  </motion.button>
                </div>

                <div className="flex justify-center items-center h-32 space-x-8">
                  <div className="w-16 h-24 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl">
                    N
                  </div>
                  
                  <motion.div
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: selectedMaterialData.color }}
                    animate={showAttraction && selectedMaterialData.isMagnetic ? {
                      x: [0, -20, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="w-16 h-24 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                </div>

                <div className={`mt-4 p-3 rounded-lg text-center ${
                  selectedMaterialData.isMagnetic
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  <p className="font-medium">
                    {selectedMaterialData.name}: {selectedMaterialData.description}
                  </p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <PoleInteractionDemo />
          </TrackedInteraction>

          <div className={`rounded-lg p-4 ${
            isDarkMode 
              ? 'bg-slate-800' 
              : 'bg-white'
          }`}>
            <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3">
              Magnetic Field Pattern
            </h5>
            <div className="flex justify-center">
              <MagneticFieldDemo />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Field lines loop from North to South pole
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="magnetic-force"
      slideTitle="Magnetic Force"
      moduleId="6-icse-physics-force"
      submoduleId="types-of-forces"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}