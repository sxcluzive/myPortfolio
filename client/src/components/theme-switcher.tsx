import { useState, useEffect } from "react";

type Theme = "matrix" | "macos" | "ubuntu";

const themes = [
  {
    id: "matrix" as Theme,
    name: "Matrix",
    description: "Classic black/grey with bright green",
    icon: "🟢"
  },
  {
    id: "macos" as Theme,
    name: "macOS Terminal",
    description: "Soft black with neon colors",

  },
  {
    id: "ubuntu" as Theme,
    name: "Ubuntu Terminal",
    description: "Dark purple with Ubuntu green",
    icon: "🐧"
  }
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("matrix");

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    switch (theme) {
      case "matrix":
        root.style.setProperty("--background", "hsl(0, 0%, 8%)");
        root.style.setProperty("--foreground", "hsl(120, 100%, 70%)");
        root.style.setProperty("--muted", "hsl(0, 0%, 12%)");
        root.style.setProperty("--muted-foreground", "hsl(0, 0%, 45.1%)");
        root.style.setProperty("--popover", "hsl(0, 0%, 12%)");
        root.style.setProperty("--popover-foreground", "hsl(120, 100%, 70%)");
        root.style.setProperty("--card", "hsl(0, 0%, 12%)");
        root.style.setProperty("--card-foreground", "hsl(120, 100%, 70%)");
        root.style.setProperty("--border", "hsl(0, 0%, 25%)");
        root.style.setProperty("--input", "hsl(0, 0%, 25%)");
        root.style.setProperty("--primary", "hsl(120, 100%, 70%)");
        root.style.setProperty("--primary-foreground", "hsl(0, 0%, 8%)");
        root.style.setProperty("--secondary", "hsl(0, 0%, 12%)");
        root.style.setProperty("--secondary-foreground", "hsl(120, 100%, 70%)");
        root.style.setProperty("--accent", "hsl(0, 0%, 12%)");
        root.style.setProperty("--accent-foreground", "hsl(120, 100%, 70%)");
        root.style.setProperty("--destructive", "hsl(0, 84.2%, 60.2%)");
        root.style.setProperty("--destructive-foreground", "hsl(0, 0%, 98%)");
        root.style.setProperty("--ring", "hsl(120, 100%, 70%)");
        root.style.setProperty("--matrix", "hsl(120, 100%, 70%)");
        root.style.setProperty("--matrix-dark", "hsl(120, 100%, 60%)");
        root.style.setProperty("--terminal-bg", "hsl(0, 0%, 8%)");
        root.style.setProperty("--terminal-gray", "hsl(0, 0%, 12%)");
        root.style.setProperty("--terminal-border", "hsl(0, 0%, 25%)");
        root.style.setProperty("--cyan-glow", "hsl(180, 100%, 50%)");
        root.style.setProperty("--amber-glow", "hsl(45, 100%, 50%)");
        root.style.setProperty("--red-glow", "hsl(0, 100%, 62%)");
        break;
        
      case "macos":
        root.style.setProperty("--background", "#1e1e1e");
        root.style.setProperty("--foreground", "#c7c7c7");
        root.style.setProperty("--muted", "#232323");
        root.style.setProperty("--muted-foreground", "#7f7f7f");
        root.style.setProperty("--popover", "#232323");
        root.style.setProperty("--popover-foreground", "#c7c7c7");
        root.style.setProperty("--card", "#232323");
        root.style.setProperty("--card-foreground", "#c7c7c7");
        root.style.setProperty("--border", "#333");
        root.style.setProperty("--input", "#333");
        root.style.setProperty("--primary", "#39ff14");
        root.style.setProperty("--primary-foreground", "#1e1e1e");
        root.style.setProperty("--secondary", "#232323");
        root.style.setProperty("--secondary-foreground", "#39ff14");
        root.style.setProperty("--accent", "#232323");
        root.style.setProperty("--accent-foreground", "#39ff14");
        root.style.setProperty("--destructive", "#ff5c57");
        root.style.setProperty("--destructive-foreground", "#fff");
        root.style.setProperty("--ring", "#39ff14");
        root.style.setProperty("--matrix", "#39ff14");
        root.style.setProperty("--matrix-dark", "#00e600");
        root.style.setProperty("--terminal-bg", "#1e1e1e");
        root.style.setProperty("--terminal-gray", "#232323");
        root.style.setProperty("--terminal-border", "#333");
        root.style.setProperty("--cyan-glow", "#00eaff");
        root.style.setProperty("--amber-glow", "#ffe66d");
        root.style.setProperty("--red-glow", "#ff5c57");
        break;
        
      case "ubuntu":
        root.style.setProperty("--background", "#2d0922");
        root.style.setProperty("--foreground", "#ffffff");
        root.style.setProperty("--muted", "#3a0f2e");
        root.style.setProperty("--muted-foreground", "#a0a0a0");
        root.style.setProperty("--popover", "#3a0f2e");
        root.style.setProperty("--popover-foreground", "#ffffff");
        root.style.setProperty("--card", "#3a0f2e");
        root.style.setProperty("--card-foreground", "#ffffff");
        root.style.setProperty("--border", "#4a1a3a");
        root.style.setProperty("--input", "#4a1a3a");
        root.style.setProperty("--primary", "#4e9a06");
        root.style.setProperty("--primary-foreground", "#2d0922");
        root.style.setProperty("--secondary", "#3a0f2e");
        root.style.setProperty("--secondary-foreground", "#4e9a06");
        root.style.setProperty("--accent", "#3a0f2e");
        root.style.setProperty("--accent-foreground", "#4e9a06");
        root.style.setProperty("--destructive", "#cc0000");
        root.style.setProperty("--destructive-foreground", "#ffffff");
        root.style.setProperty("--ring", "#4e9a06");
        root.style.setProperty("--matrix", "#4e9a06");
        root.style.setProperty("--matrix-dark", "#3d7a05");
        root.style.setProperty("--terminal-bg", "#2d0922");
        root.style.setProperty("--terminal-gray", "#3a0f2e");
        root.style.setProperty("--terminal-border", "#4a1a3a");
        root.style.setProperty("--cyan-glow", "#34e2e2");
        root.style.setProperty("--amber-glow", "#c4a000");
        root.style.setProperty("--red-glow", "#cc0000");
        break;
    }
    
    setCurrentTheme(theme);
  };

  // Apply theme on mount
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeClick = () => {
    const currentIndex = themes.findIndex(t => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex].id;
    applyTheme(nextTheme);
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);
  const currentIndex = themes.findIndex(t => t.id === currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextThemeData = themes[nextIndex];
  


  return (
    <button
      onClick={handleThemeClick}
      className="flex items-center space-x-1 px-2 py-1 text-xs border border-terminal-border rounded hover:bg-terminal-gray transition-colors w-full justify-center"
      title={`Switch to ${nextThemeData?.name}`}
    >
      <span className="text-sm">{nextThemeData?.icon}</span>
      <span className="text-matrix truncate">{nextThemeData?.name}</span>
    </button>
  );
} 