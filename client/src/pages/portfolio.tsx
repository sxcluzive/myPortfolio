import { useEffect } from "react";
import TerminalHeader from "@/components/terminal-header";
import HeroSection from "@/components/hero-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ApiSection from "@/components/api-section";
import ControlPanel from "@/components/control-panel";
import { ViewProvider, useView } from "@/contexts/view-context";

function PortfolioContent() {
  const { currentView } = useView();

  useEffect(() => {
    document.title = "Shubham Singh - Backend Engineer Terminal";
  }, []);

  return (
    <div className="bg-terminal-bg text-matrix font-mono overflow-x-hidden min-h-screen">
      {/* Matrix Rain Background Effect */}
      <div className="matrix-rain"></div>
      
      <TerminalHeader />
      
      {/* Unified Control Panel */}
      <ControlPanel />
      
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        
        {/* Experience Section - Only in Normal View */}
        {currentView === 'normal' && (
          <ExperienceSection />
        )}
        
        <ProjectsSection />
        
        {/* API Playground - Only in Developer View */}
        {currentView === 'dev' && (
          <ApiSection />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-terminal-border bg-terminal-gray p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-matrix">shubham@portfolio</span>
              <span className="text-gray-400 ml-2">© 2024 All systems operational</span>
              <span className="text-muted-foreground ml-2">
                {currentView === 'normal' ? 'Normal View' : 'Developer View'}
              </span>
            </div>
            <div className="flex space-x-4 text-sm">
              <a 
                href="mailto:shubh.message@gmail.com" 
                className="text-cyan-glow hover:text-matrix transition-colors"
              >
                <i className="fas fa-envelope mr-1"></i>Email
              </a>
              <a 
                href="https://github.com/shubhxcluzive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-glow hover:text-matrix transition-colors"
              >
                <i className="fab fa-github mr-1"></i>GitHub
              </a>
              <a 
                href="https://linkedin.com/in/shubhxcluzive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-glow hover:text-matrix transition-colors"
              >
                <i className="fab fa-linkedin mr-1"></i>LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Portfolio() {
  return (
    <ViewProvider>
      <PortfolioContent />
    </ViewProvider>
  );
}
