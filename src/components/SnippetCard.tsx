"use client"
import React, { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Snippet } from "../types/snippet";
import { CodeBlock } from "./CodeBlock";
import Link from "next/link";

interface SnippetCardProps {
  snippet: Snippet;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Kopyalama başarısız: ", error);
    }
  };
  return (
    <div className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-dark-900/50 border-b border-white/5 flex justify-between items-center">
      <div className="flex items-center gap-3">       
          <Link href={`/snippet/${snippet.id}`} className="p-1.5 hover:bg-white/10 rounded-md transition-all text-slate-500 hover:text-white" title="Review Code">
            <ExternalLink width={18}/>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest ${
                  snippet.language === "React"
                    ? "bg-cyan-500/20 text-cyan-400"
                    : snippet.language === "TypeScript"
                      ? "bg-blue-500/20 text-blue-400"
                      : snippet.language === "Python"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-primary/20 text-primary"
                }`}
              >
                {snippet.language}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {
            copied && <span className="text-sm text-green-400 animate-in fade-in duration-300">Copied</span>
          }
          <button
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className="p-1 hover:bg-white/10 rounded-md transition-all"
            title="Copy code"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy
                size={16}
                className="text-slate-500 hover:text-white cursor-pointer transition-colors"
              />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-0 bg-[#0d1117] relative group-hover:bg-[#0f141c] transition-colors flex-1">
        <div className={`p-5 overflow-hidden relative`}>
        <CodeBlock code={snippet.code} language={snippet.language} />  
          {/* Fade out effect at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none group-hover:from-[#0f141c]"></div>
        </div>
      </div>

      {/* Footer / Stats */}
      <div className="p-3 px-5 flex items-center justify-between border-t border-white/5 bg-dark-900/30">
        <>
          <div className="flex items-center gap-2">
            <div
              className="size-6 rounded-full bg-cover bg-center border border-white/10"
              style={{
                backgroundImage: `url(${snippet.profiles?.avatar_url})`,
              }}
            ></div>
            <span className="text-xs font-medium text-gray-300">
              {snippet.profiles?.full_name}
            </span>
          </div>
        </>
      </div>
    </div>
  );
};
