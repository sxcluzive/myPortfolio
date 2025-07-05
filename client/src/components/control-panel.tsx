import React from 'react';
import { useView } from '@/contexts/view-context';
import ThemeSwitcher from './theme-switcher';

export default function ControlPanel() {
  const { currentView, setCurrentView } = useView();

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="bg-terminal-bg/95 backdrop-blur-sm border border-terminal-border rounded-lg p-2 shadow-lg">
        <div className="text-xs text-muted-foreground mb-2 text-center font-medium border-b border-terminal-border pb-1">
          <i className="fas fa-cog mr-1"></i>CONTROLS
        </div>
        
        {/* View Mode Switcher */}
        <div className="mb-2">
          <div className="text-xs text-muted-foreground mb-1">View</div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentView('normal')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                currentView === 'normal'
                  ? 'bg-matrix text-terminal-bg'
                  : 'bg-terminal-gray text-muted-foreground hover:text-matrix hover:bg-terminal-border'
              }`}
              title="Normal View"
            >
              <i className="fas fa-user mr-1"></i>
              Normal
            </button>
            <button
              onClick={() => setCurrentView('dev')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                currentView === 'dev'
                  ? 'bg-cyan-glow text-terminal-bg'
                  : 'bg-terminal-gray text-muted-foreground hover:text-cyan-glow hover:bg-terminal-border'
              }`}
              title="Developer View"
            >
              <i className="fas fa-code mr-1"></i>
              Dev
            </button>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="mb-2">
          <div className="text-xs text-muted-foreground mb-1">Theme</div>
          <ThemeSwitcher />
        </div>

        {/* Status Indicator */}
        <div className="pt-1 border-t border-terminal-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 