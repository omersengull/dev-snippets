"use client";

import { MessageSquare, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import CommentInput from "./CommentInput";
import { User } from "@supabase/supabase-js";

export default function CommentItem({
  snippetId,
  comment,
  user,
  userName,
  snippetOwnerId,
  userAvatar,
  isReply = false,
}: {
  comment: any;
  user: User | null;
  userName: string;
  userAvatar: string;
  snippetOwnerId: string;
  snippetId: string;
  isReply?: boolean;
}) {
  const isAuthor = comment.user_id === snippetOwnerId;
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);
  const [clickedReply, setClickedReply] = useState(false);

  useEffect(() => {
    const checkLike = async () => {
      if (user && comment.comment_likes) {
        const liked = comment.comment_likes.some(
          (l: any) => l.user_id === user.id,
        );
        setIsLiked(liked);
      }
    };
    checkLike();
  }, [comment.id, user]);

  const handleLike = async () => {
    if (isLikeProcessing) return;
    if (!user) return toast.error("You must login to like!");

    setIsLikeProcessing(true);
    const previousLiked = isLiked;
    const previousCount = likeCount;

    setIsLiked(!previousLiked);
    setLikeCount(previousLiked ? previousCount - 1 : previousCount + 1);

    try {
      if (previousLiked) {
        const { error } = await supabase
          .from("comment_likes")
          .delete()
          .eq("comment_id", comment.id)
          .eq("user_id", user.id);
        if (error) throw error;
        await supabase.rpc("decrement_likes", { row_id: comment.id });
      } else {
        const { error } = await supabase
          .from("comment_likes")
          .insert({ comment_id: comment.id, user_id: user.id });
        if (error) throw error;
        await supabase.rpc("increment_likes", { row_id: comment.id });
      }
    } catch (error) {
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      toast.error("Something went wrong!");
    } finally {
      setIsLikeProcessing(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* --- ANA YORUM SATIRI --- */}
      <div className="flex gap-4 group w-full">
        <Image
          src={comment.profiles.avatar_url}
          alt={comment.profiles.full_name}
          width={isReply ? 32 : 40}
          height={isReply ? 32 : 40}
          className={`rounded-full object-cover shrink-0 ${
            isReply ? "w-8 h-8" : "w-10 h-10"
          }`}
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">
              {comment.profiles.full_name}
            </span>
            {isAuthor && (
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

          <div className="flex items-center gap-4 pt-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              disabled={isLikeProcessing}
              className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer focus:outline-none ${
                isLiked ? "text-primary" : "text-text-muted hover:text-primary"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-primary" : ""}`} />
              <span>{likeCount}</span>
            </motion.button>

            <button
              onClick={() => setClickedReply(!clickedReply)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-all active:scale-95 ${
                clickedReply ? "text-primary" : "text-text-muted hover:text-primary"
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
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <CommentInput
                    clickedReply={clickedReply}
                    setClickedReply={setClickedReply}
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

      {/* --- RECURSIVE YANITLAR (Özyineleme) --- */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 ml-6 pl-6 border-l border-white/5 space-y-6">
          {comment.replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              user={user}
              snippetId={snippetId}
              userName={userName}
              userAvatar={userAvatar}
              snippetOwnerId={snippetOwnerId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}