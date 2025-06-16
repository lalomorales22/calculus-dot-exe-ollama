import React from 'react';
import { Calculator, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b-2 border-blue-500 bg-white dark:bg-black p-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and title */}
        <div className="flex items-center space-x-3">
          <div className="p-2 border-2 border-blue-500 bg-blue-100 dark:bg-blue-900">
            <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white font-mono">
              CALCULUS.EXE
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              8-BIT LEARNING SYSTEM v1.0
            </p>
          </div>
        </div>
        
        {/* Right side - Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 border-2 border-blue-500 bg-white dark:bg-black hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          ) : (
            <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;