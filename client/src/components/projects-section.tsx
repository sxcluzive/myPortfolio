import { useQuery } from "@tanstack/react-query";
import CodePreview from "@/components/code-preview";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const { data: projectsResponse, isLoading } = useQuery<{ status: number; data: Project[] }>({
    queryKey: ["/api/projects"],
  });

  const projects = projectsResponse?.data || [];

  if (isLoading) {
    return (
      <section id="projects" className="min-h-screen bg-terminal-gray p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-matrix">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-terminal-gray p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-3">
                      <span className="text-matrix mr-2">root@shubhxcluzive:~#</span>
          <span>ls -la ~/projects/</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="border border-terminal-border rounded-lg p-6 bg-terminal-bg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-matrix font-bold">{project.name}</h3>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-glow hover:text-matrix transition-colors"
                  >
                    <i className="fab fa-github text-xl"></i>
                  </a>
                )}
              </div>
              
              {/* Code Preview */}
              {project.codePreview && (
                <CodePreview code={project.codePreview} language="python" />
              )}

              <p className="text-sm text-gray-300 mb-4">
                {project.description}
              </p>
              
              <div className="text-xs">
                <div className="text-amber-glow mb-2">Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => {
                    const colors = [
                      'bg-matrix text-black', 
                      'bg-cyan-glow text-black', 
                      'bg-amber-glow text-black', 
                      'bg-red-glow text-black', 
                      'bg-green-400 text-black',
                      'bg-purple-400 text-black',
                      'bg-blue-400 text-black'
                    ];
                    const colorClass = colors[index % colors.length];
                    return (
                      <span key={index} className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Database Schema Visualizer */}
        <div className="mt-8 border border-terminal-border rounded-lg p-6 bg-terminal-bg">
          <div className="text-amber-glow mb-4 flex items-center">
            <i className="fas fa-database mr-2"></i>Database Schema - E-commerce Project
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm font-mono">
            <div className="border border-matrix rounded p-4">
              <div className="text-matrix mb-2">Users Table</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div>├── id (PK, UUID)</div>
                <div>├── email (UNIQUE)</div>
                <div>├── password_hash</div>
                <div>├── created_at</div>
                <div>└── updated_at</div>
              </div>
            </div>
            <div className="border border-cyan-glow rounded p-4">
              <div className="text-cyan-glow mb-2">Products Table</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div>├── id (PK, UUID)</div>
                <div>├── name (INDEXED)</div>
                <div>├── price (DECIMAL)</div>
                <div>├── category_id (FK)</div>
                <div>└── inventory_count</div>
              </div>
            </div>
            <div className="border border-amber-glow rounded p-4">
              <div className="text-amber-glow mb-2">Orders Table</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div>├── id (PK, UUID)</div>
                <div>├── user_id (FK)</div>
                <div>├── total_amount</div>
                <div>├── status (ENUM)</div>
                <div>└── order_items (1:M)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
