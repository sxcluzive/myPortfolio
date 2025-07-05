// API Configuration for different environments
const getApiBaseUrl = () => {
  // In production, use the environment variable or fallback to a default
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://myportfolio-z3s6.onrender.com';
  }
  
  // In development, use relative paths (same origin)
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

export const createApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}/api/${endpoint}`;
};

// WebSocket configuration
export const getWebSocketUrl = () => {
  if (import.meta.env.PROD) {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://myportfolio-z3s6.onrender.com';
    // Convert HTTPS to WSS
    return apiUrl.replace('https://', 'wss://').replace('http://', 'ws://');
  }
  
  // In development, use relative WebSocket path
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}`;
}; 