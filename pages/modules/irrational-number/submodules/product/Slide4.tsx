import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import * as THREE from 'three';

// 3D visualization components
interface Text3DProps {
  position: [number, number, number];
  content: string;
  color: string;
}

function Text3D({ position, content, color }: Text3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!); // Explicitly type useRef
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(new THREE.Vector3(0, 0, 0));
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={0.4}
      color={color}
      anchorX="center"
      anchorY="middle"
      rotation={[0, Math.PI, 0]}
    >
      {content}
    </Text>
  );
}

interface Scene3DProps {
  number1: string;
  number2: string;
  product: string;
}

function Scene3D({ number1, number2, product }: Scene3DProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Text3D position={[-2.5, 0, 0]} content={number1} color="#EF4444" />
      <Text3D position={[-0.5, 0, 0]} content="×" color="#FFFFFF" />
      <Text3D position={[1.5, 0, 0]} content={number2} color="#10B981" />
      <Text3D position={[3.5, 0, 0]} content="=" color="#FFFFFF" />
      <Text3D position={[5.5, 0, 0]} content={product} color="#3B82F6" />

      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function IrrationalProductSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [decimalPrecision, setDecimalPrecision] = useState(2);
  const { isDarkMode } = useThemeContext();

  const num1Value = Math.sqrt(2);
  const num2Value = Math.sqrt(3);
  const productValue = num1Value * num2Value;

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-product-concept',
      conceptId: 'irrational-product',
      conceptName: 'Understanding Irrational Products',
      type: 'learning',
      description: 'Learning how the product of two irrational numbers can be rational or irrational'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-700 dark:text-blue-300">The Product of Irrationals:</span> When you multiply two irrational numbers, the result is not always irrational. This can be a surprising property!
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">Key Scenarios</div>
                
                <div className="space-y-3">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Case 1: The product is rational.</span>
                    <br />
                    Example: <InlineMath math="\sqrt{2} \times \sqrt{8} = \sqrt{16} = 4" />
                  </div>
                  
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Case 2: The product is irrational.</span>
                    <br />
                    Example: <InlineMath math="\sqrt{2} \times \sqrt{3} = \sqrt{6}" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Key Insight</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The decimal parts of the irrational numbers can sometimes combine to form a simple, non-infinite number.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Interactive Example</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  Below, explore the product of <InlineMath math="\sqrt{2} \times \sqrt{3}" />. Use the slider to increase the decimal precision and see how the result remains irrational.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">
              Decimal Precision: {decimalPrecision} digits
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={decimalPrecision}
              onChange={(e) => setDecimalPrecision(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
            />
          </div>

          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Decimal Explorer
            </div>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
              <BlockMath 
                math={`\\sqrt{2} \\times \\sqrt{3} = \\sqrt{6} \\approx ${productValue.toFixed(decimalPrecision)}...`}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              3D Product View
            </div>
            <div className="h-80 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <Canvas
                camera={{ position: [5, 5, 5], fov: 50 }}
                style={{ background: isDarkMode ? '#0F172A' : '#F8FAFC' }}
              >
                <Scene3D
                  number1={`\\sqrt{2}`}
                  number2={`\\sqrt{3}`}
                  product={`\\sqrt{6}`}
                />
              </Canvas>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Note:
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm text-blue-600 dark:text-blue-400">
              <div className="flex items-center gap-2">
                <span>The product of two irrational numbers can be rational or irrational.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="irrational-product"
      slideTitle="Product of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="product"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}