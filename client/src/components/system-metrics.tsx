import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { Metric } from "@shared/schema";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function SystemMetrics() {
  const [liveMetrics, setLiveMetrics] = useState({
    apiResponseTime: 47,
    databaseQueries: 156,
    serverLoad: 32
  });

  const { data: metricsResponse } = useQuery<{ status: number; data: Metric[] }>({
    queryKey: ["/api/metrics"],
  });

  const metrics = metricsResponse?.data || [];
  const performanceMetrics = metrics.filter(m => m.category === 'performance');

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        apiResponseTime: Math.floor(Math.random() * 30) + 30,
        databaseQueries: Math.floor(Math.random() * 100) + 120,
        serverLoad: Math.floor(Math.random() * 40) + 20
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg">
        <div className="text-amber-glow mb-4 flex items-center">
          <i className="fas fa-chart-line mr-2"></i>Performance Metrics
        </div>
        <div className="space-y-4">
          {performanceMetrics.map((metric) => {
            const colors = ['border-matrix text-matrix', 'border-cyan-glow text-cyan-glow', 'border-amber-glow text-amber-glow', 'border-red-glow text-red-glow'];
            const colorClass = colors[performanceMetrics.indexOf(metric) % colors.length];
            
            return (
              <div key={metric.id} className={`border p-4 rounded ${colorClass}`}>
                <div className="text-xs text-gray-400 mb-2">{metric.description?.toUpperCase()}</div>
                <div className={`text-2xl ${colorClass.split(' ')[1]}`}>
                  <AnimatedCounter 
                    value={parseFloat(metric.value.replace(/[^\d.]/g, ''))} 
                    suffix={metric.value.replace(/[\d.]/g, '')}
                    duration={2500}
                    delay={performanceMetrics.indexOf(metric) * 300}
                  />
                </div>
                <div className="text-xs">{metric.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live System Monitoring */}
      <div className="border border-terminal-border rounded-lg p-6 bg-terminal-gray">
        <div className="text-amber-glow mb-4 flex items-center">
          <i className="fas fa-tachometer-alt mr-2"></i>System Monitoring
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">API Response Time</span>
            <span className="text-matrix">
              <AnimatedCounter 
                value={liveMetrics.apiResponseTime} 
                suffix="ms"
                duration={1000}
              />
            </span>
          </div>
          <div className="w-full bg-terminal-border rounded-full h-2">
            <div 
              className="bg-matrix h-2 rounded-full transition-all duration-1000" 
              style={{width: `${Math.min(85, (liveMetrics.apiResponseTime / 100) * 100)}%`}}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Database Queries</span>
            <span className="text-cyan-glow">
              <AnimatedCounter 
                value={liveMetrics.databaseQueries} 
                suffix="/min"
                duration={1000}
              />
            </span>
          </div>
          <div className="w-full bg-terminal-border rounded-full h-2">
            <div 
              className="bg-cyan-glow h-2 rounded-full transition-all duration-1000" 
              style={{width: `${Math.min(90, (liveMetrics.databaseQueries / 200) * 100)}%`}}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Server Load</span>
            <span className="text-amber-glow">
              <AnimatedCounter 
                value={liveMetrics.serverLoad} 
                suffix="%"
                duration={1000}
              />
            </span>
          </div>
          <div className="w-full bg-terminal-border rounded-full h-2">
            <div 
              className="bg-amber-glow h-2 rounded-full transition-all duration-1000" 
              style={{width: `${liveMetrics.serverLoad}%`}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
