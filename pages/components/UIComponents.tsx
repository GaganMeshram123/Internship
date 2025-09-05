import React from 'react';

// Custom LoadingSpinner component (CubeLoader)
export const LoadingSpinner = ({ size = "default", message = "Loading" }: { size?: "default" | "large", message?: string }) => {
  const cubeSize = size === "large" ? 120 : 80;
  const translateZ = size === "large" ? 120 : 80;
  const borderWidth = size === "large" ? 12 : 8;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: `${cubeSize + 30}px`, height: `${cubeSize + 30}px` }}>
        <div 
          className="absolute w-full h-full animate-cube-rotate" 
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-37.5deg) rotateY(45deg)',
            animationDelay: '0.8s'
          }}
        >
          {/* Top face */}
          <div 
            className="absolute animate-cube-side-top border-white dark:border-gray-900"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              backgroundColor: 'rgba(99, 102, 241, 0.5)',
              borderWidth: `${borderWidth}px`,
              borderStyle: 'solid',
              boxSizing: 'border-box',
              transform: `rotateX(90deg) translateZ(${translateZ}px)`,
              transformOrigin: '50% 50%'
            }}
          />
          
          {/* Bottom face */}
          <div 
            className="absolute animate-cube-side-bottom border-white dark:border-gray-900"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              backgroundColor: 'rgba(99, 102, 241, 0.5)',
              borderWidth: `${borderWidth}px`,
              borderStyle: 'solid',
              boxSizing: 'border-box',
              transform: `rotateX(-90deg) translateZ(${translateZ}px)`,
              transformOrigin: '50% 50%'
            }}
          />
          
          {/* Front face */}
          <div 
            className="absolute animate-cube-side-front border-white dark:border-gray-900"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              backgroundColor: 'rgba(99, 102, 241, 0.5)',
              borderWidth: `${borderWidth}px`,
              borderStyle: 'solid',
              boxSizing: 'border-box',
              transform: `rotateY(0deg) translateZ(${translateZ}px)`,
              transformOrigin: '50% 50%',
              animationDelay: '100ms'
            }}
          />
          
          {/* Back face */}
          <div 
            className="absolute animate-cube-side-back border-white dark:border-gray-900"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              backgroundColor: 'rgba(99, 102, 241, 0.5)',
              borderWidth: `${borderWidth}px`,
              borderStyle: 'solid',
              boxSizing: 'border-box',
              transform: `rotateY(-180deg) translateZ(${translateZ}px)`,
              transformOrigin: '50% 50%',
              animationDelay: '100ms'
            }}
          />
          
          {/* Left face */}
          <div 
            className="absolute animate-cube-side-left border-white dark:border-gray-900"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              backgroundColor: 'rgba(99, 102, 241, 0.5)',
              borderWidth: `${borderWidth}px`,
              borderStyle: 'solid',
              boxSizing: 'border-box',
              transform: `rotateY(-90deg) translateZ(${translateZ}px)`,
              transformOrigin: '50% 50%',
              animationDelay: '100ms'
            }}
          />
          
          {/* Right face */}
          <div 
            className="absolute animate-cube-side-right border-white dark:border-gray-900"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              backgroundColor: 'rgba(99, 102, 241, 0.5)',
              borderWidth: `${borderWidth}px`,
              borderStyle: 'solid',
              boxSizing: 'border-box',
              transform: `rotateY(90deg) translateZ(${translateZ}px)`,
              transformOrigin: '50% 50%',
              animationDelay: '100ms'
            }}
          />
        </div>
      </div>
      
      <div 
        className={`text-center font-bold text-indigo-600 dark:text-indigo-300 w-full ${size === "large" ? "text-xl mt-8" : "text-sm mt-4"}`}
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 600
        }}
      >
        {message.toUpperCase()}
      </div>
      
      <style jsx>{`
        @keyframes cube-rotate {
          0% {
            transform: rotateX(-37.5deg) rotateY(45deg);
          }
          50% {
            transform: rotateX(-37.5deg) rotateY(405deg);
          }
          100% {
            transform: rotateX(-37.5deg) rotateY(405deg);
          }
        }
        
        @keyframes cube-side-top {
          0% { opacity: 1; transform: rotateX(90deg) translateZ(${translateZ}px); }
          20% { opacity: 1; transform: rotateX(90deg) translateZ(${translateZ * 0.5}px); }
          70% { opacity: 1; transform: rotateX(90deg) translateZ(${translateZ * 0.5}px); }
          90% { opacity: 1; transform: rotateX(90deg) translateZ(${translateZ}px); }
          100% { opacity: 1; transform: rotateX(90deg) translateZ(${translateZ}px); }
        }
        
        @keyframes cube-side-bottom {
          0% { opacity: 1; transform: rotateX(-90deg) translateZ(${translateZ}px); }
          20% { opacity: 1; transform: rotateX(-90deg) translateZ(${translateZ * 0.5}px); }
          70% { opacity: 1; transform: rotateX(-90deg) translateZ(${translateZ * 0.5}px); }
          90% { opacity: 1; transform: rotateX(-90deg) translateZ(${translateZ}px); }
          100% { opacity: 1; transform: rotateX(-90deg) translateZ(${translateZ}px); }
        }
        
        @keyframes cube-side-front {
          0% { opacity: 1; transform: rotateY(0deg) translateZ(${translateZ}px); }
          20% { opacity: 1; transform: rotateY(0deg) translateZ(${translateZ * 0.5}px); }
          70% { opacity: 1; transform: rotateY(0deg) translateZ(${translateZ * 0.5}px); }
          90% { opacity: 1; transform: rotateY(0deg) translateZ(${translateZ}px); }
          100% { opacity: 1; transform: rotateY(0deg) translateZ(${translateZ}px); }
        }
        
        @keyframes cube-side-back {
          0% { opacity: 1; transform: rotateY(-180deg) translateZ(${translateZ}px); }
          20% { opacity: 1; transform: rotateY(-180deg) translateZ(${translateZ * 0.5}px); }
          70% { opacity: 1; transform: rotateY(-180deg) translateZ(${translateZ * 0.5}px); }
          90% { opacity: 1; transform: rotateY(-180deg) translateZ(${translateZ}px); }
          100% { opacity: 1; transform: rotateY(-180deg) translateZ(${translateZ}px); }
        }
        
        @keyframes cube-side-left {
          0% { opacity: 1; transform: rotateY(-90deg) translateZ(${translateZ}px); }
          20% { opacity: 1; transform: rotateY(-90deg) translateZ(${translateZ * 0.5}px); }
          70% { opacity: 1; transform: rotateY(-90deg) translateZ(${translateZ * 0.5}px); }
          90% { opacity: 1; transform: rotateY(-90deg) translateZ(${translateZ}px); }
          100% { opacity: 1; transform: rotateY(-90deg) translateZ(${translateZ}px); }
        }
        
        @keyframes cube-side-right {
          0% { opacity: 1; transform: rotateY(90deg) translateZ(${translateZ}px); }
          20% { opacity: 1; transform: rotateY(90deg) translateZ(${translateZ * 0.5}px); }
          70% { opacity: 1; transform: rotateY(90deg) translateZ(${translateZ * 0.5}px); }
          90% { opacity: 1; transform: rotateY(90deg) translateZ(${translateZ}px); }
          100% { opacity: 1; transform: rotateY(90deg) translateZ(${translateZ}px); }
        }
        
        .animate-cube-rotate {
          animation: cube-rotate 3s ease infinite;
          animation-fill-mode: forwards;
        }
        
        .animate-cube-side-top {
          animation: cube-side-top 3s ease infinite;
          animation-fill-mode: forwards;
        }
        
        .animate-cube-side-bottom {
          animation: cube-side-bottom 3s ease infinite;
          animation-fill-mode: forwards;
        }
        
        .animate-cube-side-front {
          animation: cube-side-front 3s ease infinite;
          animation-fill-mode: forwards;
        }
        
        .animate-cube-side-back {
          animation: cube-side-back 3s ease infinite;
          animation-fill-mode: forwards;
        }
        
        .animate-cube-side-left {
          animation: cube-side-left 3s ease infinite;
          animation-fill-mode: forwards;
        }
        
        .animate-cube-side-right {
          animation: cube-side-right 3s ease infinite;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

// Skeleton loading component for cards
export const SkeletonCard = () => {
  return (
    <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition flex flex-col h-full overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        {/* Title skeleton */}
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          {/* Premium/Custom badge skeleton */}
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Description skeleton - min-h to match actual card */}
        <div className="min-h-[3rem] flex-grow">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
        </div>
        
        {/* Footer with lesson count */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mr-1"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Progress bar skeleton at bottom */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-gray-300 dark:bg-gray-600 w-1/3 rounded-r animate-pulse"></div>
    </div>
  );
};

// Skeleton loading component for tables
export const SkeletonTable = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Table header */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Table rows */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-1/4 ml-auto bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Toast component for notifications
export const Toast = ({ 
  message, 
  type, 
  onDismiss 
}: { 
  message: string; 
  type: 'success' | 'error' | 'warning'; 
  onDismiss: () => void;
}) => {
  let bgColor = 'bg-green-100 dark:bg-green-900 border-l-4 border-green-500';
  let textColor = 'text-green-800 dark:text-white';
  let iconColor = 'text-green-500 dark:text-green-400';
  let dismissColor = 'text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-white';
  let icon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  if (type === 'error') {
    bgColor = 'bg-red-100 dark:bg-red-900 border-l-4 border-red-500';
    textColor = 'text-red-800 dark:text-white';
    iconColor = 'text-red-500 dark:text-red-400';
    dismissColor = 'text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-white';
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  } else if (type === 'warning') {
    bgColor = 'bg-yellow-50 dark:bg-gradient-to-r dark:from-amber-900 dark:to-yellow-800 border-l-4 border-yellow-500';
    textColor = 'text-yellow-800 dark:text-white';
    iconColor = 'text-yellow-500 dark:text-yellow-400';
    dismissColor = 'text-yellow-500 dark:text-yellow-300 hover:text-yellow-700 dark:hover:text-white';
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    );
  }

  return (
    <div className={`${bgColor} ${textColor} p-3 rounded shadow-lg flex items-center justify-between transform transition-all duration-500 ease-in-out translate-y-0 opacity-100 pointer-events-auto`}>
      <div className="flex items-center">
        <span className={iconColor}>{icon}</span>
        <span className="text-sm">{message}</span>
      </div>
      <button 
        onClick={onDismiss} 
        className={`ml-4 transition-colors ${dismissColor}`}
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export const CompletedModuleToast = ({ title }: { title: string }) => {
  return (
    <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-800 dark:text-white p-3 rounded shadow-lg flex items-center transform transition-all duration-500 ease-in-out translate-y-0 opacity-100 pointer-events-auto">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="text-sm">
        <span className="font-medium">{title}</span> module completed successfully!
      </span>
    </div>
  );
};

// Adding default export for Next.js compatibility
export default function UIComponentsPage() {
  return null;
} 