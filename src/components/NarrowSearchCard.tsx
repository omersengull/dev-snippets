import Link from "next/link";
import { Eye, Bookmark, ChevronRight, Terminal } from "lucide-react";

interface NarrowSearchCardProps {
  snippet: {
    id: string;
    title: string;
    language: string;
    views: number;
    saved_count: number;
  };
  onSelect?: () => void;
}

export const NarrowSearchCard = ({ snippet, onSelect }: NarrowSearchCardProps) => {
  return (
    <Link
      href={`/snippet/${snippet.id}`}
      onClick={onSelect}
      className="group flex items-center justify-between p-3 hover:bg-white/5 transition-all border-b border-dark-700/50 last:border-0"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Sol tarafta küçük bir ikon alanı */}
        <div className="p-2 bg-dark-700 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Terminal size={16} className="text-slate-400 group-hover:text-primary" />
        </div>

        {/* Metin Alanı */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-slate-200 truncate group-hover:text-white">
            {snippet.title}
          </span>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80">
              {snippet.language}
            </span>
            
            {/* İstatistikler */}
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {snippet.views}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark size={10} />
                {snippet.saved_count}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ tarafta ok ikonu */}
      <ChevronRight 
        size={14} 
        className="text-slate-600 group-hover:text-white transform group-hover:translate-x-1 transition-all" 
      />
    </Link>
  );
};