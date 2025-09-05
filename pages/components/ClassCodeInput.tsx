import { useState, useRef, useEffect } from 'react';

interface ClassCodeInputProps {
  onSubmit: (code: string) => void;
  isLoading: boolean;
  resetAfterSubmit?: boolean;
}

const ClassCodeInput = ({ onSubmit, isLoading, resetAfterSubmit = false }: ClassCodeInputProps) => {
  const [codeChars, setCodeChars] = useState<string[]>(Array(6).fill(''));
  // Reference for input elements
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  
  // Reset input when resetAfterSubmit changes to true
  useEffect(() => {
    if (resetAfterSubmit) {
      setCodeChars(Array(6).fill(''));
      // Focus the first input after clearing
      codeInputRefs.current[0]?.focus();
    }
  }, [resetAfterSubmit]);
  
  // Function to handle code input changes
  const handleCodeChange = (index: number, value: string) => {
    // Force uppercase
    const uppercaseValue = value.toUpperCase();
    
    // Update the character at the specified index
    const newCodeChars = [...codeChars];
    
    // Take only the last character if multiple characters are pasted
    newCodeChars[index] = uppercaseValue.slice(-1);
    setCodeChars(newCodeChars);
    
    // Move focus to the next input if a character was entered
    if (uppercaseValue && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle key press for backspace to navigate backward
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace is pressed and the current input is empty, focus the previous input
    if (e.key === 'Backspace' && !codeChars[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };
  
  // Handle pasting the code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().toUpperCase().slice(0, 6);
    
    if (pastedData) {
      const newCodeChars = [...codeChars];
      
      // Fill in as many characters as provided in the paste data
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newCodeChars[i] = pastedData[i];
      }
      
      setCodeChars(newCodeChars);
      
      // Focus the next empty input or the last input if all are filled
      const nextEmptyIndex = newCodeChars.findIndex(char => !char);
      if (nextEmptyIndex !== -1) {
        codeInputRefs.current[nextEmptyIndex]?.focus();
      } else {
        codeInputRefs.current[5]?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedCode = codeChars.join('');
    if (combinedCode.length === 6) {
      onSubmit(combinedCode);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="flex justify-center space-x-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                codeInputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={codeChars[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-10 h-12 text-center font-bold text-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent uppercase"
            />
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || codeChars.join('').length !== 6}
        className={`w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 transition text-white font-medium ${
          (isLoading || codeChars.join('').length !== 6) ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Joining...' : 'Join Class'}
      </button>
    </form>
  );
};

export default ClassCodeInput; 