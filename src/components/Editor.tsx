import React from 'react';
import { FileText, Code, Database, X } from 'lucide-react';

interface EditorProps {
  activeFile: string | null;
  openFiles: string[];
  fileContents: Record<string, string>;
  onFileClose: (filePath: string) => void;
  onFileSelect: React.Dispatch<React.SetStateAction<string | null>>;
  onCodeChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ 
  activeFile, 
  openFiles, 
  fileContents, 
  onFileClose, 
  onFileSelect, 
  onCodeChange 
}) => {
  const getFileIcon = (fileName: string) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <Code className="w-4 h-4 text-blue-500" />;
      case 'json':
        return <Database className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Tab Bar */}
      {openFiles.length > 0 && (
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {openFiles.map((file) => (
            <div
              key={file}
              className={`flex items-center gap-2 px-3 py-2 border-r border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                activeFile === file ? 'bg-white dark:bg-gray-900' : ''
              }`}
              onClick={() => onFileSelect(file)}
            >
              {getFileIcon(file)}
              <span className="text-sm">{file.split('/').pop()}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileClose(file);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex-1 p-4">
        <textarea
          value={activeFile ? fileContents[activeFile] || '' : ''}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-full h-full resize-none border-none outline-none bg-transparent text-sm font-mono text-gray-800 dark:text-gray-200"
          placeholder="Start typing your code..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default Editor;