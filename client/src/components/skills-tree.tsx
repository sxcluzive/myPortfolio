import React from 'react';

export default function SkillsTree() {
  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg p-6 font-mono text-sm">
      <div className="text-matrix mb-4">
        <i className="fas fa-code-branch mr-2"></i>
        Technical Skills Tree
        <span className="text-muted-foreground ml-2">21 Technologies</span>
      </div>
      
      <div className="space-y-1 text-xs">
        {/* Backend Development */}
        <div className="text-cyan-glow font-bold">
          ├── Backend Development
        </div>
        <div className="ml-4 space-y-1">
          <div className="text-cyan-glow">│ ├── Python</div>
          <div className="text-cyan-glow">│ ├── Django</div>
          <div className="text-cyan-glow">│ ├── FastAPI</div>
          <div className="text-cyan-glow">│ ├── Flask</div>
          <div className="text-cyan-glow">│ ├── RESTful APIs</div>
          <div className="text-cyan-glow">│ ├── System Design</div>
          <div className="text-cyan-glow">│ ├── SQL</div>
          <div className="text-cyan-glow">│ ├── Celery</div>
          <div className="text-cyan-glow">│ └── Microservices</div>
        </div>

        {/* Database & Cloud */}
        <div className="text-green-400 font-bold">
          ├── Database & Cloud
        </div>
        <div className="ml-4 space-y-1">
          <div className="text-green-400">│ ├── PostgreSQL</div>
          <div className="text-green-400">│ ├── Elasticsearch</div>
          <div className="text-green-400">│ ├── Redis</div>
          <div className="text-green-400">│ ├── AWS (EC2, S3)</div>
          <div className="text-green-400">│ ├── Azure</div>
          <div className="text-green-400">│ └── Zscaler ZIA cloud</div>
        </div>

        {/* AI/ML & DevOps */}
        <div className="text-purple-400 font-bold">
          └── AI/ML & DevOps
        </div>
        <div className="ml-4 space-y-1">
          <div className="text-purple-400">    ├── Model Context Protocol (MCP)</div>
          <div className="text-purple-400">    ├── LLM Integration</div>
          <div className="text-purple-400">    ├── Predictive Analytics</div>
          <div className="text-purple-400">    ├── Docker</div>
          <div className="text-purple-400">    ├── CI/CD (Jenkins)</div>
          <div className="text-purple-400">    └── Git</div>
        </div>
      </div>

      {/* Technology Count Summary */}
      <div className="mt-6 pt-4 border-t border-terminal-border">
        <div className="text-matrix font-bold mb-3 flex items-center">
          <i className="fas fa-chart-pie mr-2"></i>
          Technology Distribution
        </div>
        <div className="text-xs space-y-2 ml-4">
          <div className="flex items-center justify-between">
            <span className="text-cyan-glow">Backend Development</span>
            <span className="text-muted-foreground">9 technologies</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-400">Database & Cloud</span>
            <span className="text-muted-foreground">6 technologies</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-purple-400">AI/ML & DevOps</span>
            <span className="text-muted-foreground">6 technologies</span>
          </div>
          <div className="border-t border-terminal-border pt-2 mt-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-matrix">Total</span>
              <span className="text-matrix">21 technologies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Level Indicators */}
      <div className="mt-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-cyan-glow rounded-full mr-2"></div>
            <span>Backend</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span>Database/Cloud</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
            <span>AI/ML/DevOps</span>
          </div>
        </div>
      </div>
    </div>
  );
} 