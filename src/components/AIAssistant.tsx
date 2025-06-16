import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Minimize2, Settings, AlertCircle, CheckCircle } from 'lucide-react';
import { OllamaService, OllamaModel, ChatMessage } from '../services/ollamaService';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

interface AIAssistantProps {
  width: number;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ width }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your calculus tutor AI powered by Ollama. I'm here to help you understand limits, derivatives, integrals, and all the concepts in your modules. Ask me anything about calculus!",
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      }
    } catch (error) {
      setIsConnected(false);
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect to Ollama');
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedModel || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
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
          content: msg.text
        })),
        { role: 'user', content: inputText }
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
      className="bg-white dark:bg-black border-l-2 border-blue-500 flex flex-col transition-all duration-200 fixed right-0 top-0 h-screen"
      style={{ width: `${width}px` }}
    >
      {/* Header */}
      <div className="p-4 border-b-2 border-blue-500 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-black dark:text-white font-mono">CALC TUTOR AI</h3>
          {isConnected ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
          >
            <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
          >
            <Minimize2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b-2 border-blue-500 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-black dark:text-white font-mono mb-1">
                OLLAMA MODEL:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border-2 border-blue-500 bg-white dark:bg-black text-black dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={!isConnected}
              >
                {availableModels.length === 0 ? (
                  <option value="">No models available</option>
                ) : (
                  availableModels.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name}
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
            </div>

            {connectionError && (
              <div className="p-2 border-2 border-red-500 bg-red-50 dark:bg-red-950">
                <p className="text-xs font-mono text-red-700 dark:text-red-300">
                  {connectionError}
                </p>
              </div>
            )}

            <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
              Status: {isConnected ? 'Connected' : 'Disconnected'}
              <br />
              Models: {availableModels.length}
              <br />
              Width: {width}px
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
                ? 'border-blue-500 bg-blue-100 dark:bg-blue-900 ml-auto' 
                : 'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'
            }`}>
              <p className="text-sm font-mono text-black dark:text-white leading-relaxed whitespace-pre-wrap">
                {message.text}
                {message.isStreaming && <span className="animate-pulse">▋</span>}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t-2 border-blue-500 flex-shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder={isConnected ? "Ask about calculus..." : "Connect to Ollama first..."}
            disabled={!isConnected || isLoading}
            className="flex-1 p-2 border-2 border-blue-500 bg-white dark:bg-black text-black dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || isLoading || !inputText.trim()}
            className="p-2 border-2 border-blue-500 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {!isConnected && (
          <p className="text-xs font-mono text-red-600 dark:text-red-400 mt-2">
            Start Ollama to enable AI chat
          </p>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;