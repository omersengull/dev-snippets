import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import CodeViewer from "@/components/CodeViewer";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Comment } from "@/types/snippet";
import CommentItem from "@/components/CommentItem";
import Footer from "@/components/Footer";
import ViewTracker from "@/components/ViewTracker";
import SnippetActions from "@/components/SnippetActionsContext";
import CommentInput from "@/components/CommentInput";
import { buildCommentTree } from "@/components/CommentContainer";
import SortSelectButtons from "@/components/SortSelectButtons";
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export default async function SnippetPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { sort } = await searchParams;
  const currentSort = sort || "Top Rated";
  const supabase = await createClient();
  const { data: snippetData, error } = await supabase
    .from("snippets")
    .select(
      `*,
      profiles(full_name,avatar_url),comments(*,profiles(full_name,avatar_url),comment_likes(user_id))`,
    )
    .eq("id", id)
    .order("created_at", { foreignTable: "comments", ascending: true })
    .single();
  if (error || !snippetData) notFound();
  let commentsToProcess = [...(snippetData.comments || [])];
  if (currentSort.toLowerCase() === "Newest".toLowerCase()) {
    commentsToProcess.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } else if (currentSort.toLowerCase() === "Top Rated".toLowerCase()) {
    commentsToProcess.sort(
      (a, b) => (b.comment_likes?.length || 0) - (a.comment_likes?.length || 0),
    );
  }
  const commentTree = buildCommentTree(commentsToProcess || []);
  const { data: userData } = await supabase.auth.getUser();
  const { data: savedData } = await supabase
    .from("saved_snippets")
    .select()
    .eq("snippet_id", id)
    .eq("user_id", userData.user?.id)
    .single();
  const isBookmarked = !!savedData;

  return (
    <div className="min-h-screen flex flex-col border-dark-700 bg-dark-950/80">
      <ViewTracker snippetId={id} />
      {/* --- Main Content --- */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-8">
        {/* Breadcrumb & Title Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <Link href="#" className="hover:text-primary transition-colors">
              Snippets
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="#" className="hover:text-primary transition-colors">
              {snippetData.language
                ? snippetData.language.charAt(0).toUpperCase() +
                  snippetData.language.slice(1)
                : ""}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-main font-medium">
              {snippetData.file_name}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Image
                src={snippetData.profiles?.avatar_url}
                alt={snippetData.profiles?.full_name}
                width={64}
                height={64}
                className="rounded-xl object-cover shadow-lg border border-white/5"
              />
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  {snippetData.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="text-text-muted">by</span>

                  {snippetData.profiles.full_name.length > 16
                    ? snippetData.profiles.full_name.substring(0, 16) + "..."
                    : snippetData.profiles.full_name}

                  <span className="inline-block w-1 h-1 rounded-full bg-white/40 mx-2 shrink-0"></span>

                  <span className="text-text-muted">
                    Created{" "}
                    {new Date(snippetData.created_at).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "America/New_York",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SnippetActions
          snippetId={id}
          snippetData={snippetData}
          initialCount={snippetData.saved_count || 0}
          initialIsBookmarked={isBookmarked}
          views={snippetData.views}
          lines={snippetData.lines}
          user={userData.user}
        >
          <CodeViewer
            code={snippetData.code}
            language={snippetData.language}
            filename={snippetData.title}
          />

          <section className="bg-card p-6 rounded-xl border border-gray-800 bg-[#0d1117]">
            <h3 className="text-xl font-bold mb-4 text-white">Description</h3>
            <div className="prose prose-invert max-w-none text-text-muted space-y-4 text-sm leading-relaxed">
              <p>{snippetData?.description}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {snippetData.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold hover:bg-primary/20 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-6 ">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Discussion (
                {commentTree.length +
                  commentTree.reduce(
                    (acc: any, c: any) => acc + c.replies.length,
                    0,
                  )}
                )
              </h3>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span>Sort by:</span>
                <SortSelectButtons initialValue={currentSort} />
              </div>
            </div>

            {/* Input Area */}
            <CommentInput
              userName={snippetData.profiles.full_name}
              snippetId={id}
              userAvatar={snippetData.profiles.avatar_url}
            />

            {/* Comment List */}
            <div className="space-y-8">
              {commentTree.map((comment: Comment) => (
                <div key={comment.id} className="space-y-4">
                  {/* Main Comment */}
                  <CommentItem
                    key={comment.id}
                    snippetOwnerId={snippetData.user_id}
                    user={userData?.user}
                    userName={userData.user?.user_metadata.full_name}
                    userAvatar={
                      userData.user?.user_metadata.avatar_url ||
                      userData.user?.user_metadata.picture
                    }
                    isReply={false}
                    snippetId={id}
                    comment={comment}
                  />

                 
                </div>
              ))}
            </div>
          </section>
        </SnippetActions>
      </main>

      <Footer />
    </div>
  );
}
