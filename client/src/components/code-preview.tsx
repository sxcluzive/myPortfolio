interface CodePreviewProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodePreview({ code, language = 'python', filename }: CodePreviewProps) {
  const renderHighlightedCode = (code: string) => {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Split the line into tokens for highlighting
      const tokens = line.split(/(\s+)/);
      
      return (
        <div key={lineIndex} className="mb-1">
          {tokens.map((token, tokenIndex) => {
            // Python keywords
            if (token.match(/^(from|import|def|class|if|else|elif|return|async|await|try|except|with|as|in|is|not|and|or|True|False|None|pass|break|continue|raise|finally|lambda|yield|del|global|nonlocal)$/)) {
              return <span key={tokenIndex} className="syntax-keyword">{token}</span>;
            } 
            // String literals (including f-strings)
            else if (token.match(/^[f]?".*?"$|^[f]?'.*?'$/)) {
              return <span key={tokenIndex} className="syntax-string">{token}</span>;
            } 
            // Comments
            else if (token.startsWith('#')) {
              return <span key={tokenIndex} className="syntax-comment">{token}</span>;
            } 
            // Function calls
            else if (token.match(/^[a-zA-Z_][a-zA-Z0-9_]*\($/)) {
              const funcName = token.slice(0, -1);
              return <span key={tokenIndex}><span className="syntax-function">{funcName}</span>(</span>;
            }
            // Decorators
            else if (token.startsWith('@')) {
              return <span key={tokenIndex} className="syntax-decorator">{token}</span>;
            }
            // Numbers
            else if (token.match(/^\d+(\.\d+)?$/)) {
              return <span key={tokenIndex} className="syntax-number">{token}</span>;
            }
            // Built-in functions and types
            else if (token.match(/^(print|len|str|int|float|list|dict|set|tuple|range|enumerate|zip|map|filter|sorted|reversed|open|type|isinstance|hasattr|getattr|setattr|delattr|super|property|staticmethod|classmethod)$/)) {
              return <span key={tokenIndex} className="syntax-builtin">{token}</span>;
            }
            // Self parameter
            else if (token === 'self') {
              return <span key={tokenIndex} className="syntax-self">{token}</span>;
            }
            else {
              return <span key={tokenIndex}>{token}</span>;
            }
          })}
        </div>
      );
    });
  };

  return (
    <div className="border border-terminal-border rounded p-4 mb-4 bg-black text-xs font-mono overflow-x-auto">
      {filename && (
        <div className="text-gray-400 mb-2"># {filename}</div>
      )}
      <div className="whitespace-pre-wrap">
        {renderHighlightedCode(code)}
      </div>
    </div>
  );
}
