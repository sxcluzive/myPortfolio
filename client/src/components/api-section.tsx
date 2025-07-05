import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWebSocket } from "@/hooks/use-websocket";
import SystemMetrics from "@/components/system-metrics";
import type { ActivityLog } from "@shared/schema";

export default function ApiSection() {
  const [apiResponse, setApiResponse] = useState<string>('Click on an API endpoint to see the response...');
  const [activityLogs, setActivityLogs] = useState<string[]>([]);
  
  const { messages } = useWebSocket();

  const { data: logsResponse } = useQuery<{ status: number; data: ActivityLog[] }>({
    queryKey: ["/api/logs"],
    refetchInterval: 5000,
  });

  const executeAPI = async (endpoint: string) => {
    try {
      const response = await fetch(`/api/${endpoint}`);
      const data = await response.json();
      
      const timestamp = new Date().toLocaleTimeString();
      const responseTime = Math.floor(Math.random() * 50) + 20;
      
      // Add to activity logs
      const logEntry = `[${timestamp}] GET /api/${endpoint} - ${data.status} OK - ${responseTime}ms`;
      setActivityLogs(prev => [logEntry, ...prev.slice(0, 9)]);

      // Display API response
      const formattedResponse = `HTTP/1.1 ${data.status} OK
Content-Type: application/json
X-Response-Time: ${responseTime}ms

${JSON.stringify(data.data, null, 2)}`;
      
      setApiResponse(formattedResponse);
    } catch (error) {
      setApiResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Add WebSocket messages to activity logs
  useEffect(() => {
    messages.forEach(message => {
      if (message.type === 'system_activity') {
        const timestamp = new Date(message.timestamp).toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message.message}`;
        setActivityLogs(prev => [logEntry, ...prev.slice(0, 9)]);
      }
    });
  }, [messages]);

  const apiEndpoints = [
    { 
      endpoint: 'profile', 
      method: 'GET', 
      description: 'Get basic profile information',
      color: 'border-matrix text-matrix'
    },
    { 
      endpoint: 'skills', 
      method: 'GET', 
      description: 'Retrieve technical skills',
      color: 'border-cyan-glow text-cyan-glow'
    },
    { 
      endpoint: 'experience', 
      method: 'GET', 
      description: 'Get work experience data',
      color: 'border-amber-glow text-amber-glow'
    },
    { 
      endpoint: 'metrics', 
      method: 'GET', 
      description: 'Performance metrics and achievements',
      color: 'border-red-glow text-red-glow'
    }
  ];

  return (
    <section id="api" className="min-h-screen bg-terminal-bg p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-6">
          <span className="text-matrix mr-2">root@shubham-portfolio:~#</span>
          <span>curl -X GET https://api.shubham.dev/</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Playground */}
          <div className="space-y-6">
            <div className="border border-terminal-border rounded-lg p-6 bg-terminal-gray">
              <div className="text-amber-glow mb-4 flex items-center">
                <i className="fas fa-code mr-2"></i>Personal API Playground
              </div>
              
              {/* API Endpoints */}
              <div className="space-y-4">
                {apiEndpoints.map(({ endpoint, method, description, color }) => (
                  <div 
                    key={endpoint}
                    className={`border rounded p-4 cursor-pointer hover:bg-terminal-bg transition-colors ${color}`}
                    onClick={() => executeAPI(endpoint)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`font-bold ${color.split(' ')[1]}`}>{method}</span>
                        <span className="ml-2">/api/{endpoint}</span>
                      </div>
                      <i className="fas fa-play text-cyan-glow"></i>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Monitoring */}
            <SystemMetrics />
          </div>

          {/* API Response Display */}
          <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg">
            <div className="text-amber-glow mb-4 flex items-center">
              <i className="fas fa-terminal mr-2"></i>Response Output
            </div>
            <div className="border border-terminal-border rounded p-4 bg-black font-mono text-sm min-h-64 overflow-auto">
              <pre className="text-matrix whitespace-pre-wrap">{apiResponse}</pre>
            </div>
          </div>
        </div>

        {/* Live Activity Logs */}
        <div className="mt-8 border border-terminal-border rounded-lg p-6 bg-terminal-gray">
          <div className="text-amber-glow mb-4 flex items-center">
            <i className="fas fa-stream mr-2"></i>Live Activity Logs
          </div>
          <div className="border border-terminal-border rounded p-4 bg-black font-mono text-xs h-32 overflow-y-auto">
            {activityLogs.length > 0 ? (
              activityLogs.map((log, index) => (
                <div key={index} className="text-matrix mb-1">{log}</div>
              ))
            ) : (
              <div className="text-gray-400">Waiting for API calls...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
