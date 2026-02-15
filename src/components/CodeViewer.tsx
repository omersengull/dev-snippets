'use client';

import  { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  language: string;
  filename: string;
}

export default function CodeViewer({ code, language, filename }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl bg-[#0d1117]">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border border-gray-800">
        <div className="flex items-center gap-2">
          <Terminal className="text-yellow-500 w-4 h-4" />
          <span className="text-xs font-mono text-text-muted">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      {/* Code Body */}
      <div className="text-sm font-mono custom-scrollbar">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#0d1117',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#484f58',
            textAlign: 'right',
            borderRight: '1px solid #30363d',
            marginRight: '1em',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}