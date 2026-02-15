"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  isPending: boolean;
  onToggle: () => void;
  user: any; 
}

const BookmarkButton = ({ isBookmarked, isPending, onToggle, user }: BookmarkButtonProps) => {
  
  const handleClick = () => {
    // Giriş kontrolünü burada yapabiliriz
    if (!user) {
      toast.error("You must login to do this!", {
        icon: "🔒",
        style: {
          borderRadius: "10px",
          background: "#1e1e2e",
          color: "#fff",
          border: "1px solid #313244",
        },
      });
      return;
    }

    // Üst komponentten gelen fonksiyonu çalıştır
    onToggle();
  };

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-border/50 border-gray-800 rounded-lg font-bold text-sm transition-all border border-border text-text-muted hover:text-white cursor-pointer disabled:opacity-50"
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-5 h-5 text-primary" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
      
      <span className={isBookmarked ? "text-primary" : ""}>
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </span>
    </button>
  );
};

export default BookmarkButton;