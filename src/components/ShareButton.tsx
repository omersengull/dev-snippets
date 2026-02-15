"use client"
import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

const ShareButton = () => {
    const handleShare=()=>{
    const url=window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  }
  return (
    <div>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-border/50 border-gray-800 rounded-lg font-bold text-sm transition-all border border-border text-text-muted hover:text-white cursor-pointer"
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default ShareButton;
