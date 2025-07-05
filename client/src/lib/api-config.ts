// API Configuration for different environments - Updated for Render backend
const getApiBaseUrl = () => {
  // In production, use the environment variable or fallback to a default
  if (import.meta.env.PROD) {
    // Temporarily hardcode the URL to fix the issue
    const apiUrl = 'https://myportfolio-z3s6.onrender.com';
    console.log('Production API URL (hardcoded):', apiUrl);
    return apiUrl;
  }
  
  // In development, use relative paths (same origin)
  console.log('Development mode - using relative paths');
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

export const createApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}/api/${endpoint}`;
};

export const getApiUrl = () => {
  return API_BASE_URL;
}; 