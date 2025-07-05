import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useView } from "@/contexts/view-context";
import type { Profile } from "@shared/schema";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function HeroSection() {
  const { currentView, setCurrentView } = useView();
  const { data: profileResponse, isLoading } = useQuery<{ status: number; data: Profile }>({
    queryKey: ["/api/profile"],
  });

  const [currentTime, setCurrentTime] = useState("");
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  // Debug: Monitor view changes
  useEffect(() => {
    console.log('View changed to:', currentView);
    
    // Handle pending scroll after view change
    if (pendingScroll) {
      setTimeout(() => {
        console.log('Executing pending scroll to:', pendingScroll);
        const element = document.getElementById(pendingScroll);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error(`Element with id '${pendingScroll}' not found`);
        }
        setPendingScroll(null);
      }, 300);
    }
  }, [currentView, pendingScroll]);

  const profile = profileResponse?.data;

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        timeZone: 'America/New_York'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    console.log('scrollToSection called:', sectionId, 'currentView:', currentView);
    
    // Smart navigation logic
    if (sectionId === 'api' && currentView === 'normal') {
      console.log('Switching to dev view for API');
      setCurrentView('dev');
      setPendingScroll('api');
    } else if (sectionId === 'experience' && currentView === 'dev') {
      console.log('Switching to normal view for Experience');
      setCurrentView('normal');
      setPendingScroll('experience');
    } else {
      // Normal scroll behavior
      console.log('Normal scroll to:', sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error(`Element with id '${sectionId}' not found`);
      }
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-terminal-bg p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-matrix">Loading profile...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-terminal-bg p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Mobile Disclaimer */}
        <div className="md:hidden mb-6 p-3 bg-amber-glow/10 border border-amber-glow/30 rounded-lg">
          <div className="flex items-center text-amber-glow text-sm">
            <i className="fas fa-desktop mr-2"></i>
            <span>For the best experience, view on desktop</span>
          </div>
        </div>

        {/* Terminal Boot Sequence */}
        <div className="mb-8">
          <div className="text-xs text-gray-400 mb-4">
            <div>Loading portfolio system...</div>
            <div>Initializing backend engineer profile...</div>
            <div className="text-matrix">System ready. Type 'help' for available commands.</div>
          </div>
        </div>

        {/* Command Prompt */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-matrix mr-2">root@shubhxcluzive:~#</span>
            <span className="terminal-cursor">whoami</span>
          </div>
          
          {/* Personal Info Output */}
          <div className="ml-4 border border-terminal-border rounded-lg p-6 bg-terminal-gray">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-3xl font-bold text-matrix mb-2">{profile?.name}</h1>
                <h2 className="text-xl text-cyan-glow mb-4">Software Engineer 2 (Backend)</h2>
                <div className="space-y-2 text-sm">
                  <div><span className="text-amber-glow">Email:</span> {profile?.email}</div>
                  <div><span className="text-amber-glow">Phone:</span> {profile?.phone}</div>
                  <div><span className="text-amber-glow">Location:</span> {profile?.location}</div>
                  <div><span className="text-amber-glow">GitHub:</span> <a href={`https://${profile?.github}`} target="_blank" rel="noopener noreferrer" className="text-cyan-glow hover:text-matrix transition-colors">{profile?.github}</a></div>
                  <div><span className="text-amber-glow">LinkedIn:</span> <a href={`https://${profile?.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-cyan-glow hover:text-matrix transition-colors">{profile?.linkedin}</a></div>
                  <div><span className="text-amber-glow">LeetCode:</span> <a href={`https://${profile?.leetcode}`} target="_blank" rel="noopener noreferrer" className="text-amber-glow hover:text-matrix transition-colors">{profile?.leetcode}</a></div>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block border border-matrix p-4 rounded bg-terminal-bg/30">
                  <div className="text-xs text-gray-400 mb-3 flex items-center justify-center">
                    <i className="fas fa-server mr-2"></i>
                    SYSTEM STATUS
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 bg-terminal-gray rounded">
                      <span className="text-muted-foreground">Experience:</span>
                      <span className="text-matrix font-bold">
                        <AnimatedCounter 
                          value={4} 
                          suffix="+ Years"
                          duration={2000}
                          delay={500}
                          startValue={3}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-terminal-gray rounded">
                      <span className="text-muted-foreground">Specialization:</span>
                      <div className="group relative">
                        <span className="text-matrix font-bold flex items-center cursor-pointer hover:text-cyan-glow transition-colors">
                          Backend/AI
                          <i className="fas fa-microchip ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </span>
                        
                        {/* Hover Tooltip */}
                        <div className="absolute right-0 top-8 w-72 bg-terminal-bg border border-matrix p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                          <div className="text-xs space-y-3">
                            <div className="border-b border-terminal-border pb-2">
                              <div className="text-matrix font-bold mb-2">Core Technologies</div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                  <i className="fas fa-server text-cyan-glow mr-2"></i>
                                  <span>Node.js/Express</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-database text-amber-glow mr-2"></i>
                                  <span>PostgreSQL/MongoDB</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-cloud text-blue-400 mr-2"></i>
                                  <span>AWS/Cloud Services</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-brain text-purple-400 mr-2"></i>
                                  <span>Machine Learning</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-b border-terminal-border pb-2">
                              <div className="text-matrix font-bold mb-2">AI/ML Stack</div>
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <i className="fas fa-robot text-green-400 mr-2"></i>
                                  <span>OpenAI API Integration</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-chart-line text-red-400 mr-2"></i>
                                  <span>Data Analysis & Modeling</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-cogs text-matrix mr-2"></i>
                                  <span>NLP & Text Processing</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-matrix font-bold mb-2">Architecture</div>
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <i className="fas fa-sitemap text-cyan-glow mr-2"></i>
                                  <span>Microservices & APIs</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-shield-alt text-green-400 mr-2"></i>
                                  <span>Security & Authentication</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-tachometer-alt text-amber-glow mr-2"></i>
                                  <span>Performance Optimization</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-terminal-gray rounded">
                      <span className="text-muted-foreground">Status:</span>
                      <div className="group relative">
                        <span className="text-green-400 font-bold flex items-center cursor-pointer hover:text-green-300 transition-colors">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2 group-hover:animate-bounce"></div>
                          AVAILABLE
                          <i className="fas fa-info-circle ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </span>
                        
                        {/* Hover Tooltip */}
                        <div className="absolute right-0 top-8 w-64 bg-terminal-bg border border-matrix p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                          <div className="text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Current Time:</span>
                              <span className="text-matrix font-mono" id="current-time">{currentTime}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Timezone:</span>
                              <span className="text-cyan-glow">UTC-5 (EST)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Response Time:</span>
                              <span className="text-green-400">&lt; 24h</span>
                            </div>
                            <div className="border-t border-terminal-border pt-2 mt-2">
                              <div className="text-green-400 font-bold mb-1">Open to:</div>
                              <div className="text-xs space-y-1">
                                <div className="flex items-center">
                                  <i className="fas fa-briefcase text-amber-glow mr-2"></i>
                                  <span>Full-time opportunities</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-code text-cyan-glow mr-2"></i>
                                  <span>Contract work</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fas fa-users text-matrix mr-2"></i>
                                  <span>Collaborative projects</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Commands */}
        <div className="mb-2">
          <div className="text-matrix mb-4">Available commands:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <button 
              className="p-4 border border-terminal-border hover:border-cyan-glow hover:bg-cyan-glow/5 transition-all duration-300 text-left group"
              onClick={() => scrollToSection('skills')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-cyan-glow font-mono font-bold">./Skills</div>
                <i className="fas fa-arrow-right text-muted-foreground group-hover:text-cyan-glow transition-colors"></i>
              </div>
              <div className="text-xs text-gray-400">View technical stack</div>
            </button>
            
            <button 
              className="p-4 border border-terminal-border hover:border-amber-glow hover:bg-amber-glow/5 transition-all duration-300 text-left group"
              onClick={() => scrollToSection('experience')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-amber-glow font-mono font-bold">./Experience</div>
                {currentView === 'dev' && (
                  <i className="fas fa-exchange-alt text-muted-foreground group-hover:text-amber-glow transition-colors" title="Switch to Normal View"></i>
                )}
                {currentView === 'normal' && (
                  <i className="fas fa-arrow-right text-muted-foreground group-hover:text-amber-glow transition-colors"></i>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {currentView === 'dev' ? 'Switch to Normal View' : 'Work history'}
              </div>
            </button>
            
            <button 
              className="p-4 border border-terminal-border hover:border-red-glow hover:bg-red-glow/5 transition-all duration-300 text-left group"
              onClick={() => scrollToSection('projects')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-red-glow font-mono font-bold">./Projects</div>
                <i className="fas fa-arrow-right text-muted-foreground group-hover:text-red-glow transition-colors"></i>
              </div>
              <div className="text-xs text-gray-400">Code repositories</div>
            </button>
            
            {/* Enhanced API Command Button */}
            <button 
              className="p-4 border-2 border-matrix bg-matrix/5 hover:bg-matrix/10 transition-all duration-300 text-left group"
              onClick={() => scrollToSection('api')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-matrix font-mono font-bold">./API</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {currentView === 'normal' && (
                    <i className="fas fa-exchange-alt text-matrix" title="Switch to Developer View"></i>
                  )}
                  {currentView === 'dev' && (
                    <i className="fas fa-rocket text-matrix"></i>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {currentView === 'normal' ? 'Switch to Developer View' : 'Interactive playground • Test /api/skills, /api/experience, /api/projects • View responses • Real-time logs'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
