import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import * as THREE from 'three';

// 3D Components for basis vectors
function BasisVector({ 
  direction, 
  color, 
  label
}: { 
  direction: [number, number, number]; 
  color: string; 
  label: string;
}) {
  const [x, y, z] = direction;
  const length = 2;
  
  // Calculate rotation for cylinder to align with direction
  const getRotation = (dir: [number, number, number]): [number, number, number] => {
    const [dx, dy, dz] = dir;
    if (dx === 1) return [0, 0, -Math.PI / 2]; // î vector (x-axis)
    if (dy === 1) return [0, 0, 0]; // ĵ vector (y-axis) - default cylinder orientation
    if (dz === 1) return [Math.PI / 2, 0, 0]; // k̂ vector (z-axis)
    return [0, 0, 0];
  };
  
  const rotation = getRotation([x, y, z]);
  
  return (
    <group>
      {/* Arrow shaft */}
      <mesh position={[x * length / 2, y * length / 2, z * length / 2]} rotation={rotation}>
        <cylinderGeometry args={[0.05, 0.05, length, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Arrow head */}
      <mesh position={[x * length, y * length, z * length]} rotation={rotation}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Label */}
      <Text
        position={[x * (length + 0.5), y * (length + 0.5), z * (length + 0.5)]}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Basis vectors - no rotation */}
      <BasisVector direction={[1, 0, 0]} color="#EF4444" label="î" />
      <BasisVector direction={[0, 1, 0]} color="#10B981" label="ĵ" />
      <BasisVector direction={[0, 0, 1]} color="#3B82F6" label="k̂" />

      {/* Grid */}
      <gridHelper args={[6, 6, '#888888', '#cccccc']} />

      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
      />
    </>
  );
}

export default function BasisVectorsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [rotation, setRotation] = useState(0);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'basis-vectors-concept',
      conceptId: 'basis-vectors',
      conceptName: 'Understanding Basis Vectors',
      type: 'learning',
      description: 'Learning how basis vectors work as a coordinate system for representing vectors'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Calculate rotated basis vectors for 2D (SVG coordinates: y increases downward)
  const rotationRad = (rotation * Math.PI) / 180;
  const iVector = [Math.cos(rotationRad), Math.sin(rotationRad)]; // Fixed for SVG y-direction
  const jVector = [-Math.sin(rotationRad), Math.cos(rotationRad)]; // Fixed for SVG y-direction
  
  // Fixed sample vector in space (not rotating with basis)
  const fixedSampleVector = [1.5, 1]; // Flipped y to positive for proper display
  
  // Calculate projections of V onto rotated basis vectors
  const vDotI = fixedSampleVector[0] * iVector[0] + fixedSampleVector[1] * iVector[1];
  const vDotJ = fixedSampleVector[0] * jVector[0] + fixedSampleVector[1] * jVector[1];
  
  // Calculate projection points
  const projectionOnI = [iVector[0] * vDotI, iVector[1] * vDotI];
  const projectionOnJ = [jVector[0] * vDotJ, jVector[1] * vDotJ];

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left column - Explanation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-700 dark:text-blue-300">Basis Vectors:</span> What if we just have a vector without anything? To properly quantize it and write it, we use basis vectors. Sort of a currency!
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">The Process</div>
                
                <div className="space-y-3">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    First, we choose two (or more) perpendicular directions in the two (or more) dimensional vector space.
                  </div>
                  
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    We then construct unit vectors along those directions and call them the basis vectors.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Two Dimensions</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  Basis vectors are called <InlineMath math="\hat{i}" /> and <InlineMath math="\hat{j}" />.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Three Dimensions</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  Basis vectors are called <InlineMath math="\hat{i}" />, <InlineMath math="\hat{j}" /> and <InlineMath math="\hat{k}" />.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Key Insight</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  Any vector can be written as a combination of these basis vectors:
                </div>
                <div className="mt-2 text-center">
                  <InlineMath math="\vec{V} = V_x\hat{i} + V_y\hat{j} + V_z\hat{k}" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Rotation Freedom</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  We can rotate our basis system! The choice of basis is arbitrary - what matters is that the vectors are perpendicular and unit length.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Visualizations */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-6">
          {/* Rotation Control */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">
              Rotate Basis Vectors: {rotation}°
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
            />
          </div>

          {/* 2D Visualization */}
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              2D Basis Vectors
            </div>
            <svg width="100%" height="300" viewBox="0 0 400 300" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
              <defs>
                <pattern id="basisGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                </pattern>
                <marker id="iArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#EF4444" />
                </marker>
                <marker id="jArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
                </marker>
                <marker id="vectorArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
                </marker>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#basisGrid)" />
              
              {/* Center point */}
              <circle cx="200" cy="150" r="3" fill="#374151" />
              
              {/* Perpendicular dashed lines */}
              <line 
                x1={200 + iVector[0] * (-150)} 
                y1={150 - iVector[1] * (-150)} 
                x2={200 + iVector[0] * 150} 
                y2={150 - iVector[1] * 150} 
                stroke="#EF4444" 
                strokeWidth="1" 
                strokeDasharray="5,5" 
                opacity="0.3"
              />
              <line 
                x1={200 + jVector[0] * (-150)} 
                y1={150 - jVector[1] * (-150)} 
                x2={200 + jVector[0] * 150} 
                y2={150 - jVector[1] * 150} 
                stroke="#10B981" 
                strokeWidth="1" 
                strokeDasharray="5,5" 
                opacity="0.3"
              />
              
              {/* Basis vectors */}
              <line 
                x1="200" 
                y1="150" 
                x2={200 + iVector[0] * 80} 
                y2={150 - iVector[1] * 80} 
                stroke="#EF4444" 
                strokeWidth="4" 
                markerEnd="url(#iArrow)"
              />
              <text 
                x={200 + iVector[0] * 90} 
                y={150 - iVector[1] * 90} 
                className="fill-red-600 text-lg font-bold" 
                textAnchor="middle"
              >
                î
              </text>
              
              <line 
                x1="200" 
                y1="150" 
                x2={200 + jVector[0] * 80} 
                y2={150 - jVector[1] * 80} 
                stroke="#10B981" 
                strokeWidth="4" 
                markerEnd="url(#jArrow)"
              />
              <text 
                x={200 + jVector[0] * 90} 
                y={150 - jVector[1] * 90} 
                className="fill-green-600 text-lg font-bold" 
                textAnchor="middle"
              >
                ĵ
              </text>
              
              {/* Fixed Sample vector V */}
              <line 
                x1="200" 
                y1="150" 
                x2={200 + fixedSampleVector[0] * 80} 
                y2={150 - fixedSampleVector[1] * 80} 
                stroke="#8B5CF6" 
                strokeWidth="3" 
                markerEnd="url(#vectorArrow)"
              />
              <text 
                x={200 + fixedSampleVector[0] * 90} 
                y={150 - fixedSampleVector[1] * 90} 
                className="fill-purple-600 text-lg font-bold" 
                textAnchor="middle"
              >
                V
              </text>
              
              {/* Projection lines from V to basis vectors */}
              <line 
                x1={200 + fixedSampleVector[0] * 80} 
                y1={150 - fixedSampleVector[1] * 80} 
                x2={200 + projectionOnI[0] * 80} 
                y2={150 - projectionOnI[1] * 80} 
                stroke="#EF4444" 
                strokeWidth="2" 
                strokeDasharray="3,3" 
                opacity="0.7"
              />
              <text 
                x={200 + projectionOnI[0] * 80 + 15} 
                y={150 - projectionOnI[1] * 80 - 10} 
                className="fill-red-600 text-sm font-bold" 
                textAnchor="start"
              >
                {vDotI.toFixed(1)}
              </text>
              
              <line 
                x1={200 + fixedSampleVector[0] * 80} 
                y1={150 - fixedSampleVector[1] * 80} 
                x2={200 + projectionOnJ[0] * 80} 
                y2={150 - projectionOnJ[1] * 80} 
                stroke="#10B981" 
                strokeWidth="2" 
                strokeDasharray="3,3" 
                opacity="0.7"
              />
              <text 
                x={200 + projectionOnJ[0] * 80 + 15} 
                y={150 - projectionOnJ[1] * 80 - 10} 
                className="fill-green-600 text-sm font-bold" 
                textAnchor="start"
              >
                {vDotJ.toFixed(1)}
              </text>
            </svg>
          </div>

          {/* 3D Visualization */}
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              3D Basis Vectors
            </div>
            <div className="h-80 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <Canvas
                camera={{ position: [5, 5, 5], fov: 50 }}
                style={{ background: isDarkMode ? '#0F172A' : '#F8FAFC' }}
              >
                <Scene3D />
              </Canvas>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Legend:
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-600 dark:text-blue-400">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-red-500"></div>
                <span><InlineMath math="\hat{i}" /> - x-direction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500"></div>
                <span><InlineMath math="\hat{j}" /> - y-direction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-blue-500"></div>
                <span><InlineMath math="\hat{k}" /> - z-direction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-purple-500"></div>
                <span><InlineMath math="\vec{V}" /> - Sample vector</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="basis-vectors"
      slideTitle="Basis Vectors"
      moduleId="vectors"
      submoduleId="vector-operations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 