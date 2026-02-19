"use client";
import { createCommentAction } from "@/app/actions/comments";
import { Snippet } from "@/types/snippet";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
interface CommentInputProps {
  clickedReply?:boolean;
  setClickedReply?:React.Dispatch<React.SetStateAction<boolean>>;
  snippetId: string;
  userAvatar: string;
  userName: string;
  parentId?: string | null;
}
const CommentInput = ({
  snippetId,
  clickedReply,
  setClickedReply,
  userAvatar,
  userName,
  parentId = null,
}: CommentInputProps) => {
  const [text, setText] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const handlePostComment = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      await createCommentAction({
        content: text,
        snippetId: snippetId,
        parentId: parentId,
      });
      setText("");
      toast.success("Comment added successfully!");

    } catch (error) {
      toast.error("An error occurred!" + error);
    }
    finally{
      setIsLoading(false);
      if(setClickedReply) setClickedReply(false);  
    }
  };
  return (
    <div className="flex gap-4 mb-8">
      <Image
        src={userAvatar}
        alt={userName}
        width={64}
        height={64}
        className="rounded-full object-cover h-10 w-10 border border-border"
      />
      <div className="flex-1 space-y-3">
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          className="w-full bg-[#0d1117] border-gray-800 bg-card border border-border rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] text-white placeholder:text-gray-600 outline-none resize-y"
          placeholder="Add a comment or question..."
        />
        <div className="flex justify-end">
          <button
          disabled={isLoading}
            onClick={handlePostComment}
            className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary-hover transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;