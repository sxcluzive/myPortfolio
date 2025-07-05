import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function HeroSection() {
  const { data: profileResponse, isLoading } = useQuery<{ status: number; data: Profile }>({
    queryKey: ["/api/profile"],
  });

  const profile = profileResponse?.data;

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
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
            <span className="text-matrix mr-2">root@shubham-portfolio:~#</span>
            <span className="terminal-cursor">whoami</span>
          </div>
          
          {/* Personal Info Output */}
          <div className="ml-4 border border-terminal-border rounded-lg p-6 bg-terminal-gray">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-3xl font-bold text-matrix mb-2">{profile?.name}</h1>
                <h2 className="text-xl text-cyan-glow mb-4">{profile?.role} @ {profile?.company}</h2>
                <div className="space-y-2 text-sm">
                  <div><span className="text-amber-glow">Email:</span> {profile?.email}</div>
                  <div><span className="text-amber-glow">Phone:</span> {profile?.phone}</div>
                  <div><span className="text-amber-glow">Location:</span> {profile?.location}</div>
                  <div><span className="text-amber-glow">GitHub:</span> {profile?.github}</div>
                  <div><span className="text-amber-glow">LinkedIn:</span> {profile?.linkedin}</div>
                  <div><span className="text-amber-glow">LeetCode:</span> {profile?.leetcode}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block border border-matrix p-4 rounded">
                  <div className="text-xs text-gray-400 mb-2">SYSTEM STATUS</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="text-matrix">
                        <AnimatedCounter 
                          value={profile?.experienceYears || 0} 
                          suffix="+ Years"
                          duration={2000}
                          delay={500}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Specialization:</span>
                      <span className="text-matrix">Backend/APIs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-400">AVAILABLE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Commands */}
        <div className="mb-2">
          <div className="text-matrix mb-1">Available commands:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <button 
              className="p-3 border border-terminal-border hover:border-matrix transition-colors text-left"
              onClick={() => scrollToSection('skills')}
            >
              <div className="text-cyan-glow">./skills</div>
              <div className="text-xs text-gray-400">View technical stack</div>
            </button>
            <button 
              className="p-3 border border-terminal-border hover:border-matrix transition-colors text-left"
              onClick={() => scrollToSection('experience')}
            >
              <div className="text-cyan-glow">./experience</div>
              <div className="text-xs text-gray-400">Work history</div>
            </button>
            <button 
              className="p-3 border border-terminal-border hover:border-matrix transition-colors text-left"
              onClick={() => scrollToSection('projects')}
            >
              <div className="text-cyan-glow">./projects</div>
              <div className="text-xs text-gray-400">Code repositories</div>
            </button>
            <button 
              className="p-3 border border-terminal-border hover:border-matrix transition-colors text-left"
              onClick={() => scrollToSection('api')}
            >
              <div className="text-cyan-glow">./api</div>
              <div className="text-xs text-gray-400">Interactive playground</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
