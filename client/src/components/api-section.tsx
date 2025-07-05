import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSSE } from "@/hooks/use-sse";
import type { ActivityLog, Metric } from "@shared/schema";
import { createApiUrl } from "@/lib/api-config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";

interface ApiResponse {
  status: number;
  data: any;
  timestamp: string;
  responseTime: number;
  endpoint: string;
}

interface RequestHistory {
  endpoint: string;
  timestamp: string;
  responseTime: number;
  status: number;
  success: boolean;
}

export default function ApiSection() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [activityLogs, setActivityLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [requestHistory, setRequestHistory] = useState<RequestHistory[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  const { messages } = useSSE();

  const { data: logsResponse } = useQuery<{ status: number; data: ActivityLog[] }>({
    queryKey: ["/api/logs"],
    refetchInterval: 5000,
  });

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && selectedEndpoint) {
      const interval = setInterval(() => {
        executeAPI(selectedEndpoint);
      }, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedEndpoint]);

  const executeAPI = async (endpoint: string) => {
    setIsLoading(endpoint);
    setSelectedEndpoint(endpoint);
    
    try {
      const startTime = Date.now();
      const response = await fetch(createApiUrl(endpoint));
      const data = await response.json();
      const responseTime = Date.now() - startTime;
      
      const timestamp = new Date().toLocaleTimeString();
      
      // Add to activity logs
      const logEntry = `[${timestamp}] GET /api/${endpoint} - ${data.status} OK - ${responseTime}ms`;
      setActivityLogs(prev => [logEntry, ...prev.slice(0, 19)]);

      // Add to request history
      const historyEntry: RequestHistory = {
        endpoint,
        timestamp,
        responseTime,
        status: data.status,
        success: data.status >= 200 && data.status < 300
      };
      setRequestHistory(prev => [historyEntry, ...prev.slice(0, 49)]);

      // Set API response with metadata
      setApiResponse({
        status: data.status,
        data: data.data,
        timestamp,
        responseTime,
        endpoint
      });
    } catch (error) {
      const timestamp = new Date().toLocaleTimeString();
      const historyEntry: RequestHistory = {
        endpoint,
        timestamp,
        responseTime: 0,
        status: 500,
        success: false
      };
      setRequestHistory(prev => [historyEntry, ...prev.slice(0, 49)]);
      
      setApiResponse({
        status: 500,
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp,
        responseTime: 0,
        endpoint
      });
    } finally {
      setIsLoading(null);
    }
  };

  // Add WebSocket messages to activity logs
  useEffect(() => {
    messages.forEach(message => {
      if (message.type === 'system_activity') {
        const timestamp = new Date(message.timestamp).toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message.message}`;
        setActivityLogs(prev => [logEntry, ...prev.slice(0, 19)]);
      }
    });
  }, [messages]);

  const apiEndpoints = [
    { 
      endpoint: 'profile', 
      method: 'GET', 
      description: 'Get basic profile information',
      color: 'border-matrix text-matrix',
      icon: '👤',
      example: {
        name: "Shubham Singh",
        title: "Backend Engineer",
        email: "shubh.message@gmail.com"
      }
    },
    { 
      endpoint: 'skills', 
      method: 'GET', 
      description: 'Retrieve technical skills',
      color: 'border-cyan-glow text-cyan-glow',
      icon: '⚡',
      example: {
        languages: ["JavaScript", "TypeScript", "Python"],
        frameworks: ["Node.js", "Express", "FastAPI"]
      }
    },
    { 
      endpoint: 'experience', 
      method: 'GET', 
      description: 'Get work experience data',
      color: 'border-amber-glow text-amber-glow',
      icon: '💼',
      example: {
        companies: [
          {
            name: "Tech Company",
            role: "Backend Engineer",
            duration: "2022-2024"
          }
        ]
      }
    },
    { 
      endpoint: 'metrics', 
      method: 'GET', 
      description: 'Performance metrics and achievements',
      color: 'border-red-glow text-red-glow',
      icon: '📊',
      example: {
        projects_completed: 25,
        uptime_percentage: 99.9
      }
    }
  ];

  // JSON syntax highlighting function
  const highlightJSON = (json: any): string => {
    const jsonString = JSON.stringify(json, null, 2);
    return jsonString
      .replace(/"([^"]+)":/g, '<span class="text-cyan-glow">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-matrix">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="text-amber-glow">$1</span>')
      .replace(/: (true|false|null)/g, ': <span class="text-red-glow">$1</span>')
      .replace(/(\{|\}|\[|\])/g, '<span class="text-muted-foreground">$1</span>');
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'POST': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStats = () => {
    const totalRequests = requestHistory.length;
    const successfulRequests = requestHistory.filter(r => r.success).length;
    const averageResponseTime = totalRequests > 0 
      ? Math.round(requestHistory.reduce((sum, r) => sum + r.responseTime, 0) / totalRequests)
      : 0;
    const successRate = totalRequests > 0 ? Math.round((successfulRequests / totalRequests) * 100) : 0;
    
    return { totalRequests, successfulRequests, averageResponseTime, successRate };
  };

  const stats = getStats();

  return (
    <section id="api" className="min-h-screen bg-terminal-bg p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-matrix mr-2">root@shubhxcluzive:~#</span>
            <span>curl -X GET https://api.shubham.dev/</span>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-matrix mb-2">🚀 Interactive API Playground</h2>
            <p className="text-muted-foreground text-lg">Test real endpoints with live responses and analytics</p>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-terminal-border rounded-lg p-4 bg-terminal-gray">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-matrix">{stats.totalRequests}</div>
                <div className="text-xs text-muted-foreground">Total Requests</div>
              </div>
              <i className="fas fa-chart-line text-cyan-glow text-xl"></i>
            </div>
          </div>
          <div className="border border-terminal-border rounded-lg p-4 bg-terminal-gray">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">{stats.successRate}%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <i className="fas fa-check-circle text-green-400 text-xl"></i>
            </div>
          </div>
          <div className="border border-terminal-border rounded-lg p-4 bg-terminal-gray">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-glow">{stats.averageResponseTime}ms</div>
                <div className="text-xs text-muted-foreground">Avg Response</div>
              </div>
              <i className="fas fa-tachometer-alt text-amber-glow text-xl"></i>
            </div>
          </div>
          <div className="border border-terminal-border rounded-lg p-4 bg-terminal-gray">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-glow">{apiEndpoints.length}</div>
                <div className="text-xs text-muted-foreground">Endpoints</div>
              </div>
              <i className="fas fa-code text-red-glow text-xl"></i>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced API Playground */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-terminal-border rounded-lg p-6 bg-terminal-gray">
              <div className="text-amber-glow mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-code mr-2"></i>Available Endpoints
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      showHistory 
                        ? 'bg-matrix text-terminal-bg' 
                        : 'bg-terminal-bg text-matrix border border-terminal-border'
                    }`}
                  >
                    <i className="fas fa-history mr-1"></i>History
                  </button>
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      autoRefresh 
                        ? 'bg-cyan-glow text-terminal-bg' 
                        : 'bg-terminal-bg text-cyan-glow border border-terminal-border'
                    }`}
                  >
                    <i className="fas fa-sync-alt mr-1"></i>Auto
                  </button>
                </div>
              </div>
              
              {/* API Endpoints */}
              <div className="space-y-4">
                {apiEndpoints.map(({ endpoint, method, description, color, icon, example }) => (
                  <div 
                    key={endpoint}
                    className={`border rounded-lg p-4 cursor-pointer hover:bg-terminal-bg transition-all duration-200 ${color} ${
                      selectedEndpoint === endpoint ? 'ring-2 ring-matrix ring-opacity-50' : ''
                    }`}
                    onClick={() => executeAPI(endpoint)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{icon}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getMethodColor(method)}`}>
                          {method}
                        </span>
                        <span className="font-mono text-sm">/api/{endpoint}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isLoading === endpoint ? (
                          <i className="fas fa-spinner fa-spin text-cyan-glow"></i>
                        ) : (
                          <i className="fas fa-play text-cyan-glow"></i>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mb-3">{description}</div>
                    
                    {/* Example Preview */}
                    <div className="bg-black rounded p-2 text-xs font-mono opacity-70">
                      <div className="text-muted-foreground mb-1">Example:</div>
                      <div dangerouslySetInnerHTML={{ __html: highlightJSON(example) }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request History */}
            {showHistory && (
              <div className="border border-terminal-border rounded-lg p-6 bg-terminal-gray">
                <div className="text-amber-glow mb-4 flex items-center">
                  <i className="fas fa-history mr-2"></i>Request History
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {requestHistory.slice(0, 10).map((req, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-2 bg-terminal-bg rounded">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${
                          req.success ? 'bg-green-400' : 'bg-red-400'
                        }`}></span>
                        <span className="font-mono">/api/{req.endpoint}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>{req.responseTime}ms</span>
                        <span>{req.timestamp}</span>
                      </div>
                    </div>
                  ))}
                  {requestHistory.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-4">
                      No requests yet
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Enhanced API Response Display */}
          <div className="lg:col-span-2">
            <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg">
              <div className="text-amber-glow mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-terminal mr-2"></i>Response Console
                </div>
                {apiResponse && (
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-muted-foreground">Last updated:</span>
                    <span className="text-matrix">{apiResponse.timestamp}</span>
                  </div>
                )}
              </div>
              
              {apiResponse ? (
                <div className="space-y-4">
                  {/* Enhanced Response Metadata */}
                  <div className="border border-terminal-border rounded-lg p-4 bg-terminal-gray">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded text-sm font-medium ${
                          apiResponse.status >= 200 && apiResponse.status < 300 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {apiResponse.status} {apiResponse.status >= 200 && apiResponse.status < 300 ? 'OK' : 'ERROR'}
                        </span>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span><i className="fas fa-clock mr-1"></i>{apiResponse.timestamp}</span>
                          <span><i className="fas fa-tachometer-alt mr-1"></i>{apiResponse.responseTime}ms</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-matrix">/api/{apiResponse.endpoint}</div>
                        <div className="text-xs text-muted-foreground">Content-Type: application/json</div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced JSON Response */}
                  <div className="border border-terminal-border rounded-lg overflow-hidden">
                    <div className="bg-terminal-gray px-4 py-2 border-b border-terminal-border flex items-center justify-between">
                      <div className="text-xs text-muted-foreground flex items-center">
                        <i className="fas fa-code mr-2"></i>
                        Response Body
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-muted-foreground">
                          {JSON.stringify(apiResponse.data).length} characters
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(JSON.stringify(apiResponse.data, null, 2))}
                          className="text-cyan-glow hover:text-matrix transition-colors"
                          title="Copy to clipboard"
                        >
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-black font-mono text-sm min-h-80 overflow-auto">
                      <div 
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightJSON(apiResponse.data) 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-terminal-border rounded-lg p-12 bg-black font-mono text-sm min-h-80 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <i className="fas fa-terminal text-4xl mb-4"></i>
                    <div className="text-xl mb-2">No Response Yet</div>
                    <div className="text-sm">Click on any endpoint to see the response here</div>
                    <div className="text-xs mt-2 text-muted-foreground">
                      Try the endpoints on the left to get started
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* API Call Activity Log */}
            <div className="mt-6 border border-terminal-border rounded-lg p-6 bg-terminal-gray">
              <div className="text-amber-glow mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-code mr-2"></i>API Call Activity
                </div>
                <div className="text-xs text-muted-foreground">
                  {activityLogs.length} recent API calls
                </div>
              </div>
              <div className="border border-terminal-border rounded p-4 bg-black font-mono text-xs h-40 overflow-y-auto">
                {activityLogs.length > 0 ? (
                  activityLogs.map((log, index) => (
                    <div key={index} className="text-matrix mb-1 flex items-center">
                      <span className="text-muted-foreground mr-2">→</span>
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">Waiting for API calls...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
