import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function VectorIntroSlide1() {
	const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

	// Define MCQ data as constants to avoid optional access
	const mcqQuestion = {
		type: 'mcq' as const,
		question: "Why can't we represent the position in 2D with just one coordinate like in 1D?",
		options: [
			"Because in 2D, many different directions share the same distance from the origin, so distance alone isn't enough",
			'Because units change in 2D making numbers invalid',
			'Because the origin keeps changing in 2D',
			'Because axes in 2D have different scales by definition'
		]
	};
	const mcqOptions = mcqQuestion.options;

	const slideInteractions: Interaction[] = [
		{ id: 'vectors-intro', conceptId: 'vectors', conceptName: 'Vectors Introduction', type: 'learning', description: 'Understanding position in 2D with vectors' },
		{
			id: 'vectors-why-not-one-coordinate',
			conceptId: 'vectors-why-2d-needs-2-params',
			conceptName: 'Why not one coordinate in 2D?',
			type: 'judging',
			description: 'MCQ: Why a single number is insufficient to specify position in 2D',
			question: mcqQuestion
		}
	];

	const handleInteractionComplete = (response: InteractionResponse) => {
		setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
	};

	// MCQ state
	const [mcqSelected, setMcqSelected] = useState<string | null>(null);
	const [mcqShown, setMcqShown] = useState(false);
	const handleMCQAnswer = (optionIndex: number) => {
		const correctIndex = 0;
		const isCorrect = optionIndex === correctIndex;
		setMcqSelected(mcqOptions[optionIndex]);
		setMcqShown(true);
		handleInteractionComplete({
			interactionId: 'vectors-why-not-one-coordinate',
			value: mcqOptions[optionIndex],
			isCorrect,
			timestamp: Date.now(),
			conceptId: 'vectors-why-2d-needs-2-params',
			conceptName: 'Why not one coordinate in 2D?',
			question: mcqQuestion
		});
	};

	// Canvas/plane config
	const width = 700;
	const height = 400;
	const padding = 50;
	const origin = { x: padding + 0, y: height - padding }; // bottom-left origin

	const [point, setPoint] = useState<{ x: number; y: number }>({ x: origin.x + 200, y: origin.y - 120 });
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	// Derived vector quantities (in pixels)
	const dx = point.x - origin.x;
	const dy = origin.y - point.y; // y up
	const magnitude = Math.sqrt(dx * dx + dy * dy);
	const angleRad = Math.atan2(dy, dx);
	const angleDeg = (angleRad * 180) / Math.PI;

	useEffect(() => {
		// Track interaction when user moves the point
		if (isDragging) return;
		handleInteractionComplete({
			interactionId: 'vectors-intro',
			value: `point=(${dx.toFixed(0)}, ${dy.toFixed(0)}), r=${magnitude.toFixed(1)}, theta=${angleDeg.toFixed(1)}`,
			isCorrect: true,
			timestamp: Date.now(),
			conceptId: 'vectors',
			conceptName: 'Vectors Introduction'
		});
	}, [dx, dy, magnitude, angleDeg, isDragging]);

	const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

	const onPointerDown = (e: React.PointerEvent) => {
		if (!svgRef.current) return;
		const rect = svgRef.current.getBoundingClientRect();
		const x = clamp(e.clientX - rect.left, padding, width - padding);
		const y = clamp(e.clientY - rect.top, padding, height - padding);
		setPoint({ x, y });
		setIsDragging(true);
		(e.target as Element).setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e: React.PointerEvent) => {
		if (!isDragging || !svgRef.current) return;
		const rect = svgRef.current.getBoundingClientRect();
		const x = clamp(e.clientX - rect.left, padding, width - padding);
		const y = clamp(e.clientY - rect.top, padding, height - padding);
		setPoint({ x, y });
	};

	const onPointerUp = (e: React.PointerEvent) => {
		setIsDragging(false);
		(e.target as Element).releasePointerCapture(e.pointerId);
	};

	const onPointerLeave = () => {
		setIsDragging(false);
	};

	const onPointerCancel = () => {
		setIsDragging(false);
	};

	const slideContent = (
		<div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
			<div className="grid grid-cols-2 gap-8 h-full">
				{/* Left column: Theory */}
				<div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-4">
					<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
						Try to give the position of the ball with respect to some origin on the right. Unlike the case in 1-D, where we could assign it a number, positive for one direction and negative for another, we can’t do that here. We need to specify the distance from the origin and the direction of the ball, somehow.
					</p>
					<div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
						<div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Position of the ball with respect to some origin</div>
						<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
							<li>Magnitude (distance from origin)</li>
							<li>Direction (angle with the positive x-axis)</li>
						</ul>
					</div>
				</div>

				{/* Right column: Interactive plane + MCQ */}
				<div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
					<h3 className="text-gray-900 dark:text-white font-medium mb-4">2D Position and Vector</h3>
					<div className="w-full overflow-hidden rounded-lg border border-blue-200 dark:border-blue-700">
						<svg
							ref={svgRef}
							width={width}
							height={height}
							className="block"
							style={{ touchAction: 'none' }}
							onPointerDown={onPointerDown}
							onPointerMove={onPointerMove}
							onPointerUp={onPointerUp}
							onPointerLeave={onPointerLeave}
							onPointerCancel={onPointerCancel}
						>
							{/* Background */}
							<rect x={0} y={0} width={width} height={height} fill="#EFF6FF" />

							{/* Axes */}
							<line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#2563EB" strokeWidth={1} />
							<line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="#2563EB" strokeWidth={1} />

							{/* Grid */}
							{Array.from({ length: 13 }).map((_, i) => (
								<line key={`gx-${i}`} x1={padding + (i + 1) * 40} y1={padding} x2={padding + (i + 1) * 40} y2={height - padding} stroke="#BFDBFE" strokeWidth={0.5} />
							))}
							{Array.from({ length: 7 }).map((_, i) => (
								<line key={`gy-${i}`} x1={padding} y1={height - padding - (i + 1) * 40} x2={width - padding} y2={height - padding - (i + 1) * 40} stroke="#BFDBFE" strokeWidth={0.5} />
							))}

							{/* Origin label */}
							<circle cx={origin.x} cy={origin.y} r={3} fill="#1D4ED8" />
							<text x={origin.x - 6} y={origin.y + 14} fontSize={12} fill="#1D4ED8">O</text>

							{/* Same-distance locus (dashed circle) */}
							{mcqShown && (
								<>
									<circle cx={origin.x} cy={origin.y} r={magnitude} fill="none" stroke="#60A5FA" strokeWidth={1.5} strokeDasharray="6,6" />
									<text x={origin.x + magnitude + 10} y={origin.y - 6} fontSize={12} fill="#2563EB">All points with same r</text>
								</>
							)}

							{/* Position vector arrow from origin to point */}
							<defs>
								<marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
									<polygon points="0 0, 8 3, 0 6" fill="#10B981" />
								</marker>
							</defs>
							<line x1={origin.x} y1={origin.y} x2={point.x} y2={point.y} stroke="#10B981" strokeWidth={2.5} markerEnd="url(#arrowhead)" />

							{/* Draggable ball */}
							<motion.circle cx={point.x} cy={point.y} r={10} fill="#EF4444" className="cursor-grab" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} />
						</svg>
					</div>

					{/* MCQ: Why not one coordinate in 2D? */}
					<div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-6 mt-6">
						<h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Quick Check</h4>
						<p className="text-lg text-gray-800 dark:text-gray-200 mb-4">Why can't we represent the position with just one coordinate in 2D?</p>
						<TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
							<div className="space-y-2">
								{mcqOptions.map((opt, idx) => {
									const isSelected = mcqSelected === opt;
									const correct = idx === 0;
									return (
										<button
											key={opt}
											onClick={() => handleMCQAnswer(idx)}
											disabled={mcqShown}
											className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
														isSelected
															? (correct ? 'border-green-500 bg-green-100 dark:bg-green-900' : 'border-red-500 bg-red-100 dark:bg-red-900')
															: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
													}`}
										>
											{opt}
										</button>
									);
								})}
							</div>
							{mcqShown && (
								<div className={`mt-4 p-3 rounded-lg ${mcqSelected === mcqOptions[0] ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
									<p className="text-lg">
										{mcqSelected === mcqOptions[0]
											? 'Correct: Distance alone picks a circle (all points with the same r). We also need a direction (angle) to specify the unique point.'
											: 'Not quite. In 2D, a single distance from the origin corresponds to infinitely many points on a circle. We need both distance and direction.'}
									</p>
								</div>
							)}
						</TrackedInteraction>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<SlideComponentWrapper
			slideId="vectors-position-2d"
			slideTitle="Vectors: Position in 2D"
			moduleId="vectors"
			submoduleId="vector-introduction"
			interactions={localInteractions}
		>
			<TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
				{slideContent}
			</TrackedInteraction>
		</SlideComponentWrapper>
	);
} 