import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import ModuleCard from './components/ModuleCard';
import AIAssistant from './components/AIAssistant';
import { modulesData } from './data/modulesData';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Header />
        
        <div className="flex">
          <main className="flex-1 p-6 pr-80">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black dark:text-white font-mono mb-2">
                CALCULUS REFERENCE SYSTEM
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-mono">
                Complete formulas, theorems, and concepts for all 7 modules
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
            
            <div className="mt-8 p-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
              <h2 className="text-lg font-bold text-black dark:text-white font-mono mb-2">
                SYSTEM INFO
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                • Click module headers to expand content<br/>
                • Use AI assistant for personalized help<br/>
                • Toggle light/dark mode in header<br/>
                • All formulas rendered with LaTeX
              </p>
            </div>
          </main>
          
          <AIAssistant />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;