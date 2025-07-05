import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { createApiUrl } from "./api-config";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const endpoint = queryKey[0] as string;
    const url = endpoint.startsWith('/api/') ? createApiUrl(endpoint.replace('/api/', '')) : endpoint;
    
    console.log('🔍 API Call Debug:', {
      endpoint,
      url,
      isProduction: import.meta.env.PROD,
      userAgent: navigator.userAgent
    });
    
    try {
      const res = await fetch(url, {
        credentials: "include",
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      console.log('📡 API Response:', {
        url,
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries())
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      const data = await res.json();
      console.log('✅ API Success:', { url, data });
      return data;
    } catch (error) {
      console.error('❌ API Error:', { url, error: error.message });
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
});

// Function to invalidate all queries and force fresh data
export const invalidateAllQueries = async () => {
  console.log('🔄 Invalidating all queries...');
  await queryClient.invalidateQueries();
  console.log('✅ All queries invalidated');
};

// Function to refetch all active queries
export const refetchAllQueries = async () => {
  console.log('🔄 Refetching all active queries...');
  await queryClient.refetchQueries();
  console.log('✅ All queries refetched');
};

// Function to clear all cache
export const clearAllCache = async () => {
  console.log('🗑️ Clearing all cache...');
  await queryClient.clear();
  console.log('✅ All cache cleared');
};
