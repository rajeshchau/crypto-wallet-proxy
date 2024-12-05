import React from 'react';
import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4">
      <div className="flex items-center space-x-2">
        <Zap className="w-6 h-6 text-yellow-400" />
        <span className="text-white font-semibold">Code Editor</span>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
          Run
        </button>
      </div>
    </header>
  );
}