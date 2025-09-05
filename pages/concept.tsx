import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, Question, UserInputQuestion, QuestionsDivider } from './modules/common-components/concept';
import React from 'react';
import { useRouter } from 'next/router';
import { useThemeContext } from '@/lib/ThemeContext';
import { LoadingSpinner } from './components/UIComponents';
import SimpleSubmoduleList from './components/SimpleSubmoduleList';

export interface UserData {
  studentId?: string;
  classId?: string;
  moduleId?: string;
  moduleSlug?: string;
  submoduleId?: string;
}

export interface TeacherRemark {
  teacherId: string;
  text: string;
  timestamp: string;
}

interface ConceptSlidesProps {
  slides: Slide[];
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData;
  preloadedResponses?: any;
  moduleDetails?: { ai_enabled: boolean };
}

export default function ConceptSlides({ slides, isOpen, onClose, userData, preloadedResponses, moduleDetails }: ConceptSlidesProps) {
  const router = useRouter();
  const { module: moduleParam } = router.query;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [responses, setResponses] = useState<{ [key: string]: { [key: string]: string | string[] } }>({});
  const [submittedSlides, setSubmittedSlides] = useState<{ [key: string]: boolean }>({});
  const [teacherRemarks, setTeacherRemarks] = useState<{ [key: string]: { [key: string]: TeacherRemark } }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [moduleSlides, setModuleSlides] = useState<Slide[]>([]);
  const [moduleSubmodules, setModuleSubmodules] = useState<any[]>([]);
  const [selectedSubmodule, setSelectedSubmodule] = useState<any>(null);
  const [showingSubmodules, setShowingSubmodules] = useState(false);
  const { isDarkMode } = useThemeContext();
  const slideRef = useRef<HTMLDivElement>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [hideCloseButton, setHideCloseButton] = useState(false);

  // Load module when component mounts
  useEffect(() => {
    const loadModule = async () => {
      if (!moduleParam || typeof moduleParam !== 'string') {
        setIsLoading(false);
        return;
      }

      try {
        console.log('Loading module:', moduleParam);
        const module = await import(`./modules/${moduleParam}/index.tsx`);
        
        if (module.default) {
          // Check if the module has submodules
          if (module.submodules && Array.isArray(module.submodules)) {
            console.log('Module has submodules:', module.submodules);
            setModuleSubmodules(module.submodules);
            setShowingSubmodules(true);
          } 
          // Check if the module has direct slides (like some single-module formats)
          else if (module.slides && Array.isArray(module.slides)) {
            console.log('Module has direct slides:', module.slides.length);
            setModuleSlides(module.slides);
            setShowingSubmodules(false);
          } 
          // Fallback: create info slide
          else {
            console.log('Module structure unknown, creating info slide');
            setModuleSlides([{
              id: 'module-info',
              title: moduleParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              type: 'interactive',
              content: <div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-6">Module: {moduleParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
                  <p className="text-lg mb-8">This module has been loaded successfully!</p>
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-lg">
                    <p>This is a test environment for the module. In the full application, this would show the complete module content with interactive elements.</p>
                  </div>
                  <button 
                    onClick={() => router.push('/')}
                    className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    Back to Modules
                  </button>
                </div>
              </div>
            }]);
            setShowingSubmodules(false);
          }
        }
      } catch (error) {
        console.error('Error loading module:', error);
        setModuleSlides([{
          id: 'error',
          title: 'Module Error',
          type: 'interactive',
          content: <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error Loading Module</h2>
            <p className="mb-4">Could not load module: {moduleParam}</p>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Back to Modules
            </button>
          </div>
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    if (moduleParam) {
      loadModule();
    } else if (slides && slides.length > 0) {
      setModuleSlides(slides);
      setIsLoading(false);
    }
  }, [moduleParam, slides, router]);

  // Initialize responses when slides are loaded
  useEffect(() => {
    if (moduleSlides.length > 0 && !showingSubmodules) {
      initializeEmptyResponses();
    }
  }, [moduleSlides, showingSubmodules]);

  // Initialize responses with empty values
  const initializeEmptyResponses = () => {
    const initialResponses: { [key: string]: { [key: string]: string | string[] } } = {};
    const initialTeacherRemarks: { [key: string]: { [key: string]: TeacherRemark } } = {};
    
    moduleSlides.forEach((slide, index) => {
      if (slide.questions && slide.questions.length > 0) {
        initialResponses[`slide-${index}`] = {};
        initialTeacherRemarks[`slide-${index}`] = {};
        
        slide.questions.forEach(question => {
          // Initialize with empty string or array based on input type
          initialResponses[`slide-${index}`][question.id] = 
            question.inputType === 'checkbox' ? [] : '';
        });
      }
    });
    
    setResponses(initialResponses);
    setTeacherRemarks(initialTeacherRemarks);
    setSubmittedSlides({});
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection >= 0 && currentSlide + newDirection < moduleSlides.length) {
      const currentSlideObj = moduleSlides[currentSlide];
      const hasQuestions = currentSlideObj.questions && currentSlideObj.questions.length > 0;
      const isSlideSubmitted = submittedSlides[`slide-${currentSlide}`] || false;
      
      // Check if this is a question slide that requires submission before proceeding
      if (hasQuestions && currentSlideObj.persistResponse && !isSlideSubmitted && newDirection > 0) {
        // Show warning popup
        setWarningMessage("Please save your responses before proceeding to the next slide.");
        setShowWarning(true);
        // Don't navigate
        return;
      }
      
      // Clear any warnings when successfully navigating
      setShowWarning(false);
      setDirection(newDirection);
      setCurrentSlide(currentSlide + newDirection);
    }
  };

  // Handle input changes for questions
  const handleInputChange = (slideIndex: number, questionId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [`slide-${slideIndex}`]: {
        ...prev[`slide-${slideIndex}`],
        [questionId]: value
      }
    }));
  };

  // Handle form submission (simplified for testing)
  const handleSubmit = async (slideIndex: number) => {
    const currentSlideObj = moduleSlides[slideIndex];
    if (!currentSlideObj.questions || !currentSlideObj.persistResponse) return;

    setIsSubmitting(true);

    // Simulate saving (just mark as submitted for testing)
    setTimeout(() => {
      setSubmittedSlides(prev => ({
        ...prev,
        [`slide-${slideIndex}`]: true
      }));
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle close action
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/');
    }
  };

  // Handle submodule selection
  const handleSubmoduleSelect = (submodule: any) => {
    console.log('Selected submodule:', submodule);
    setSelectedSubmodule(submodule);
    setModuleSlides(submodule.slides);
    setShowingSubmodules(false);
    setCurrentSlide(0);
    // Initialize responses for the new submodule
    initializeEmptyResponses();
  };

  // Handle back to submodules
  const handleBackToSubmodules = () => {
    setShowingSubmodules(true);
    setSelectedSubmodule(null);
    setModuleSlides([]);
    setCurrentSlide(0);
  };

  // Return early if no module is being shown
  if (!isOpen && !moduleParam) return null;

  const currentSlideObj = moduleSlides[currentSlide];
  const hasQuestions = currentSlideObj?.questions && currentSlideObj.questions.length > 0;
  const slideResponses = responses[`slide-${currentSlide}`] || {};
  const isSlideSubmitted = submittedSlides[`slide-${currentSlide}`] || false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} z-50 w-screen h-screen overflow-hidden motion-div-slide`}
    >
      <motion.div 
        className="h-full w-full flex flex-col motion-div-slide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingSpinner size="large" message="Loading module" />
          </div>
        ) : showingSubmodules && moduleSubmodules.length > 0 ? (
          <div className="h-full overflow-y-auto">
            <SimpleSubmoduleList
              submodules={moduleSubmodules}
              onSubmoduleSelect={handleSubmoduleSelect}
              onBack={handleClose}
              moduleTitle={moduleParam ? (typeof moduleParam === 'string' ? moduleParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : moduleParam[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) : 'Module'}
            />
          </div>
        ) : (
          <>
            {/* Warning Popup */}
            {showWarning && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 dark:bg-black dark:bg-opacity-10 bg-white bg-opacity-10" onClick={() => setShowWarning(false)}></div>
                <div className={`relative p-6 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} max-w-md`}>
                  <button 
                    className="absolute top-2 right-2" 
                    onClick={() => setShowWarning(false)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-500 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Incomplete Submission</h3>
                  </div>
                  <p className="mb-6">{warningMessage}</p>
                  <button
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    onClick={() => setShowWarning(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full h-full flex items-center justify-center motion-div-slide"
              >
                <div ref={slideRef} className="w-full h-full px-8 py-8 overflow-y-auto">
                  <div className="max-w-[1400px] mx-auto relative">
                    <button
                      onClick={selectedSubmodule ? handleBackToSubmodules : handleClose}
                      className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} absolute right-0 top-0 ${hideCloseButton ? 'hidden' : ''}`}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    {currentSlideObj?.title && (
                      <h3 className={`text-4xl ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-8 text-center`}>{currentSlideObj.title}</h3>
                    )}

                    <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-xl`}>
                      {currentSlideObj && (
                        <>
                          {/* Render different content based on slide type */}
                          {currentSlideObj.type === 'interactive' ? (
                            <>
                              <div className="mb-8">
                                {currentSlideObj.content}
                              </div>
                              <div>
                                {currentSlideObj.component && 
                                  React.createElement(currentSlideObj.component, { userData })}
                              </div>
                            </>
                          ) : currentSlideObj.type === 'question' ? (
                            <div className={`mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-8 rounded-xl shadow-lg`}>
                              <div className="mb-4">
                                {currentSlideObj.content}
                              </div>

                              {/* Render questions */}
                              {hasQuestions && (
                                <form onSubmit={(e) => {
                                  e.preventDefault();
                                  handleSubmit(currentSlide);
                                }}>
                                  {/* Add divider between content and questions */}
                                  <QuestionsDivider />
                                  <div className={`mx-auto px-8 py-2 pt-8 rounded-xl shadow-lg ${
                                    isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-white bg-opacity-90'
                                  }`}>
                                  {currentSlideObj.questions?.map((question: Question) => {
                                    const InputComponent = UserInputQuestion;
                                    
                                    return (
                                      <InputComponent
                                        key={question.id}
                                        question={question}
                                        value={slideResponses[question.id] || (question.inputType === 'checkbox' ? [] : '')}
                                        onChange={(value) => handleInputChange(currentSlide, question.id, value)}
                                        submitted={isSlideSubmitted}
                                        teacherRemark={teacherRemarks[`slide-${currentSlide}`]?.[question.id]}
                                      />
                                    );
                                  })}
                                  </div>
                                  
                                  {currentSlideObj.persistResponse && !isSlideSubmitted && (
                                    <div className="mt-6">
                                      <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors ${
                                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                      >
                                        {isSubmitting ? 'Saving...' : 'Save Response (Test Mode)'}
                                      </button>
                                    </div>
                                  )}
                                  
                                  {isSlideSubmitted && (
                                    <div className={`mt-6 p-4 ${
                                      isDarkMode ? 'bg-green-800 bg-opacity-30 border-green-500 text-green-300' : 'bg-green-50 border-green-400 text-green-700'
                                    } border rounded-lg`}>
                                      <p>
                                        Response saved in test mode!
                                      </p>
                                    </div>
                                  )}
                                </form>
                              )}
                            </div>
                          ) : (
                            currentSlideObj.content
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {moduleSlides.length > 1 && currentSlide > 0 && (
              <button
                className={`absolute left-8 top-1/2 -translate-y-1/2 ${
                  isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'
                } z-50`}
                onClick={() => paginate(-1)}
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {moduleSlides.length > 1 && currentSlide < moduleSlides.length - 1 && (
              <button
                className={`absolute right-8 top-1/2 -translate-y-1/2 ${
                  isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'
                } z-50`}
                onClick={() => paginate(1)}
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Slide Indicators */}
            {moduleSlides.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {moduleSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                      index === currentSlide 
                        ? isDarkMode ? 'bg-white' : 'bg-gray-800' 
                        : isDarkMode ? 'bg-gray-500 hover:bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => {
                      const currentSlideObj = moduleSlides[currentSlide];
                      const hasQuestions = currentSlideObj.questions && currentSlideObj.questions.length > 0;
                      const isSlideSubmitted = submittedSlides[`slide-${currentSlide}`] || false;
                      
                      // Check if trying to move forward from a question slide that requires submission
                      if (hasQuestions && currentSlideObj.persistResponse && !isSlideSubmitted && index > currentSlide) {
                        // Show warning popup
                        setWarningMessage("Please save your responses before proceeding to the next slide.");
                        setShowWarning(true);
                        // Don't navigate
                        return;
                      }
                      
                      // Clear any warnings when successfully navigating
                      setShowWarning(false);
                      setDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}