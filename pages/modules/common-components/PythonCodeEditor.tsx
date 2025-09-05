import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import PyodideLoader from './PyodideLoader';
import { useThemeContext } from '@/lib/ThemeContext';

interface PythonCodeEditorProps {
  initialCode?: string;
  height?: string;
  readOnly?: boolean;
  placeholder?: string;
  onCodeChange?: (code: string) => void;
  fontSize?: string;
  onErrorChange?: (errorMessage: string) => void;
}

interface PyodideInterface {
  runPython: (code: string) => any;
  globals: {
    get: (name: string) => any;
    set: (name: string, value: any) => void;
  };
  registerJsModule: (name: string, module: any) => void;
}

declare global {
  interface Window {
    loadPyodide: () => Promise<PyodideInterface>;
    pyodide: PyodideInterface | null;
  }
}

// Add loading animation when initializing
const LoadingIndicator = () => (
  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
    <div className="text-center">
      <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
      <p className="text-white text-sm">Loading Python...</p>
      <p className="text-gray-400 text-xs mt-2">This might take a few seconds</p>
    </div>
  </div>
);

const PythonCodeEditor: React.FC<PythonCodeEditorProps> = ({
  initialCode = '# Write your Python code here\nprint("Hello, World!")',
  height = '200px',
  readOnly = false,
  placeholder = 'Write your Python code here...',
  onCodeChange,
  fontSize = '16px',
  onErrorChange
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const pyodideReadyRef = useRef<boolean>(false);
  const maxLoadAttempts = 2;
  const { isDarkMode } = useThemeContext();

  // Custom CSS for font size
  const editorStyles = {
    fontSize: fontSize,
    fontFamily: 'monospace'
  };
  
  const outputStyles = {
    fontSize: fontSize,
    lineHeight: '1.5'
  };

  // Update code when initialCode prop changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Handle Pyodide loaded callback
  const handlePyodideLoaded = async () => {
    if (loadAttempts >= maxLoadAttempts) {
      setLoadFailed(true);
      return;
    }
    
    setIsLoading(true);
    setLoadAttempts(prev => prev + 1);
    
    try {
      // Give the window.loadPyodide time to be defined
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!window.loadPyodide) {
        throw new Error('Pyodide not available. Make sure the script loaded correctly.');
      }
      
      if (!window.pyodide) {
        console.log('Loading Pyodide instance...');
        window.pyodide = await window.loadPyodide();
        console.log('Pyodide loaded successfully!');
        
        // Setup stdout redirection with a more reliable approach
        await window.pyodide.runPython(`
          import sys
          import io
          
          class OutputCatcher:
              def __init__(self):
                  self.value = ''
              
              def write(self, text):
                  self.value += text
              
              def flush(self):
                  pass
          
          __stdout_catcher = OutputCatcher()
          __stderr_catcher = OutputCatcher()
          sys.stdout = __stdout_catcher
          sys.stderr = __stderr_catcher
        `);
        console.log('Stdout and stderr redirection configured');
      }
      
      pyodideReadyRef.current = true;
      setPyodideLoaded(true);
      setLoadFailed(false);
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
      setError(`Failed to load Python environment: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      if (loadAttempts >= maxLoadAttempts) {
        setLoadFailed(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Retry loading if it failed
  const handleRetry = () => {
    setLoadFailed(false);
    setError('');
    handlePyodideLoaded();
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    if (onCodeChange) {
      onCodeChange(value);
    }
  };

  const runCode = async () => {
    if (!pyodideReadyRef.current || !window.pyodide) {
      const errorMsg = 'Python environment is not ready yet. Please wait a moment and try again.';
      setError(errorMsg);
      if (onErrorChange) {
        onErrorChange(errorMsg);
      }
      return;
    }

    setIsLoading(true);
    setOutput('');
    setError('');
    if (onErrorChange) {
      onErrorChange('');
    }
    
    try {
      // Clear previous output by resetting the output catchers
      await window.pyodide.runPython(`
        if '__stdout_catcher' in globals():
            __stdout_catcher.value = ''
        if '__stderr_catcher' in globals():
            __stderr_catcher.value = ''
      `);
      
      // Run the code
      await window.pyodide.runPython(code);
      
      // Get the captured stdout
      const stdout = await window.pyodide.runPython(`__stdout_catcher.value if '__stdout_catcher' in globals() else ''`);
      const stderr = await window.pyodide.runPython(`__stderr_catcher.value if '__stderr_catcher' in globals() else ''`);
      
      if (stderr && stderr.trim().length > 0) {
        setError(stderr);
        if (onErrorChange) {
          onErrorChange(stderr);
        }
      }
      
      if (stdout && stdout.trim().length > 0) {
        setOutput(stdout);
      } else {
        setOutput('Code executed successfully without output.');
      }
    } catch (err: any) {
      console.error('Python execution error:', err);
      const errorMsg = err.message || 'An error occurred while running your code.';
      setError(errorMsg);
      
      // Try to get any stderr output that might help explain the error
      try {
        const stderr = await window.pyodide.runPython(`__stderr_catcher.value if '__stderr_catcher' in globals() else ''`);
        if (stderr && stderr.trim().length > 0) {
          const fullError = `${errorMsg}\n\n${stderr}`;
          setError(fullError);
          if (onErrorChange) {
            onErrorChange(fullError);
          }
        } else if (onErrorChange) {
          onErrorChange(errorMsg);
        }
      } catch (_) {
        // Ignore errors in error handling
        if (onErrorChange) {
          onErrorChange(errorMsg);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Render a fallback UI if loading failed
  if (loadFailed) {
    return (
      <div className="python-code-editor w-full">
        <div className={`code-area ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-t-lg overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <CodeMirror
            value={code}
            height={height}
            extensions={[python()]}
            onChange={handleCodeChange}
            theme={isDarkMode ? "dark" : "light"}
            placeholder={placeholder}
            readOnly={readOnly || isLoading}
            className="text-sm"
            style={editorStyles}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightSpecialChars: true,
              history: true,
              foldGutter: true,
              drawSelection: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              syntaxHighlighting: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              rectangularSelection: true,
              crosshairCursor: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              closeBracketsKeymap: true,
              searchKeymap: true,
            }}
          />
        </div>
        
        <div className={`controls-area ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex justify-between items-center border-x ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} text-sm`}>Python runtime failed to load</div>
          <button
            onClick={handleRetry}
            className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Retry Loading
          </button>
        </div>
        
        <div className={`output-area ${isDarkMode ? 'bg-black' : 'bg-white'} p-4 rounded-b-lg border border-t-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} min-h-[120px] max-h-[300px] overflow-auto`} style={outputStyles}>
          <div className={`${isDarkMode ? 'text-yellow-400' : 'text-amber-600'} font-medium`}>Python runtime not available</div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 text-sm`}>
            We couldn&apos;t load the Python environment in your browser. This might be due to:
          </p>
          <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1 space-y-1`}>
            <li>Slow internet connection</li>
            <li>Browser restrictions (try disabling ad blockers)</li>
            <li>Using a browser that doesn&apos;t support WebAssembly</li>
          </ul>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-3 text-sm`}>
            You can still view and edit the code, but you won&apos;t be able to run it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="python-code-editor w-full relative">
      <PyodideLoader onLoad={handlePyodideLoaded} />
      
      <div className={`code-area ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-t-lg overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} relative`}>
        {isLoading && <LoadingIndicator />}
        <CodeMirror
          value={code}
          height={height}
          extensions={[python()]}
          onChange={handleCodeChange}
          theme={isDarkMode ? "dark" : "light"}
          placeholder={placeholder}
          readOnly={readOnly || isLoading}
          className="text-sm"
          style={editorStyles}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            searchKeymap: true,
          }}
        />
      </div>
      
      <div className={`controls-area ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex justify-between items-center border-x ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          {isLoading ? 'Loading Python...' : pyodideLoaded ? 'Python 3.11 Ready' : 'Python not loaded'}
        </div>
        <button
          onClick={runCode}
          disabled={isLoading || !pyodideLoaded}
          className={`px-4 py-1 rounded ${
            isLoading || !pyodideLoaded
              ? isDarkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-400 text-gray-600'
              : isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
          } transition-colors cursor-${isLoading || !pyodideLoaded ? 'not-allowed' : 'pointer'}`}
        >
          {isLoading ? 'Processing...' : 'Run Code ▶'}
        </button>
      </div>
      
      <div className={`output-area ${isDarkMode ? 'bg-black' : 'bg-white'} p-4 rounded-b-lg border border-t-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} min-h-[120px] max-h-[300px] overflow-auto`} style={outputStyles}>
        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs mb-2`}>Output:</div>
        {error ? (
          <pre className={`${isDarkMode ? 'text-red-400' : 'text-red-500'} font-mono whitespace-pre-wrap`}>{error}</pre>
        ) : output ? (
          <pre className={`${isDarkMode ? 'text-green-300' : 'text-green-600'} font-mono whitespace-pre-wrap`}>{output}</pre>
        ) : (
          <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} italic`}>Run your code to see output here</div>
        )}
      </div>
    </div>
  );
};

export default PythonCodeEditor; 