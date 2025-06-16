import React from 'react';
import { Calculator } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b-2 border-blue-500 bg-black p-4">
      <div className="flex items-center">
        {/* Left side - Logo and title */}
        <div className="flex items-center space-x-3">
          <div className="p-2 border-2 border-blue-500 bg-blue-900">
            <Calculator className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-mono">
              CALCULUS.EXE
            </h1>
            <p className="text-sm text-gray-400 font-mono">
              8-BIT LEARNING SYSTEM v1.0
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};