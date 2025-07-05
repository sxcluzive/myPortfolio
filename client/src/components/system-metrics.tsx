import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useView } from "@/contexts/view-context";
import type { Metric } from "@shared/schema";
import AnimatedCounter from "@/components/ui/animated-counter";
import LiveActivityLog from "@/components/live-activity-log";

export default function SystemMetrics() {
  const { currentView } = useView();
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
  const impactMetrics = metrics.filter(m => m.category === 'impact');

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

  if (currentView === 'normal') {
    // Normal View - Simplified business-focused metrics
    return (
      <div className="space-y-6">
        {/* Simplified Performance Impact */}
        <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg">
          <div className="text-amber-glow mb-4 flex items-center">
            <i className="fas fa-chart-line mr-2"></i>Key Metrics
          </div>
          <div className="grid grid-cols-2 gap-4">
            {performanceMetrics.slice(0, 2).map((metric) => {
              const colors = ['border-matrix text-matrix', 'border-cyan-glow text-cyan-glow'];
              const colorClass = colors[performanceMetrics.indexOf(metric) % colors.length];
              
              return (
                <div key={metric.id} className={`border p-3 rounded ${colorClass}`}>
                  <div className="text-xs text-gray-400 mb-1">{metric.description?.toUpperCase()}</div>
                  <div className={`text-xl ${colorClass.split(' ')[1]}`}>
                    <AnimatedCounter 
                      value={parseFloat(metric.value.replace(/[^\d.]/g, ''))} 
                      suffix={metric.value.replace(/[\d.]/g, '')}
                      duration={2500}
                      delay={performanceMetrics.indexOf(metric) * 300}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Business Impact Metrics */}
        <div className="border border-terminal-border rounded-lg p-4 bg-terminal-gray">
          <div className="text-amber-glow mb-3 flex items-center">
            <i className="fas fa-briefcase mr-2"></i>Business Impact
          </div>
          <div className="grid grid-cols-2 gap-3">
            {impactMetrics.map((metric) => {
              const colors = ['border-green-400 text-green-400', 'border-blue-400 text-blue-400', 'border-purple-400 text-purple-400'];
              const colorClass = colors[impactMetrics.indexOf(metric) % colors.length];
              
              return (
                <div key={metric.id} className={`border p-3 rounded ${colorClass}`}>
                  <div className="text-xs text-gray-400 mb-1">{metric.description?.toUpperCase()}</div>
                  <div className={`text-lg ${colorClass.split(' ')[1]}`}>
                    <AnimatedCounter 
                      value={parseFloat(metric.value.replace(/[^\d.]/g, ''))} 
                      suffix={metric.value.replace(/[\d.]/g, '')}
                      duration={2500}
                      delay={impactMetrics.indexOf(metric) * 300}
                    />
                  </div>
                  <div className="text-xs">{metric.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Developer View - Technical metrics with live activity log
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="border border-terminal-border rounded-lg p-4 bg-terminal-bg">
        <div className="text-amber-glow mb-3 flex items-center">
          <i className="fas fa-chart-line mr-2"></i>Performance Metrics
        </div>
        <div className="grid grid-cols-2 gap-3">
          {performanceMetrics.map((metric) => {
            const colors = ['border-matrix text-matrix', 'border-cyan-glow text-cyan-glow', 'border-amber-glow text-amber-glow', 'border-red-glow text-red-glow'];
            const colorClass = colors[performanceMetrics.indexOf(metric) % colors.length];
            
            return (
              <div key={metric.id} className={`border p-3 rounded ${colorClass}`}>
                <div className="text-xs text-gray-400 mb-1">{metric.description?.toUpperCase()}</div>
                <div className={`text-lg ${colorClass.split(' ')[1]}`}>
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

      {/* Live Activity Log */}
      <LiveActivityLog />
    </div>
  );
}
