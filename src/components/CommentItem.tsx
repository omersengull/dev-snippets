"use client";
import { MessageSquare, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import CommentInput from "./CommentInput";
import { useRouter } from "next/navigation";
export default function CommentItem({
  snippetId,
  comment,
  userName,
  userAvatar,
  isReply = false,
}: {
  comment: any;
  userName: string;
  userAvatar: string;
  snippetId: string;
  isReply?: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  const [clickedReply, setClickedReply] = useState(false);

  useEffect(() => {
    const checkLike = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && comment.comment_likes) {
        const liked = comment.comment_likes.some(
          (l: any) => l.user_id === user.id,
        );
        setIsLiked(liked);
      }
    };
    checkLike();
  }, [comment.id]);
  const handleClickReply = () => {
    if (!clickedReply) {
      setClickedReply(true);
    } else {
      setClickedReply(false);
    }
  };
  const handleLike = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return toast.error("You must login to like!");
    const previousLiked = isLiked;
    const previousCount = likeCount;

    // 2. Optimistic Update (Arayüzü anında güncelle)
    setIsLiked(!previousLiked);
    setLikeCount(previousLiked ? previousCount - 1 : previousCount + 1);

    if (previousLiked) {
      // Zaten beğenmişse: TABLODAN SİL (Unlike)
      const { error } = await supabase
        .from("comment_likes")
        .delete()
        .eq("comment_id", comment.id)
        .eq("user_id", user.id);

      await supabase.rpc("decrement_likes", { row_id: comment.id });
      if (error) rollback(previousLiked, previousCount);
    } else {
      // Beğenmemişse: TABLOYA EKLE (Like)
      const { error } = await supabase
        .from("comment_likes")
        .insert({ comment_id: comment.id, user_id: user.id });
      await supabase.rpc("increment_likes", { row_id: comment.id });
      if (error) rollback(previousLiked, previousCount);
    }
  };

  const rollback = (prevLiked: boolean, prevCount: number) => {
    setIsLiked(prevLiked);
    setLikeCount(prevCount);
    toast.error("Something went wrong!");
  };
  return (
    <div className="flex gap-4 group">
      {isReply && (
        <div className="absolute -left-6 top-5 w-6 h-px bg-gray-800" />
      )}
      <Image
        src={comment.profiles.avatar_url}
        alt={comment.profiles.full_name}
        width={isReply ? 32 : 40}
        height={isReply ? 32 : 40}
        className={`rounded-full z-10 object-cover ${isReply ? "w-8 h-8" : "w-10 h-10"}`}
      />

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-white">
            {comment.profiles.full_name}
          </span>
          {comment.parent_id === null && (
            <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Author
            </span>
          )}
          <span className="text-xs text-text-muted">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm text-text-muted leading-relaxed">
          {comment.content}
        </p>

        {/* Buton Satırı */}
        <div className="flex items-center gap-4 pt-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer focus:outline-none ${
              isLiked ? "text-primary" : "text-text-muted hover:text-primary"
            }`}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ThumbsUp
                className={`w-4 h-4 ${isLiked ? "fill-primary" : ""}`}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.span
                key={likeCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
              >
                {likeCount}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <button
            onClick={handleClickReply}
            className={`flex items-center gap-1.5 text-xs font-medium transition-all active:scale-95 ${
              clickedReply
                ? "text-primary"
                : "text-text-muted hover:text-primary"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {clickedReply ? "Cancel" : "Reply"}
          </button>
        </div>

        <AnimatePresence>
          {clickedReply && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full relative"
            >
              {/* Input'u yukarıdaki avatarın dikey hattına bağlayan çizgi */}
              <div className="absolute -left-[38px] -top-8 w-6 h-[48px] border-l border-b border-gray-800 rounded-bl-xl" />

              <div className="mt-4 pt-2">
                <CommentInput
                  snippetId={snippetId}
                  userName={userName}
                  userAvatar={userAvatar}
                  parentId={comment.id}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
