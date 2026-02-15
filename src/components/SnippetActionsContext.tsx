"use client";
import { useState, useTransition } from "react";
import { toggleBookmarkAction } from "@/app/snippet/[id]/actions";
import BookmarkButton from "./BookmarkButton";
import StatBox from "./StatBox";
import { Bookmark, Eye, FileCode, Heart } from "lucide-react";
import toast from "react-hot-toast";
import ShareButton from "./ShareButton";
import { User } from "@supabase/supabase-js";
import { Snippet } from "@/types/snippet";
interface SnippetActions{
  snippetId:string;
  initialCount:number;
  initialIsBookmarked:boolean;
  views:number;
  lines:number,
  user:User | null,
  snippetData:Snippet,
  children:React.ReactNode,
}
export default function SnippetActions({
  snippetId,
  initialCount,
  initialIsBookmarked,
  views,
  lines,
  user,
  snippetData,
  children, // Bu sayfanın sol tarafındaki her şeyi temsil ediyor
}:SnippetActions) {
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [count, setCount] = useState(initialCount);

  const handleToggle = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    setCount((prev: number) => (nextState ? prev + 1 : prev - 1));

    startTransition(async () => {
      try {
        const result = await toggleBookmarkAction(snippetId);
        if (result?.error) throw new Error(result.error);
        toast.success(nextState ? "Bookmarked!" : "Unbookmarked!");
      } catch (error: any) {
        setIsBookmarked(initialIsBookmarked);
        setCount(initialCount);
        toast.error(error.message || "Error");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* SOL TARAF - Kod, Açıklama, Yorumlar buraya gelecek */}
      <div className="lg:col-span-8 space-y-8">
        {/* Butonların olduğu satırı burada oluşturuyoruz, Share butonunu da yanına koyabilirsin */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <BookmarkButton
            isBookmarked={isBookmarked}
            isPending={isPending}
            onToggle={handleToggle}
            user={user}
          />
          <ShareButton />
        </div>
        {children}{" "}
       
        
        {/* Page.tsx'ten gelen CodeViewer, Description vb. buraya basılır */}
      </div>

      {/* SAĞ TARAF - İstatistikler */}
      <aside className="lg:col-span-4 space-y-6 sticky top-24">
        <div className="bg-card/70 backdrop-blur-sm border border-border/50 bg-[#0d1117] border-gray-800 p-6 rounded-xl space-y-6">
          <h4 className="font-bold text-lg text-white">Snippet Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <StatBox
              icon={<Eye className="w-4 h-4" />}
              label="Views"
              value={views}
            />
            {/* Canlı güncellenen sayı burası! */}
            <StatBox
              icon={<Bookmark className="w-4 h-4" />}
              label="Saved"
              value={count}
            />
            <StatBox
              icon={<FileCode className="w-4 h-4" />}
              label="Lines"
              value={lines}
            />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-blue-700 p-6 text-white shadow-xl shadow-primary/20">
          <div className="relative z-10">
            <h4 className="text-lg font-bold mb-2">
              Support {snippetData.profiles?.full_name}
            </h4>
            <p className="text-sm opacity-90 mb-4 font-light">
              If you found this snippet helpful, consider following the author
              for more weekly react patterns.
            </p>
            <button className="w-full bg-white text-primary py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
              Follow Author
            </button>
          </div>
          <Heart
            className="absolute -bottom-4 -right-4 text-white/20 w-32 h-32 rotate-12 select-none"
            fill="currentColor"
          />
        </div>
      </aside>
    </div>
  );
}
