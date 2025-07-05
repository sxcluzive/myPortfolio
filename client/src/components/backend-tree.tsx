import React from 'react';

export default function BackendTree() {
  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg p-6 font-mono text-sm">
      <div className="text-cyan-glow mb-4">
        <i className="fas fa-server mr-2"></i>
        Backend Development Stack
        <span className="text-muted-foreground ml-2">9 Technologies</span>
      </div>
      
      <div className="space-y-1 text-xs">
        <div className="text-cyan-glow font-bold">
          ├── Python Ecosystem
        </div>
        <div className="ml-4 space-y-1">
          <div className="text-cyan-glow">│ ├── Python</div>
          <div className="text-cyan-glow">│ ├── Django</div>
          <div className="text-cyan-glow">│ ├── FastAPI</div>
          <div className="text-cyan-glow">│ └── Flask</div>
        </div>

        <div className="text-cyan-glow font-bold">
          ├── API & Architecture
        </div>
        <div className="ml-4 space-y-1">
          <div className="text-cyan-glow">│ ├── RESTful APIs</div>
          <div className="text-cyan-glow">│ ├── System Design</div>
          <div className="text-cyan-glow">│ └── Microservices</div>
        </div>

        <div className="text-cyan-glow font-bold">
          └── Data & Processing
        </div>
        <div className="ml-4 space-y-1">
          <div className="text-cyan-glow">    ├── SQL</div>
          <div className="text-cyan-glow">    └── Celery</div>
        </div>
      </div>

      {/* Backend Stats */}
      <div className="mt-6 pt-4 border-t border-terminal-border">
        <div className="text-cyan-glow font-bold mb-3 flex items-center">
          <i className="fas fa-chart-line mr-2"></i>
          Backend Metrics
        </div>
        <div className="text-xs space-y-2 ml-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Frameworks:</span>
            <span className="text-cyan-glow">4 (Django, FastAPI, Flask)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Architecture:</span>
            <span className="text-cyan-glow">Microservices, REST</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Processing:</span>
            <span className="text-cyan-glow">Async, Background Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
} 