import { useState } from "react";
import ThemeSwitcher from "./theme-switcher";

type Theme = "matrix" | "macos" | "ubuntu";

export default function TerminalHeader() {
  return (
    <header className="relative z-10 border-b border-terminal-border bg-terminal-gray/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Terminal window controls and prompt */}
          <div className="flex items-center space-x-4">
            {/* Terminal window controls */}
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" title="Close"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" title="Minimize"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" title="Maximize"></div>
            </div>
            
            {/* Terminal prompt */}
            <div className="flex items-center space-x-2">
              <span className="text-cyan-glow">shubham</span>
              <span className="text-muted-foreground">@</span>
              <span className="text-amber-glow">shubhxcluzive</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-matrix">~</span>
              <span className="text-muted-foreground">$</span>
            </div>
          </div>
          
          {/* Center - Portfolio Title */}
          <div className="flex-1 flex justify-center">
            <div className="text-matrix font-bold text-lg">
            Designing Backends for Scale, Stability & Sanity.
            </div>
          </div>
          
          {/* Right side - System status indicators */}
          <div className="flex items-center space-x-6">
            {/* Network status */}
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">SECURE</span>
            </div>
            
            {/* Connection status */}
            <div className="flex items-center space-x-2 text-xs">
              <i className="fas fa-wifi text-cyan-glow"></i>
              <span className="text-matrix">Connected</span>
            </div>
            
            {/* System status */}
            <div className="flex items-center space-x-2 text-xs">
              <i className="fas fa-server text-amber-glow"></i>
              <span className="text-matrix">Online</span>
            </div>
            
            {/* Time (optional) */}
            <div className="flex items-center space-x-2 text-xs border-l border-terminal-border pl-4">
              <i className="fas fa-clock text-muted-foreground"></i>
              <span className="text-muted-foreground">
                {new Date().toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
