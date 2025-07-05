import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSSE } from '@/hooks/use-sse';

interface ActivityLog {
  id: number;
  timestamp: string;
  activity: string;
  type: 'api' | 'system' | 'user' | 'visitor';
  visitorId?: string;
  ipAddress?: string;
  userAgent?: string;
  page?: string;
}

export default function LiveActivityLog() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const { messages } = useSSE();

  // Fetch activity logs (less frequent polling since we have SSE)
  const { data: logsResponse } = useQuery<{ status: number; data: ActivityLog[] }>({
    queryKey: ["/api/logs"],
    refetchInterval: 30000, // Refresh every 30 seconds instead of 5
  });

  // Process SSE messages for real-time updates (primary source)
  useEffect(() => {
    messages.forEach((message) => {
      if (message.type === 'system_activity') {
        // Create a unique ID based on timestamp and message content
        const uniqueId = `${message.timestamp}-${message.message}`;
        
        setLogs(prev => {
          // Check if this message already exists (deduplication)
          const exists = prev.some(log => 
            log.timestamp === message.timestamp && log.activity === message.message
          );
          
          if (exists) {
            return prev; // Don't add duplicate
          }
          
          // Add new message and keep only last 3
          const newLog = {
            id: Date.now() + Math.random(), // Ensure unique ID
            timestamp: message.timestamp,
            activity: message.message,
            type: 'system' as const
          };
          
          return [newLog, ...prev.slice(0, 2)]; // Keep only last 3 logs
        });
      }
    });
  }, [messages]);

  // Use API data as fallback/initial data (only if no SSE messages)
  useEffect(() => {
    if (logsResponse?.data && logs.length === 0) {
      // Only use API data if we don't have any SSE messages yet
      const lastThreeLogs = logsResponse.data.slice(-3);
      setLogs(lastThreeLogs);
    }
  }, [logsResponse, logs.length]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visitor':
        return '👤';
      case 'api':
        return '🔌';
      case 'system':
        return '⚙️';
      case 'user':
        return '👨‍💻';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'visitor':
        return 'text-cyan-glow';
      case 'api':
        return 'text-green-400';
      case 'system':
        return 'text-amber-glow';
      case 'user':
        return 'text-matrix';
      default:
        return 'text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg p-6 font-mono text-sm">
      <div className="text-matrix mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <i className="fas fa-terminal mr-2"></i>
          Live Activity Log
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="text-green-400">●</span> Live
        </div>
      </div>

      {/* Activity Log - Only last 3 entries */}
      <div className="space-y-2">
        {logs.slice(0, 3).map((log) => (
          <div key={log.id} className="flex items-start space-x-2 p-2 hover:bg-terminal-gray rounded">
            <span className="text-xs text-muted-foreground mt-1">
              {formatTimestamp(log.timestamp)}
            </span>
            <span className="text-lg">
              {getActivityIcon(log.type)}
            </span>
            <div className="flex-1">
              <div className={`${getActivityColor(log.type)} text-xs`}>
                {log.activity}
              </div>
            </div>
          </div>
        ))}
        
        {logs.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Loading activity logs...
          </div>
        )}
      </div>
    </div>
  );
} 