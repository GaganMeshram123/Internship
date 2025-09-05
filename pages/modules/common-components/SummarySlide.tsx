import React from "react";
import { useState } from "react";
import { useThemeContext } from "@/lib/ThemeContext";

interface SummarySlideProps {
  title: string;
  points: string[];
  imageUrl?: string;
}

const SummarySlide = ({ title, points, imageUrl }: SummarySlideProps) => {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { isDarkMode } = useThemeContext();

  return (
    <div className="space-y-8">
      <div className={`${isDarkMode 
        ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
        : 'bg-gradient-to-br from-blue-100 to-indigo-100'
      } rounded-lg p-8`}>
        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
          Congratulations! 🎉
        </h3>
        
        <div className="space-y-6">
          <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            You&apos;ve mastered the key concepts of {title}:
          </p>
          
          <div className={`${isDarkMode ? 'bg-gray-900/50' : 'bg-white/90'} p-6 rounded-lg`}>
            <ul className="space-y-3">
              {points.map((point, index) => (
                <li key={index} className={`flex items-start gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback Section */}
          {!feedbackSubmitted ? (
            <div className={`mt-8 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} p-6 rounded-lg`}>
              <h4 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                How was your learning experience?
              </h4>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Your feedback helps us improve our content!
              </p>
              
              {/* Rating Buttons */}
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {['😕 Confusing', '😐 Okay', '🙂 Good', '😄 Excellent'].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => {
                      setSelectedRating(rating);
                      fetch('/api/feedback', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          topic: title,
                          rating: rating,
                        }),
                      });
                    }}
                    className={`px-4 py-2 rounded-full transition-all duration-200 text-white
                              ${selectedRating === rating 
                                ? 'bg-blue-600 ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800' 
                                : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-400'}`}`}
                  >
                    {rating}
                  </button>
                ))}
              </div>

              {/* Text Feedback */}
              <div className="mt-6 space-y-4">
                <label htmlFor="feedback" className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                  Additional Comments (optional)
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  placeholder="Share your thoughts, suggestions, or questions..."
                  className={`w-full px-4 py-3 ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border-gray-700 text-gray-200 placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                />
                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      const textarea = document.getElementById('feedback') as HTMLTextAreaElement;
                      if (textarea.value.trim()) {
                        fetch('/api/feedback', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            topic: title,
                            type: 'text',
                            feedback: textarea.value.trim()
                          }),
                        }).then(() => {
                          textarea.value = '';
                          setFeedbackSubmitted(true);
                        });
                      } else {
                        // Even if no text feedback, mark as submitted if rating was selected
                        if (selectedRating) {
                          setFeedbackSubmitted(true);
                        }
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                              transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>Submit Feedback</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={`mt-8 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-600/50 to-purple-600/50' 
                : 'bg-gradient-to-r from-indigo-100 to-purple-100'
              } p-8 rounded-lg text-center animate-fade-in`}>
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Happy Learning! 🎓
              </h4>
              <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-6`}>
                Thank you for your feedback! We&apos;re constantly working to improve our educational content.
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                For more such resources contact: 
                <a href="mailto:as@quazaredu.com" className={`${isDarkMode ? 'text-yellow-300' : 'text-blue-600'} ml-2 hover:underline`}>
                  as@quazaredu.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummarySlide;