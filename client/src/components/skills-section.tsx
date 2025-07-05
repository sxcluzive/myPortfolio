import { useQuery } from "@tanstack/react-query";
import SystemMetrics from "@/components/system-metrics";
import { useView } from "@/contexts/view-context";
import type { Skill } from "@shared/schema";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function SkillsSection() {
  const { currentView } = useView();
  const { data: skillsResponse, isLoading } = useQuery<{ status: number; data: Skill[] }>({
    queryKey: ["/api/skills"],
  });

  const skills = skillsResponse?.data || [];

  if (isLoading) {
    return (
      <section id="skills" className="min-h-screen bg-terminal-gray p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-matrix">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen bg-terminal-gray p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-3">
          <span className="text-matrix mr-2">root@shubhxcluzive:~#</span>
          <span>cat /etc/skills.config</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skills Content - Different for Normal vs Dev */}
          <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg">
            {currentView === 'normal' ? (
              // Normal View - Business-focused skills
              <div>
                <div className="text-amber-glow mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-briefcase mr-2"></i>Professional Competencies
                  </div>
                  <div className="text-xs text-gray-400">
                    <AnimatedCounter 
                      value={skills.reduce((total, skill) => total + skill.technologies.length, 0)} 
                      suffix=" Skills"
                      duration={3000}
                      delay={1000}
                    />
                  </div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-matrix">
                    ├── Technical Leadership
                  </div>
                  <div className="ml-4 text-gray-300">
                    │   ├── Backend Architecture Design
                    │   ├── API Development & Integration
                    │   ├── Database Design & Optimization
                    │   └── Cloud Infrastructure Management
                  </div>
                  
                  <div className="text-matrix">
                    ├── Problem Solving
                  </div>
                  <div className="ml-4 text-gray-300">
                    │   ├── System Performance Optimization
                    │   ├── Scalability Solutions
                    │   ├── Security Implementation
                    │   └── Technical Troubleshooting
                  </div>
                  
                  <div className="text-matrix">
                    └── Team Collaboration
                  </div>
                  <div className="ml-4 text-gray-300">
                        ├── Code Reviews & Mentoring
                        ├── Cross-functional Communication
                        ├── Agile Development Practices
                        └── Technical Documentation
                  </div>
                </div>
              </div>
            ) : (
              // Developer View - Technical skills tree
              <div>
                <div className="text-amber-glow mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-code mr-2"></i>Technical Skills Tree
                  </div>
                  <div className="text-xs text-gray-400">
                    <AnimatedCounter 
                      value={skills.reduce((total, skill) => total + skill.technologies.length, 0)} 
                      suffix=" Technologies"
                      duration={3000}
                      delay={1000}
                    />
                  </div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  {skills.map((skillCategory, index) => (
                    <div key={skillCategory.id}>
                      <div className="text-matrix">
                        {index === skills.length - 1 ? '└──' : '├──'} {skillCategory.category}
                      </div>
                      <div className="ml-4 text-gray-300">
                        {skillCategory.technologies.map((tech, techIndex) => (
                          <div key={techIndex}>
                            {index === skills.length - 1 ? '    ' : '│   '}
                            {techIndex === skillCategory.technologies.length - 1 ? '└──' : '├──'} {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* System Metrics Dashboard */}
          <SystemMetrics />
        </div>
      </div>
    </section>
  );
}
