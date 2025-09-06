import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import * as THREE from 'three';

// 3D Components for field visualization
function CentralMass() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#DC2626" emissive="#7F1D1D" emissiveIntensity={0.3} />
    </mesh>
  );
}

function FieldLine({ 
  direction, 
  length, 
  color = "#EF4444" 
}: { 
  direction: [number, number, number]; 
  length: number; 
  color?: string; 
}) {
  const points = [];
  const [x, y, z] = direction;
  const magnitude = Math.sqrt(x * x + y * y + z * z);
  const normalizedX = x / magnitude;
  const normalizedY = y / magnitude;
  const normalizedZ = z / magnitude;

  // Create points along the field line with decreasing density
  for (let i = 1; i <= length; i++) {
    const distance = i * 0.5;
    points.push(new THREE.Vector3(
      normalizedX * distance,
      normalizedY * distance,
      normalizedZ * distance
    ));
  }

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.8}
    />
  );
}

function DensitySphere({ 
  radius, 
  showSphere, 
  label 
}: { 
  radius: number; 
  showSphere: boolean; 
  label: string; 
}) {
  if (!showSphere) return null;

  return (
    <group>
      <Sphere args={[radius, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#3B82F6" 
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide}
          wireframe
        />
      </Sphere>
      <Text
        position={[0, radius + 0.5, 0]}
        fontSize={0.3}
        color="#3B82F6"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function RadialFieldLines({ density }: { density: number }) {
  const fieldLines: JSX.Element[] = [];
  
  // Use Fibonacci spiral for uniform distribution
  const generateFibonacciSphere = (n: number) => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const points = [];
    
    for (let i = 0; i < n; i++) {
      const y = 1 - (2 * (i + 0.5)) / n; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      
      const theta = (2 * Math.PI * i) / goldenRatio;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      points.push([x, y, z]);
    }
    
    return points;
  };

  // Generate field line points based on density
  const basePoints = 72; // Optimal number for uniform distribution
  const numLines = Math.floor(basePoints * (density / 4)); // Scale with density
  const maxRadius = 12; // Extend to beyond r3 = 6

  const spherePoints = generateFibonacciSphere(numLines);

  spherePoints.forEach((point, index) => {
    const [x, y, z] = point;

    fieldLines.push(
      <FieldLine
        key={index}
        direction={[x, y, z]}
        length={maxRadius}
        color="#EF4444"
      />
    );
  });

  return <>{fieldLines}</>;
}

function Scene3D({ 
  showDensitySpheres, 
  fieldDensity, 
  selectedRadius 
}: { 
  showDensitySpheres: boolean; 
  fieldDensity: number; 
  selectedRadius: number;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Central Mass */}
      <CentralMass />

      {/* Field Lines */}
      <RadialFieldLines density={fieldDensity} />

      {/* Density Comparison Spheres */}
      <DensitySphere 
        radius={2} 
        showSphere={showDensitySpheres && (selectedRadius === 1 || selectedRadius === 0)} 
        label="r1 = 2" 
      />
      <DensitySphere 
        radius={4} 
        showSphere={showDensitySpheres && (selectedRadius === 2 || selectedRadius === 0)} 
        label="r2 = 4" 
      />
      <DensitySphere 
        radius={6} 
        showSphere={showDensitySpheres && (selectedRadius === 3 || selectedRadius === 0)} 
        label="r3 = 6" 
      />

      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={1}
      />
    </>
  );
}

export default function GravitationalNatureSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedConcept, setSelectedConcept] = useState<string>('always-attractive');
  const { isDarkMode } = useThemeContext();
  
  // Fixed values
  const showDensitySpheres = true;
  const fieldDensity = 6; // Fixed at level 3 for good visibility
  const selectedRadius = 0; // Always show all spheres
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'gravitational-nature-concept',
      conceptId: 'gravitational-nature',
      conceptName: 'Nature of Gravitational Force',
      type: 'learning',
      description: 'Understanding the fundamental properties of gravitational force'
    },
    {
      id: 'gravitational-field-concept',
      conceptId: 'gravitational-field',
      conceptName: 'Gravitational Field Introduction',
      type: 'learning',
      description: 'Introduction to gravitational field and field lines'
    },
    {
      id: 'field-density-concept',
      conceptId: 'field-density',
      conceptName: 'Field Line Density Analysis',
      type: 'learning',
      description: 'Understanding how field line density relates to field strength'
    },
    {
      id: 'mass-equivalence-concept',
      conceptId: 'mass-equivalence',
      conceptName: 'Gravitational vs Inertial Mass',
      type: 'learning',
      description: 'Understanding the equivalence of gravitational and inertial mass'
    }
  ];

  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Gravitational nature concepts (without emojis)
  const gravitationalConcepts = [
    {
      id: 'always-attractive',
      title: 'Always Attractive',
      description: 'Gravitational force is ALWAYS attractive - masses can only pull, never push',
      details: [
        'Unlike electric forces that can attract or repel',
        'There is no negative mass in our universe',
        'All matter creates attractive gravitational fields',
        'This leads to clumping of matter in the universe'
      ]
    },
    {
      id: 'mass-proportional',
      title: 'Mass Proportional',
      description: 'Force is directly proportional to both masses involved',
      details: [
        'Double the mass → double the force',
        'F ∝ m₁ × m₂ (product of both masses)',
        'Larger objects create stronger gravitational fields',
        'Even tiny masses contribute to the total force'
      ]
    },
    {
      id: 'distance-inverse-square',
      title: 'Inverse Square Law',
      description: 'Force decreases as 1/r² with increasing distance',
      details: [
        'Double the distance → 1/4 the force',
        'F ∝ 1/r² (inverse square relationship)',
        'Force drops off very rapidly with distance',
        'This is why planets orbit the Sun, not other stars'
      ]
    },
    {
      id: 'mass-equivalence',
      title: 'Mass Equivalence',
      description: 'Gravitational mass equals inertial mass (equivalence principle)',
      details: [
        'Gravitational mass: how strongly you attract others',
        'Inertial mass: resistance to acceleration (F = ma)',
        'These are exactly equal (tested to 1 part in 10¹³)',
        'This leads to the principle of general relativity'
      ]
    }
  ];

  // Handle concept selection
  const handleConceptSelect = (conceptId: string) => {
    setSelectedConcept(conceptId);
    
    const response: InteractionResponse = {
      interactionId: 'gravitational-nature-concept',
      value: conceptId,
      timestamp: Date.now(),
      conceptId: 'gravitational-nature',
      conceptName: 'Nature of Gravitational Force',
      conceptDescription: `User explored concept: ${conceptId}`
    };
    handleInteractionComplete(response);
  };



  return (
    <SlideComponentWrapper
      slideId="gravitational-nature"
      slideTitle="Nature of Gravitational Force"
      moduleId="gravitation-0001"
      submoduleId="newtons-law-of-gravitation"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          
          {/* Left column - Gravitational Nature */}
          <div className="space-y-6">
            {/* Core Properties */}
            <TrackedInteraction 
              interaction={slideInteractions[0]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Fundamental Properties of Gravity
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {gravitationalConcepts.map((concept) => (
                    <motion.button
                      key={concept.id}
                      className={`p-4 rounded-lg text-left transition-all duration-300 ${
                        selectedConcept === concept.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleConceptSelect(concept.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-lg">{concept.title}</div>
                      <div className="text-sm opacity-90">{concept.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </TrackedInteraction>

            {/* Selected Concept Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedConcept}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800"
              >
                {(() => {
                  const concept = gravitationalConcepts.find(c => c.id === selectedConcept);
                  if (!concept) return null;
                  
                  return (
                    <>
                      <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                        {concept.title}
                      </h4>
                      
                      <div className="space-y-3">
                        {concept.details.map((detail, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700 dark:text-gray-300 text-lg">{detail}</p>
                          </div>
                        ))}
                      </div>

                      {concept.id === 'mass-equivalence' && (
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <p className="text-lg text-gray-700 dark:text-gray-300">
                            <strong>Einstein's Insight:</strong> This equivalence led to the realization that gravity is not a force, 
                            but the curvature of spacetime itself!
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Mathematical Expression */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                The Universal Law
              </h4>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-center mb-3">
                  <BlockMath math="F = G \frac{m_1 m_2}{r^2}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 text-center">
                  Every particle attracts every other particle
                </div>
              </div>

              <div className="mt-4 space-y-2 text-lg">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Proportional to:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">m₁ × m₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Inversely proportional to:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">r²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Direction:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Always attractive</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - 3D Field Visualization */}
          <div className="space-y-6">
            {/* Field Theory */}
            <TrackedInteraction 
              interaction={slideInteractions[1]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Gravitational Field
                </h3>
                
                <div className="space-y-4 text-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    A <strong>gravitational field</strong> is the region of space around a mass where other masses experience a gravitational force.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Field Lines Represent:</h5>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• <strong>Direction:</strong> Force direction on test mass</li>
                      <li>• <strong>Strength:</strong> Line density ∝ field strength</li>
                      <li>• <strong>Pattern:</strong> Radial inward (attractive)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TrackedInteraction>

            {/* 3D Visualization */}
            <TrackedInteraction 
              interaction={slideInteractions[2]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  3D Radial Field Lines
                </h4>
                
                

                {/* 3D Canvas */}
                <div className="h-96 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <Canvas
                    camera={{ position: [10, 10, 10], fov: 50 }}
                    style={{ background: isDarkMode ? '#0F172A' : '#F8FAFC' }}
                  >
                    <Scene3D 
                      showDensitySpheres={showDensitySpheres}
                      fieldDensity={fieldDensity}
                      selectedRadius={selectedRadius}
                    />
                  </Canvas>
                </div>

                <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h5 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Field Line Density Analysis:</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Compare the number of field lines passing through spheres of different radii. 
                    For radius doubling (<InlineMath math="r_1 \to r_2" />), the surface area increases by <InlineMath math="4 \times" />, so field line density decreases by <InlineMath math="1/4" />, 
                    demonstrating the <InlineMath math="1/r^2" /> law. The line density also represents the magnitude of gravitational force.
                  </p>
                </div>
              </div>
            </TrackedInteraction>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 