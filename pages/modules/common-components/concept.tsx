import React from 'react';

export type ConceptTag = 'Physics' | 'Math' | 'Chemistry' | 'Earth Science' | 'Biology' | 'Computer Science';

export interface Concept {
  id: string;
  title: string;
  description: string;
  tags: ConceptTag[];
}

export interface Question {
  id: string;
  questionText: string;
  inputType: 'text' | 'number' | 'radio' | 'checkbox' | 'textarea' | 'select' | 'image';
  options?: string[]; // For radio or checkbox inputs
  required?: boolean;
}


export interface MatchingPair {
  key: string;
  value: string;
}

export interface InteractionQuestionMeta {
  type: QuestionType; // Required question type
  question: string;   // Required question text
  options?: string[]; // Optional list of options (for mcq/multiselect)
  matching?: {        // Optional matching structure (for matching questions)
    left?: string[];  // Left column items
    right?: string[]; // Right column items
  };
}

export interface Slide {
  type: 'text' | 'image' | 'animation' | 'interactive' | 'question';
  title?: string;
  content: React.ReactNode;
  component?: React.ComponentType<any>;
  questions?: Question[]; // Optional array of questions for this slide
  persistResponse?: boolean; // Whether to save responses to the database
  id: string; // Unique identifier for the slide
}

export interface UserResponse {
  studentId: string;
  classId?: string;
  moduleId?: string;
  submoduleId?: string;
  slideId?: string;
  questionId: string;
  response: string | string[]; // Can be a string or array of strings (for checkbox)
  createdAt: Date;
}

// Teacher remarks interface
export interface TeacherRemark {
  teacherId: string;
  text: string;
  timestamp: string;
}

// Interaction tracking interfaces
export type InteractionType = 'learning' | 'judging';

export interface Interaction {
  id: string; // Unique identifier for this interaction
  conceptId: string; // ID of the concept being evaluated
  conceptName: string; // Name of the concept
  type: InteractionType; // Type of interaction (learning or judging)
  description?: string; // Optional description of what this interaction is testing
  conceptDescription?: string; // Detailed description of what concept is being tested
  question?: InteractionQuestionMeta; // Optional metadata about the question
}

// Canonical question metadata
export type QuestionType = 'mcq' | 'multiselect' | 'integer' | 'matching';

export interface InteractionQuestionMeta {
  type: QuestionType;
  question: string; // Required question text
  options?: string[]; // MCQ/Multiselect options (optional)
  matching?: {
    left?: string[]; // Items to match (left side)
    right?: string[]; // Target labels (e.g., ["scalar", "vector"])
  };
}

export interface InteractionResponse {
  interactionId: string; // ID of the interaction
  // Value types per question type:
  // - mcq: string
  // - multiselect: string[]
  // - integer: number
  // - matching: MatchingPair[]
  // - learning interactions: number (counter)
  value: string | number | string[] | MatchingPair[];
  isCorrect?: boolean; // Whether the response is correct (for judging interactions)
  timestamp: number; // When the interaction occurred (ms epoch)
  conceptId?: string; // ID of the concept being evaluated
  conceptName?: string; // Name of the concept
  conceptDescription?: string; // Detailed description of what is being tested
  studentId?: string; // ID of the student performing the interaction
  question?: InteractionQuestionMeta; // Question metadata (required for judging interactions)

}

export interface SlideInteractionData {
  slideId: string;
  slideTitle: string;
  timeSpent: number; // Time spent on the slide in milliseconds
  // Note: to support multiple attempts, callers may store a nested map
  // interactions[interactionId] = InteractionResponse | Record<string, InteractionResponse>
  interactions: Record<string, any>;
}

// Create a context for judging interactions
export const JudgingInteractionContext = React.createContext<

  (value: string | number | string[] | MatchingPair[], isCorrect?: boolean, question?: InteractionQuestionMeta) => void
>(() => {});

// Component to wrap interactive elements and track interactions
export const TrackedInteraction: React.FC<{
  interaction: Interaction;
  onInteractionComplete: (response: InteractionResponse) => void;
  children: React.ReactNode;
  studentId?: string; // Add studentId prop
}> = ({ interaction, onInteractionComplete, children, studentId }) => {
  // Track interaction counts for learning interactions
  const [interactionCount, setInteractionCount] = React.useState(0);
  
  // Handle click or interaction
  const handleInteraction = (
    value: string | number | string[] | MatchingPair[] = true as unknown as string | number | string[] | MatchingPair[],
    isCorrect?: boolean,
    question?: InteractionQuestionMeta
  ) => {
    // For learning interactions, increment the count
    if (interaction.type === 'learning') {
      setInteractionCount(prev => prev + 1);
    }

    // Determine the value that would be recorded
    const candidateValue = interaction.type === 'learning' ? interactionCount + 1 : value;

    // Reject invalid values: null/undefined or empty arrays
    const isInvalid = (
      candidateValue === null || candidateValue === undefined ||
      (Array.isArray(candidateValue) && candidateValue.length === 0)
    );
    if (isInvalid) {
      console.warn(`Rejected interaction '${interaction.id}' due to empty or null value.`);
      return;
    }
    
    // Create interaction response
    const response: InteractionResponse = {
      interactionId: interaction.id,
      value: candidateValue,
      isCorrect,
      timestamp: Date.now(),
      conceptId: interaction.conceptId,
      conceptName: interaction.conceptName,
      conceptDescription: interaction.conceptDescription,
      studentId, // Include studentId in the response
      question: question ?? interaction.question
    };
    
    // Warn if judging interaction is missing required question metadata
    if (interaction.type === 'judging' && !response.question) {
      console.warn(`Judging interaction '${interaction.id}' missing question metadata.`);
    }
    

    onInteractionComplete(response);
  };
  
  // Wrap the children with an onClick handler if they're learning interactions
  if (interaction.type === 'learning') {
    return (
      <div 
        onClick={() => handleInteraction()} 
        className="tracked-interaction"
      >
        {children}
      </div>
    );
  }
  
  // For judging interactions, we provide the handleInteraction through context
  return (
    <JudgingInteractionContext.Provider value={handleInteraction}>
      <div className="tracked-interaction">
        {children}
      </div>
    </JudgingInteractionContext.Provider>
  );
};

// Helper hook to use judging interactions
export const useJudgingInteraction = () => {
  return React.useContext(JudgingInteractionContext);
};

// Helper function to compress images before upload
const compressImage = (file: File, maxWidth = 1024, maxHeight = 1024, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate the new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw the resized image
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      
      img.onerror = (error) => {
        reject(error);
      };
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// Divider component to separate content from questions
export const QuestionsDivider: React.FC<{ label?: string }> = ({ label = "Your Response" }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <div className="flex-grow border-t-2 border-gray-600 dark:border-gray-600 border-gray-300"></div>
        <span className="mx-4 px-4 py-2 text-gray-800 dark:text-white font-medium">
          {label}
        </span>
        <div className="flex-grow border-t-2 border-gray-600 dark:border-gray-600 border-gray-300"></div>
      </div>
    </div>
  );
};

// Component to display teacher remarks
export const TeacherRemarkDisplay: React.FC<{ teacherRemark: TeacherRemark }> = ({ teacherRemark }) => {
  // Format the timestamp
  const formattedDate = new Date(teacherRemark.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="mt-2 p-3 rounded-md bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Teacher's Feedback</p>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">{teacherRemark.text}</p>
          <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

// A reusable component for user input questions
export const InputQuestion: React.FC<{
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  submitted: boolean;
  teacherRemark?: TeacherRemark;
}> = ({ question, value, onChange, submitted, teacherRemark }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  
  // Function to render the teacher's remark if available
  const renderTeacherRemark = () => {
    if (teacherRemark) {
      return <TeacherRemarkDisplay teacherRemark={teacherRemark} />;
    }
    return null;
  };
  
  switch (question.inputType) {
    case 'text':
      return (
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-white font-medium mb-2">{question.questionText}</label>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
            required={question.required}
            disabled={submitted}
          />
          {renderTeacherRemark()}
        </div>
      );
    case 'textarea':
      return (
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-white font-medium mb-2">{question.questionText}</label>
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
            rows={4}
            required={question.required}
            disabled={submitted}
          />
          {renderTeacherRemark()}
        </div>
      );
    case 'number':
      return (
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-white font-medium mb-2">{question.questionText}</label>
          <input
            type="number"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
            required={question.required}
            disabled={submitted}
          />
          {renderTeacherRemark()}
        </div>
      );
    case 'radio':
      return (
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-white font-medium mb-2">{question.questionText}</label>
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${question.id}-${index}`}
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  className="mr-2"
                  required={question.required}
                  disabled={submitted}
                />
                <label 
                  htmlFor={`${question.id}-${index}`} 
                  className="text-gray-800 dark:text-gray-200"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {renderTeacherRemark()}
        </div>
      );
    case 'checkbox':
      return (
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-white font-medium mb-2">{question.questionText}</label>
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${question.id}-${index}`}
                  value={option}
                  checked={Array.isArray(value) ? value.includes(option) : false}
                  onChange={(e) => {
                    const newValue = [...(Array.isArray(value) ? value : [])];
                    if (e.target.checked) {
                      newValue.push(option);
                    } else {
                      const idx = newValue.indexOf(option);
                      if (idx !== -1) {
                        newValue.splice(idx, 1);
                      }
                    }
                    onChange(newValue);
                  }}
                  className="mr-2"
                  disabled={submitted}
                />
                <label 
                  htmlFor={`${question.id}-${index}`} 
                  className="text-gray-800 dark:text-gray-200"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {renderTeacherRemark()}
        </div>
      );
    case 'image':
      return (
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-white font-medium mb-2">{question.questionText}</label>
          <div className="flex flex-col space-y-4">
            {value && typeof value === 'string' && value.startsWith('data:image') && (
              <div className="w-full dark:bg-gray-800 bg-gray-100 p-4 rounded-md">
                <img 
                  src={value as string} 
                  alt="Uploaded image" 
                  className="max-w-full h-auto max-h-72 rounded-md object-contain mx-auto" 
                />
              </div>
            )}
            
            {!submitted && (
              <div className="dark:bg-gray-700 bg-gray-100 p-5 rounded-md border dark:border-gray-600 border-gray-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        setIsUploading(true);
                        setUploadError(null);
                        
                        // Validate file size before processing
                        if (file.size > 15 * 1024 * 1024) { // 15MB max
                          throw new Error('File is too large. Maximum size is 15MB.');
                        }
                        
                        // Check file size and compress if larger than 1MB
                        if (file.size > 1024 * 1024) {
                          const compressedImage = await compressImage(file);
                          onChange(compressedImage);
                        } else {
                          // For smaller files, use regular FileReader without compression
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            onChange(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      } catch (error) {
                        console.error('Error processing image:', error);
                        setUploadError(error instanceof Error ? error.message : 'Failed to process image');
                      } finally {
                        setIsUploading(false);
                      }
                    }
                  }}
                  disabled={isUploading}
                  className={`w-full text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-2 hover:bg-gray-400 dark:hover:bg-gray-400 ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  required={question.required}
                />
                
                {isUploading && (
                  <div className="flex items-center mt-4 text-blue-400">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing image...</span>
                  </div>
                )}
                
                {uploadError && (
                  <div className="text-red-500 mt-4 p-3 bg-red-900 bg-opacity-30 rounded-md">
                    {uploadError}
                  </div>
                )}
                
                <p className="text-sm text-gray-400 mt-4">
                  Supported formats: JPEG, PNG, GIF. Max file size: 15MB. Large images will be automatically compressed.
                </p>
              </div>
            )}
            {renderTeacherRemark()}
          </div>
        </div>
      );
    default:
      return <div>Unsupported question type</div>;
  }
};

// Maintain backward compatibility
export const UserInputQuestion = InputQuestion;

// Dummy component to satisfy Next.js page requirements
function ConceptModuleComponent() {
  return <div>This is a component module, not a page.</div>;
}

export default ConceptModuleComponent;