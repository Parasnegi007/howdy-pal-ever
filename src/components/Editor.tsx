import React from 'react';
import { FileText, Code, Database } from 'lucide-react';

interface EditorProps {
  activeFile: string | null;
  fileContent: string;
  onCodeChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ activeFile, fileContent, onCodeChange }) => {
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
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        {getFileIcon(activeFile)}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {activeFile}
        </span>
      </div>
      <div className="flex-1 p-4">
        <textarea
          value={fileContent}
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