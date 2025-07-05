export default function TerminalHeader() {
  return (
    <header className="relative z-10 border-b border-terminal-border bg-terminal-gray">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm">shubham@portfolio:~$</span>
          </div>
          <div className="text-xs text-gray-400">
            <i className="fas fa-signal mr-2"></i>Connection: Secure | Status: Online
          </div>
        </div>
      </div>
    </header>
  );
}
