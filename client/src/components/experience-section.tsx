import { useQuery } from "@tanstack/react-query";
import type { Experience } from "@shared/schema";

export default function ExperienceSection() {
  const { data: experienceResponse, isLoading } = useQuery<{ status: number; data: Experience[] }>({
    queryKey: ["/api/experience"],
  });

  const experiences = experienceResponse?.data || [];

  if (isLoading) {
    return (
      <section id="experience" className="min-h-screen bg-terminal-bg p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-matrix">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="min-h-screen bg-terminal-bg p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-3">
                      <span className="text-matrix mr-2">root@shubhxcluzive:~#</span>
          <span>tail -f /var/log/career.log</span>
        </div>

        <div className="space-y-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="border border-terminal-border rounded-lg p-6 bg-terminal-gray">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg text-matrix font-bold">{experience.company}</h3>
                  <p className="text-cyan-glow">{experience.role}</p>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <div>{experience.duration}</div>
                  <div>{experience.location}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {experience.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-matrix mr-2">•</span>
                    <span dangerouslySetInnerHTML={{
                      __html: achievement.replace(
                        /(\d+%|\d+\+|\d+[-‑]\w+|\d+\.\d+%)/g,
                        '<span class="text-amber-glow">$1</span>'
                      )
                    }} />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-400">
                <span className="text-cyan-glow">Stack:</span> {experience.technologies.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
