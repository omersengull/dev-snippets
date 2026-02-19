"use client";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  className = "",
  showLineNumbers = false,
  maxHeight = "500px"
}) => {
  return (
    <div className={`font-mono text-sm leading-relaxed overflow-x-auto ${className}`}
    style={{ maxHeight: maxHeight, display: 'flex', flexDirection: 'column' }}>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            background: '#0d1117', // Match the background of CodeViewer
            fontSize: '0.875rem', // text-sm
            lineHeight: '1.5', // leading-relaxed
            padding: '1.5rem',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#484f58', // from CodeViewer
            textAlign: 'right',
            borderRight: '1px solid #30363d', // from CodeViewer
            marginRight: '1em',
          }}
        >
          {code}
        </SyntaxHighlighter>
    </div>
  );
};

