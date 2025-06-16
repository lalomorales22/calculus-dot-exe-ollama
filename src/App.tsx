import React, { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import ModuleCard from './components/ModuleCard';
import AIAssistant from './components/AIAssistant';
import { modulesData } from './data/modulesData';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(320); // Default 320px (80 * 4)
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = containerRect.right - e.clientX;
    
    // Constrain width between 280px and 600px
    const constrainedWidth = Math.max(280, Math.min(600, newWidth));
    setSidebarWidth(constrainedWidth);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div ref={containerRef} className="flex relative">
        <main 
          className="flex-1 p-6 transition-all duration-200"
          style={{ marginRight: `${sidebarWidth}px` }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white font-mono mb-2">
              CALCULUS REFERENCE SYSTEM
            </h1>
            <p className="text-gray-400 font-mono">
              Complete formulas, theorems, and concepts for all 8 chunks
            </p>
          </div>
          
          <div className="space-y-4">
            {modulesData.map((module, index) => (
              <ModuleCard
                key={index}
                title={module.title}
                topics={module.topics}
              />
            ))}
          </div>
          
          <div className="mt-8 p-4 border-2 border-blue-500 bg-blue-950">
            <h2 className="text-lg font-bold text-white font-mono mb-2">
              SYSTEM INFO
            </h2>
            <p className="text-sm text-gray-300 font-mono">
              • Click chunk headers to expand content<br/>
              • Use AI assistant for personalized help<br/>
              • All formulas rendered with LaTeX<br/>
              • Drag the sidebar divider to resize<br/>
              • Upload images to AI for problem analysis
            </p>
          </div>
        </main>
        
        {/* Resize Handle */}
        <div
          className={`absolute top-0 bottom-0 w-1 bg-blue-500 hover:bg-blue-400 cursor-col-resize z-10 transition-colors duration-200 ${
            isResizing ? 'bg-blue-400' : ''
          }`}
          style={{ right: `${sidebarWidth}px` }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-blue-500 border border-blue-400 flex items-center justify-center">
            <div className="w-0.5 h-4 bg-black"></div>
          </div>
        </div>
        
        <AIAssistant width={sidebarWidth} />
      </div>
    </div>
  );
}

export default App;