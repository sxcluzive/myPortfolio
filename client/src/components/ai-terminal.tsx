import React from 'react';

export default function AiTerminal() {
  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg p-6 font-mono text-sm">
      <div className="text-purple-400 mb-4">
        <i className="fas fa-brain mr-2"></i>
        AI/ML & DevOps Terminal
        <span className="text-muted-foreground ml-2">6 Technologies</span>
      </div>
      
      <div className="space-y-3 text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-terminal-gray p-2 rounded">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-muted-foreground">AI/ML & DevOps Session</div>
        </div>

        {/* Terminal Commands */}
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-matrix mr-2">root@ai-ml:~$</span>
            <span className="text-cyan-glow">ls -la /ai-stack/</span>
          </div>
          <div className="text-muted-foreground ml-4">
            total 6<br/>
            drwxr-xr-x 2 root root 4096 Jan 15 10:30 .<br/>
            drwxr-xr-x 3 root root 4096 Jan 15 10:30 ..<br/>
            -rw-r--r-- 1 root root  156 Jan 15 10:30 mcp_protocol.py<br/>
            -rw-r--r-- 1 root root  234 Jan 15 10:30 llm_integration.py<br/>
            -rw-r--r-- 1 root root  189 Jan 15 10:30 analytics.py<br/>
            -rw-r--r-- 1 root root  145 Jan 15 10:30 docker-compose.yml<br/>
            -rw-r--r-- 1 root root  167 Jan 15 10:30 jenkins.groovy<br/>
            -rw-r--r-- 1 root root   89 Jan 15 10:30 git-config
          </div>

          <div className="flex items-center">
            <span className="text-matrix mr-2">root@ai-ml:~$</span>
            <span className="text-cyan-glow">cat /ai-stack/mcp_protocol.py</span>
          </div>
          <div className="text-muted-foreground ml-4">
            <span className="text-purple-400"># Model Context Protocol Implementation</span><br/>
            <span className="text-amber-glow">class</span> <span className="text-green-400">MCPHandler</span>:<br/>
            <span className="text-amber-glow">    def</span> <span className="text-green-400">__init__</span>(<span className="text-cyan-glow">self</span>):<br/>
            <span className="text-muted-foreground">        self.context = {}</span><br/>
            <span className="text-muted-foreground">        self.models = []</span>
          </div>

          <div className="flex items-center">
            <span className="text-matrix mr-2">root@ai-ml:~$</span>
            <span className="text-cyan-glow">docker ps</span>
          </div>
          <div className="text-muted-foreground ml-4">
            CONTAINER ID   IMAGE                    COMMAND                  CREATED         STATUS         PORTS     NAMES<br/>
            <span className="text-green-400">abc123def</span>   <span className="text-cyan-glow">tensorflow/serving</span>   <span className="text-amber-glow">"/usr/bin/tf_serving_entrypoint.sh"</span>   <span className="text-purple-400">2 hours ago</span>   <span className="text-green-400">Up 2 hours</span>   <span className="text-matrix">8501/tcp</span>   <span className="text-red-glow">ml-model</span><br/>
            <span className="text-green-400">def456ghi</span>   <span className="text-cyan-glow">jenkins/jenkins:lts</span>   <span className="text-amber-glow">"/sbin/tini -- /usr/local/bin/jenkins.sh"</span>   <span className="text-purple-400">1 day ago</span>   <span className="text-green-400">Up 1 day</span>   <span className="text-matrix">8080/tcp</span>   <span className="text-red-glow">jenkins-server</span>
          </div>

          <div className="flex items-center">
            <span className="text-matrix mr-2">root@ai-ml:~$</span>
            <span className="text-cyan-glow">git log --oneline -5</span>
          </div>
          <div className="text-muted-foreground ml-4">
            <span className="text-green-400">a1b2c3d</span> <span className="text-matrix">feat: Add LLM integration with OpenAI API</span><br/>
            <span className="text-green-400">e4f5g6h</span> <span className="text-matrix">feat: Implement predictive analytics pipeline</span><br/>
            <span className="text-green-400">i7j8k9l</span> <span className="text-matrix">feat: Add Docker containerization</span><br/>
            <span className="text-green-400">m0n1o2p</span> <span className="text-matrix">feat: Setup CI/CD with Jenkins</span><br/>
            <span className="text-green-400">q3r4s5t</span> <span className="text-matrix">feat: Initialize MCP protocol</span>
          </div>

          <div className="flex items-center">
            <span className="text-matrix mr-2">root@ai-ml:~$</span>
            <span className="text-cyan-glow">systemctl status ai-ml-services</span>
          </div>
          <div className="text-muted-foreground ml-4">
            ● ai-ml-services.service - AI/ML & DevOps Services<br/>
            Loaded: <span className="text-green-400">loaded</span> (/etc/systemd/system/ai-ml-services.service; enabled)<br/>
            Active: <span className="text-green-400">active (running)</span> since Mon 2024-01-15 09:00:00 UTC<br/>
            Main PID: 1234 (python3)<br/>
            Tasks: 6 (limit: 4915)<br/>
            Memory: 256.0M<br/>
            CGroup: /system.slice/ai-ml-services.service<br/>
            ├─1234 /usr/bin/python3 /opt/ai-ml/main.py<br/>
            ├─1235 /usr/bin/python3 /opt/ai-ml/analytics.py<br/>
            └─1236 /usr/bin/python3 /opt/ai-ml/llm_integration.py
          </div>
        </div>

        {/* AI/ML Stats */}
        <div className="mt-6 pt-4 border-t border-terminal-border">
          <div className="text-purple-400 font-bold mb-3 flex items-center">
            <i className="fas fa-chart-bar mr-2"></i>
            AI/ML & DevOps Metrics
          </div>
          <div className="text-xs space-y-2 ml-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">AI/ML:</span>
              <span className="text-purple-400">3 (MCP, LLM Integration, Analytics)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">DevOps:</span>
              <span className="text-purple-400">3 (Docker, CI/CD, Git)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-400">All services running</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 