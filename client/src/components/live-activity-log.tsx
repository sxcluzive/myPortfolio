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

  // Fetch activity logs
  const { data: logsResponse } = useQuery<{ status: number; data: ActivityLog[] }>({
    queryKey: ["/api/logs"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  useEffect(() => {
    if (logsResponse?.data) {
      // Keep only the last 3 entries
      setLogs(logsResponse.data.slice(-3));
    }
  }, [logsResponse]);

  // Process SSE messages for real-time updates
  useEffect(() => {
    messages.forEach((message) => {
      if (message.type === 'system_activity') {
        // Add new system activity to logs and keep only last 3
        setLogs(prev => [{
          id: Date.now(),
          timestamp: message.timestamp,
          activity: message.message,
          type: 'system'
        }, ...prev.slice(0, 2)]); // Keep only last 3 logs
      }
    });
  }, [messages]);

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
        {logs.map((log) => (
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