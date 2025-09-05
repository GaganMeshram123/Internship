import React from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { useThemeContext } from '@/lib/ThemeContext'

export default function ArithmeticSequencesSlide6() {
  const { isDarkMode } = useThemeContext()
  
  const slideContent = (
    <div className={`w-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
            Arithmetic Sequences Assessment
          </h2>
          
          <div className="text-center text-lg text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              This assessment will test your understanding of arithmetic sequence concepts.
            </p>
            <p className="mb-6">
              Please solve the problems below by writing your solutions clearly and showing all work.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Upload your handwritten solutions as images using the response areas provided.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="arithmetic-sequences-assessment"
      slideTitle="Arithmetic Sequences Assessment"
      moduleId="sequences"
      submoduleId="arithmetic-sequences"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}