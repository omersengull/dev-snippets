"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function toggleBookmarkAction(snippetId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {error:'Unauthorized access'}

  const { data: existing } = await supabase
    .from("saved_snippets")
    .select()
    .eq("snippet_id", snippetId)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    await supabase.from('saved_snippets').delete().eq('id',existing.id);
  }
  else{
    await supabase.from('saved_snippets').insert([{snippet_id:snippetId,user_id:user.id}]);
  }
  revalidatePath(`/snippet/${snippetId}`);
}
