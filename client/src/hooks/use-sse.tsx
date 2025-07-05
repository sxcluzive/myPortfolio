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
            
            setMessages(prev => {
              // Check for duplicates based on timestamp and message content
              const isDuplicate = prev.some(existing => 
                existing.timestamp === message.timestamp && 
                existing.message === message.message
              );
              
              if (isDuplicate) {
                return prev; // Don't add duplicate
              }
              
              // Add new message and keep only last 3 (matching the UI requirement)
              return [message, ...prev.slice(0, 2)];
            });
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
