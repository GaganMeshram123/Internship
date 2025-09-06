import React, { useState } from "react";

const steps = [
  { title: "Step 1", description: "Visualize the core: a perfect circle centered at O." },
  { title: "Step 2", description: "Extend from the heart: draw a radius OT from the center O to a point T on the edge." },
  { title: "Step 3", description: "The delicate touch: a tangent line grazes the circle at T, touching at one singular point." },
  { title: "Step 4", description: "The critical connection: Observe the tangent is perfectly perpendicular (⊥) to the radius at T. This forms an exact 90° angle, always!" },
];

const TheoremDiagram = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 transform hover:scale-[1.005] animate-fade-in">

      {/* Top Row: Heading and Description */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
            Tangent–Radius Perpendicularity <br /> Unveiled
          </h2>

          {/* Step Indicator */}
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">Step {step + 1}</span>
            <span className="font-light">of {steps.length}</span>
            <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 ease-out"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 dark:bg-slate-800 rounded-xl shadow-inner border border-blue-100 dark:border-slate-700 transition-all duration-300">
            <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 animate-slide-in-up">
              {steps[step].title}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mt-3 leading-relaxed text-base animate-fade-in-slow">
              {steps[step].description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Diagram and Buttons */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-6">
        {/* Container for buttons and diagram */}
        <div className="flex-1 flex flex-col gap-4 items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">

          {/* Buttons above the circle */}
          <div className="flex gap-4 justify-center">
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              ← Previous
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
            >
              Next →
            </button>
          </div>
          
          {/* Diagram centered within the panel */}
          <svg width="340" height="380" viewBox="0 0 340 380">
            {/* Group to shift all diagram elements downwards to be in the middle */}
            <g transform="translate(0, 40)">
              {/* Subtle Background Grid/Pattern for aesthetic */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 L 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" className="dark:fill-slate-700 opacity-20"/>

              {/* Circle */}
              <circle cx="170" cy="170" r="100" stroke="#60a5fa" strokeWidth="3" fill="none" className="shadow-lg" />
              



[Image of a circle with a radius and tangent]



              {/* Center O */}
              <circle cx="170" cy="170" r="6" fill="#1e3a8a" className="dark:fill-blue-300" />
              <text x="155" y="160" fill="#1e3a8a" className="dark:fill-blue-300 font-bold text-lg">O</text>

              {/* Radius OT */}
              {step >= 1 && (
                <>
                  <line x1="170" y1="170" x2="270" y2="170" stroke="#3b82f6" strokeWidth="4" className="animate-draw-line" />
                  <circle cx="270" cy="170" r="6" fill="#1e3a8a" className="dark:fill-blue-300" />
                  <text x="278" y="175" fill="#1e3a8a" className="dark:fill-blue-300 font-bold text-lg animate-fade-in">T</text>
                  <text x="200" y="160" fill="#3b82f6" className="font-semibold text-sm animate-fade-in">Radius OT</text>
                </>
              )}

              {/* Tangent at T */}
              {step >= 2 && (
                <>
                  <line x1="270" y1="170" x2="270" y2="60" stroke="#f97316" strokeWidth="4" className="animate-draw-line" />
                  <line x1="270" y1="170" x2="270" y2="280" stroke="#f97316" strokeWidth="4" className="animate-draw-line" />
                  <text x="278" y="110" fill="#f97316" className="font-semibold text-sm animate-fade-in">Tangent</text>
                </>
              )}

              {/* Perpendicular Marker */}
              {step >= 3 && (
                <>
                  <rect x="264" y="164" width="12" height="12" stroke="#16a34a" strokeWidth="2" fill="none" className="animate-fade-in-scale" />
                  <text x="285" y="165" fill="#16a34a" className="font-bold text-lg animate-fade-in">90°</text>
                  <text x="245" y="195" fill="#16a34a" className="font-extrabold text-xl animate-fade-in">⊥</text>
                </>
              )}

              {/* Extra tangents (Universal Property) */}
              {step >= 3 && (
                <>
                  {/* T2 */}
                  <line x1="95" y1="245" x2="50" y2="290" stroke="#fb923c" strokeWidth="2" className="opacity-70 animate-draw-line-slow" />
                  <circle cx="95" cy="245" r="5" fill="#3b82f6" className="dark:fill-blue-300 opacity-70" />
                  <text x="100" y="250" fill="#3b82f6" className="dark:fill-blue-300 text-xs opacity-70 animate-fade-in">T₂</text>
                  {/* T3 */}
                  <line x1="185" y1="75" x2="230" y2="30" stroke="#fb923c" strokeWidth="2" className="opacity-70 animate-draw-line-slow" />
                  <circle cx="185" cy="75" r="5" fill="#3b82f6" className="dark:fill-blue-300 opacity-70" />
                  <text x="190" y="80" fill="#3b82f6" className="dark:fill-blue-300 text-xs opacity-70 animate-fade-in">T₃</text>
                  
                  {/* Radii for T2 and T3 */}
                  <line x1="170" y1="170" x2="95" y2="245" stroke="#3b82f6" strokeWidth="2" className="opacity-70 animate-draw-line-slow" />
                  <line x1="170" y1="170" x2="185" y2="75" stroke="#3b82f6" strokeWidth="2" className="opacity-70 animate-draw-line-slow" />
                  
                  {/* Perpendicular markers for T2 and T3 (more subtle) */}
                  <rect x="89" y="239" width="10" height="10" stroke="#16a34a" strokeWidth="1" fill="none" className="opacity-60 animate-fade-in-scale" />
                  <rect x="179" y="69" width="10" height="10" stroke="#16a34a" strokeWidth="1" fill="none" className="opacity-60 animate-fade-in-scale" />
                </>
              )}

              {/* Universal Property Caption */}
              <text x="170" y="320" textAnchor="middle" fill="#2563eb" className="dark:fill-blue-300 font-extrabold text-lg animate-fade-in-bounce">
                Always 90° – The Universal Law!
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TheoremDiagram;