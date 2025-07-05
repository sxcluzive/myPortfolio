import { useState, useEffect, useRef } from 'react';
import { getApiUrl } from '@/lib/api-config';

interface SSEMessage {
  type: string;
  message: string;
  timestamp: string;
}

export function useSSE() {
  const [messages, setMessages] = useState<SSEMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const sseUrl = `${getApiUrl()}/api/events`;
    
    const connect = () => {
      try {
        eventSourceRef.current = new EventSource(sseUrl);

        eventSourceRef.current.onopen = () => {
          setIsConnected(true);
          console.log('SSE connected');
        };

        eventSourceRef.current.onmessage = (event) => {
          try {
            const message: SSEMessage = JSON.parse(event.data);
            setMessages(prev => [message, ...prev.slice(0, 19)]); // Keep last 20 messages
          } catch (error) {
            console.error('Failed to parse SSE message:', error);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          console.error('SSE error:', error);
          setIsConnected(false);
          
          // Close and attempt to reconnect
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
          
          // Attempt to reconnect after 3 seconds
          setTimeout(connect, 3000);
        };
      } catch (error) {
        console.error('Failed to create SSE connection:', error);
        setTimeout(connect, 3000);
      }
    };

    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return {
    messages,
    isConnected
  };
}
