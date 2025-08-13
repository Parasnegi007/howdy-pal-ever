// Mock AI Service for demo purposes
export interface AIResponse {
  content: string;
  confidence: number;
  codeBlocks?: CodeBlock[];
  suggestions?: string[];
}

export interface CodeBlock {
  language: string;
  code: string;
}

export interface CodeAnalysis {
  issues: CodeIssue[];
  suggestions: CodeSuggestion[];
  complexity: number;
  maintainability: number;
  performance: number;
}

export interface CodeIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  line: number;
  fixable: boolean;
}

export interface CodeSuggestion {
  type: string;
  description: string;
}

class AIService {
  static async generateResponse(input: string, activeFile: string, currentCode: string): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return {
      content: this.generateMockResponse(input, activeFile, currentCode),
      confidence: 0.85 + Math.random() * 0.15
    };
  }

  static async analyzeCode(code: string, language: string): Promise<CodeAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lines = code.split('\n').length;
    const complexity = Math.min(10, Math.max(1, Math.floor(lines / 10) + Math.floor(Math.random() * 3)));
    const languageMultiplier = language === 'typescript' ? 0.9 : 1.0;
    
    return {
      complexity,
      maintainability: Math.floor((70 + Math.random() * 30) * languageMultiplier),
      performance: Math.floor(60 + Math.random() * 40),
      issues: lines > 50 ? [
        { 
          type: 'warning' as const,
          line: Math.floor(Math.random() * lines), 
          message: "Consider breaking this into smaller functions", 
          fixable: true 
        }
      ] : [],
      suggestions: [
        { type: "Performance", description: "Add error handling for better reliability" },
        { type: "Maintainability", description: "Consider adding JSDoc comments" }
      ]
    };
  }

  static async optimizeCode(code: string, language: string): Promise<AIResponse> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const codeLength = code.length;
    
    return {
      content: `## 🚀 Code Optimization Suggestions\n\nI've analyzed your ${language} code (${codeLength} characters) and here are my recommendations:\n\n### Performance Improvements:\n• Use const/let instead of var for better scoping\n• Consider memoization for expensive calculations\n• Optimize loops for better performance\n\n### Code Quality:\n• Add error handling and validation\n• Improve variable naming for clarity\n• Break down complex functions\n\n**Would you like me to apply any of these optimizations?**`,
      confidence: 0.9
    };
  }

  static async explainCode(code: string, language: string): Promise<AIResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const lineCount = code.split('\n').length;
    
    return {
      content: `## 📖 Code Explanation\n\nThis ${language} code (${lineCount} lines) appears to:\n\n🔍 **Main Function**: Processes data and returns results\n⚡ **Key Operations**: Variable declarations, function calls, and control flow\n🧩 **Structure**: Well-organized with clear separation of concerns\n\n**Key Components:**\n• Variables and constants for data storage\n• Functions for business logic\n• Control structures for flow management\n\nThe code follows good practices and is generally well-structured!`,
      confidence: 0.88
    };
  }

  static async generateCode(prompt: string, language: string, context: string): Promise<AIResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const codeBlocks = [{
      language: language,
      code: this.generateMockCode(prompt, language)
    }];

    return {
      content: `## 💡 Generated Code\n\nBased on your request: "${prompt}"\n\nHere's a ${language} implementation with context: ${context}:\n\n\`\`\`${language}\n${codeBlocks[0].code}\n\`\`\`\n\n**Features:**\n• Clean, readable code structure\n• Proper error handling\n• Good performance characteristics\n• Follows best practices`,
      codeBlocks,
      confidence: 0.85
    };
  }

  private static generateMockResponse(input: string, activeFile: string, currentCode: string): string {
    const inputKeywords = input.toLowerCase();
    const responses = [
      `Great question! Looking at your ${activeFile} file, I can help you with that. Based on "${inputKeywords}", here's what I suggest:\n\n• Review the current implementation\n• Consider alternative approaches\n• Optimize for performance and readability\n\nWould you like me to provide specific code examples?`,
      
      `I'd be happy to help with your ${activeFile}! Based on your code:\n\n🔍 **Analysis**: Your current approach is solid\n⚡ **Optimization**: We could improve performance here\n🛠️ **Suggestions**: A few tweaks would make this even better\n\nWhat specific aspect would you like me to focus on?`,
      
      `Excellent question about your code! For the ${activeFile} file:\n\n**Current State**: ${currentCode.split('\n').length} lines of code\n**Potential**: Great foundation to build upon\n**Next Steps**: Let's enhance this together\n\nShall we dive into specific improvements?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private static generateMockCode(prompt: string, language: string): string {
    const templates: Record<string, string> = {
      javascript: `// Generated based on: ${prompt}\nfunction solution() {\n  // Implementation here\n  return result;\n}`,
      typescript: `// Generated based on: ${prompt}\ninterface Config {\n  // Type definitions\n}\n\nfunction solution(): Config {\n  // Implementation here\n  return result;\n}`,
      python: `# Generated based on: ${prompt}\ndef solution():\n    # Implementation here\n    return result`,
      default: `// Generated based on: ${prompt}\n// Implementation code here`
    };
    
    return templates[language] || templates.default;
  }
}

export { AIService };
export default AIService;