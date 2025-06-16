import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Minimize2, Settings, AlertCircle, CheckCircle, Upload, X, Image as ImageIcon, Wifi, WifiOff, Eye, EyeOff } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import { OllamaService, OllamaModel, ChatMessage } from '../services/ollamaService';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isStreaming?: boolean;
  image?: string; // Base64 encoded image
  imageName?: string;
}

interface AIAssistantProps {
  width: number;
}

// Function to parse and format mathematical expressions
const formatMathContent = (text: string) => {
  // Split text by math delimiters while preserving the delimiters
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$|\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\})/);
  
  return parts.map((part, index) => {
    // Block math ($$...$$)
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const math = part.slice(2, -2).trim();
      return (
        <div key={index} className="my-3 p-3 border-2 border-blue-700 bg-blue-950 rounded">
          <BlockMath math={math} />
        </div>
      );
    }
    
    // Inline math ($...$)
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const math = part.slice(1, -1).trim();
      return (
        <span key={index} className="inline-block px-2 py-1 mx-1 border border-blue-700 bg-blue-950 rounded">
          <InlineMath math={math} />
        </span>
      );
    }
    
    // LaTeX environments (like \begin{align}...\end{align})
    if (part.includes('\\begin{') && part.includes('\\end{')) {
      return (
        <div key={index} className="my-3 p-3 border-2 border-blue-700 bg-blue-950 rounded">
          <BlockMath math={part} />
        </div>
      );
    }
    
    // Regular text - split by newlines and preserve formatting
    return part.split('\n').map((line, lineIndex, lines) => (
      <React.Fragment key={`${index}-${lineIndex}`}>
        {line}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  });
};

const AIAssistant: React.FC<AIAssistantProps> = ({ width }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your calculus tutor AI powered by Ollama. I'm here to help you understand limits, derivatives, integrals, and all the concepts in your modules. Ask me anything about calculus!\n\nFor mathematical expressions, I'll format them properly. For example:\n- Derivatives: $\\frac{d}{dx}[x^2] = 2x$\n- Integrals: $\\int x^2 dx = \\frac{x^3}{3} + C$\n- Limits: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$\n\nYou can also upload images or drag and drop them here to analyze mathematical problems, graphs, or diagrams!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [availableModels, setAvailableModels] = useState<OllamaModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isModelConnected, setIsModelConnected] = useState(false);
  const [isConnectingModel, setIsConnectingModel] = useState(false);
  const [modelConnectionError, setModelConnectionError] = useState<string>('');
  const [visionCapabilities, setVisionCapabilities] = useState<{[key: string]: boolean}>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced vision model detection with proper Gemma 3 support
  const isVisionModel = (modelName: string): boolean => {
    // Check if we've already tested this model
    if (visionCapabilities[modelName] !== undefined) {
      return visionCapabilities[modelName];
    }

    const lowerName = modelName.toLowerCase();

    // ALL Gemma models support vision (confirmed by user testing)
    if (lowerName.includes('gemma')) {
      return true;
    }

    // Known vision model patterns
    const visionKeywords = [
      'llava',
      'vision',
      'multimodal', 
      'bakllava',
      'moondream',
      'minicpm-v',
      'cogvlm',
      'qwen-vl',
      'qwen3', // Qwen 3 models often support vision
      'internvl',
      'yi-vl',
      'phi4', // Some Phi models support vision
      'deepseek-r1' // DeepSeek R1 models may support vision
    ];

    // Check for matches
    return visionKeywords.some(keyword => lowerName.includes(keyword));
  };

  // Test if a model actually supports vision by attempting to send an image
  const testVisionCapability = async (modelName: string): Promise<boolean> => {
    try {
      // Create a small test image (1x1 pixel transparent PNG)
      const testImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      
      const testMessages: ChatMessage[] = [
        { 
          role: 'user', 
          content: 'Can you see this image? Just respond with "yes" or "no".',
          images: [testImage]
        }
      ];

      await OllamaService.sendChatMessage(modelName, testMessages);
      return true;
    } catch (error) {
      // If the model doesn't support vision, it will likely throw an error
      return false;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkConnection = async () => {
    try {
      setConnectionError('');
      const connected = await OllamaService.checkOllamaConnection();
      setIsConnected(connected);
      
      if (connected) {
        const models = await OllamaService.getAvailableModels();
        setAvailableModels(models);
        if (models.length > 0 && !selectedModel) {
          setSelectedModel(models[0].name);
        }
      } else {
        setConnectionError('Ollama is not running. Please start Ollama and try again.');
        setIsModelConnected(false);
      }
    } catch (error) {
      setIsConnected(false);
      setIsModelConnected(false);
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect to Ollama');
    }
  };

  const connectToModel = async () => {
    if (!selectedModel || !isConnected) return;

    setIsConnectingModel(true);
    setModelConnectionError('');

    try {
      // Test basic connectivity first
      const testMessages: ChatMessage[] = [
        { role: 'user', content: 'Hello, are you working?' }
      ];

      await OllamaService.sendChatMessage(selectedModel, testMessages);
      setIsModelConnected(true);
      setModelConnectionError('');

      // Test vision capability if we think it's a vision model
      if (isVisionModel(selectedModel)) {
        console.log(`Testing vision capability for ${selectedModel}...`);
        const hasVision = await testVisionCapability(selectedModel);
        setVisionCapabilities(prev => ({
          ...prev,
          [selectedModel]: hasVision
        }));
        
        if (!hasVision) {
          console.log(`${selectedModel} does not actually support vision despite the name`);
        } else {
          console.log(`${selectedModel} confirmed to support vision`);
        }
      }

    } catch (error) {
      setIsModelConnected(false);
      setModelConnectionError(error instanceof Error ? error.message : 'Failed to connect to model');
    } finally {
      setIsConnectingModel(false);
    }
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('Image size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setSelectedImage(base64);
      setSelectedImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageUpload(imageFile);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setSelectedImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async () => {
    if ((!inputText.trim() && !selectedImage) || !selectedModel || isLoading || !isModelConnected) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText || (selectedImage ? "Please analyze this image:" : ""),
      isUser: true,
      timestamp: new Date(),
      image: selectedImage || undefined,
      imageName: selectedImageName || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    setSelectedImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsLoading(true);

    // Create AI response message that will be updated as we stream
    const aiMessageId = messages.length + 2;
    const aiMessage: Message = {
      id: aiMessageId,
      text: '',
      isUser: false,
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
      // Prepare chat history for Ollama
      const chatHistory: ChatMessage[] = [
        { role: 'system', content: OllamaService.getSystemPrompt() },
        ...messages.slice(-10).map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.text,
          images: msg.image ? [msg.image.split(',')[1]] : undefined // Remove data:image/...;base64, prefix
        })),
        { 
          role: 'user', 
          content: inputText || "Please analyze this image and help me understand any mathematical concepts, problems, or diagrams shown.",
          images: selectedImage ? [selectedImage.split(',')[1]] : undefined
        }
      ];

      let fullResponse = '';

      await OllamaService.sendChatMessage(
        selectedModel,
        chatHistory,
        (chunk: string) => {
          fullResponse += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: fullResponse, isStreaming: true }
              : msg
          ));
        }
      );

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: fullResponse, isStreaming: false }
          : msg
      ));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response from AI';
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Error: ${errorMessage}`, isStreaming: false }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  // Get the actual vision status for the selected model
  const getVisionStatus = () => {
    if (!selectedModel) return false;
    
    // If we've tested this model, use the actual result
    if (visionCapabilities[selectedModel] !== undefined) {
      return visionCapabilities[selectedModel];
    }
    
    // Otherwise, use the heuristic
    return isVisionModel(selectedModel);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="p-3 bg-blue-600 hover:bg-blue-700 border-2 border-blue-500 text-white transition-colors duration-200"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={dropZoneRef}
      className={`bg-black border-l-2 border-blue-500 flex flex-col transition-all duration-200 fixed right-0 top-0 h-screen ${
        isDragOver ? 'border-blue-400 bg-blue-950' : ''
      }`}
      style={{ width: `${width}px` }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center z-50 border-2 border-dashed border-blue-400">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-400 font-mono">
              DROP IMAGE HERE
            </p>
            <p className="text-sm text-blue-300 font-mono">
              Analyze mathematical problems & diagrams
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-4 border-b-2 border-blue-500 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-white font-mono">CALC TUTOR AI</h3>
          <div className="flex items-center space-x-1">
            {isConnected ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
            {isModelConnected ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-gray-400" />
            )}
            {getVisionStatus() ? (
              <Eye className="w-4 h-4 text-purple-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-blue-900 transition-colors duration-200"
          >
            <Settings className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-blue-900 transition-colors duration-200"
          >
            <Minimize2 className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b-2 border-blue-500 bg-gray-900 flex-shrink-0">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-white font-mono mb-1">
                OLLAMA MODEL:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setIsModelConnected(false); // Reset connection status when model changes
                  setModelConnectionError('');
                }}
                className="w-full p-2 border-2 border-blue-500 bg-black text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={!isConnected}
              >
                {availableModels.length === 0 ? (
                  <option value="">No models available</option>
                ) : (
                  availableModels.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name} {isVisionModel(model.name) ? '👁️' : ''}
                    </option>
                  ))
                )}
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={checkConnection}
                className="flex-1 p-2 border-2 border-blue-500 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs transition-colors duration-200"
              >
                REFRESH
              </button>
              <button
                onClick={connectToModel}
                disabled={!selectedModel || !isConnected || isConnectingModel}
                className="flex-1 p-2 border-2 border-green-500 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:border-gray-500 text-white font-mono text-xs transition-colors duration-200"
              >
                {isConnectingModel ? 'TESTING...' : 'CONNECT'}
              </button>
            </div>

            {connectionError && (
              <div className="p-2 border-2 border-red-500 bg-red-950">
                <p className="text-xs font-mono text-red-300">
                  {connectionError}
                </p>
              </div>
            )}

            {modelConnectionError && (
              <div className="p-2 border-2 border-red-500 bg-red-950">
                <p className="text-xs font-mono text-red-300">
                  Model Error: {modelConnectionError}
                </p>
              </div>
            )}

            <div className="p-2 border-2 border-blue-500 bg-blue-950">
              <div className="text-xs font-mono text-gray-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Ollama:</span>
                  <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Model:</span>
                  <span className={isModelConnected ? 'text-green-400' : 'text-red-400'}>
                    {isModelConnected ? 'Ready' : 'Not Connected'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vision:</span>
                  <span className={getVisionStatus() ? 'text-purple-400' : 'text-gray-400'}>
                    {selectedModel && visionCapabilities[selectedModel] !== undefined 
                      ? (visionCapabilities[selectedModel] ? 'Tested ✓' : 'Tested ✗')
                      : (getVisionStatus() ? 'Detected' : 'Disabled')
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Models:</span>
                  <span>{availableModels.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Width:</span>
                  <span>{width}px</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area - This is the scrollable section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ai-chat-scroll">
        {messages.map((message) => (
          <div key={message.id} className={`${message.isUser ? 'ml-4' : 'mr-4'}`}>
            <div className={`p-3 border-2 ${
              message.isUser 
                ? 'border-blue-500 bg-blue-900 ml-auto' 
                : 'border-gray-700 bg-gray-800'
            }`}>
              {/* Image display for user messages */}
              {message.image && (
                <div className="mb-3">
                  <img 
                    src={message.image} 
                    alt={message.imageName || "Uploaded image"}
                    className="max-w-full h-auto border border-blue-700 rounded"
                    style={{ maxHeight: '200px' }}
                  />
                  {message.imageName && (
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      📎 {message.imageName}
                    </p>
                  )}
                </div>
              )}
              
              <div className="text-sm font-mono text-white leading-relaxed">
                {message.isUser ? (
                  // User messages - plain text
                  <span className="whitespace-pre-wrap">{message.text}</span>
                ) : (
                  // AI messages - format math expressions
                  <div className="whitespace-pre-wrap">
                    {formatMathContent(message.text)}
                    {message.isStreaming && <span className="animate-pulse">▋</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t-2 border-blue-500 flex-shrink-0">
        {/* Image preview */}
        {selectedImage && (
          <div className="mb-3 p-2 border-2 border-blue-700 bg-blue-950 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-blue-300">
                📎 {selectedImageName}
              </span>
              <button
                onClick={removeSelectedImage}
                className="p-1 hover:bg-blue-800 rounded transition-colors duration-200"
              >
                <X className="w-3 h-3 text-blue-400" />
              </button>
            </div>
            <img 
              src={selectedImage} 
              alt="Selected"
              className="max-w-full h-auto border border-blue-700 rounded"
              style={{ maxHeight: '100px' }}
            />
          </div>
        )}

        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder={isModelConnected ? "Ask about calculus or upload an image..." : "Connect to model first..."}
            disabled={!isConnected || !isModelConnected || isLoading}
            className="flex-1 p-2 border-2 border-blue-500 bg-black text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={!isConnected || !isModelConnected || isLoading}
            className="p-2 border-2 border-blue-500 bg-black hover:bg-blue-950 text-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Upload image"
          >
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || !isModelConnected || isLoading || (!inputText.trim() && !selectedImage)}
            className="p-2 border-2 border-blue-500 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {!isConnected && (
          <p className="text-xs font-mono text-red-400">
            Start Ollama to enable AI chat
          </p>
        )}

        {isConnected && !isModelConnected && (
          <p className="text-xs font-mono text-yellow-400">
            Click CONNECT to test the selected model
          </p>
        )}

        {isConnected && isModelConnected && selectedImage && !getVisionStatus() && (
          <p className="text-xs font-mono text-yellow-400">
            For image analysis, use a vision model like llava or gemma
          </p>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;