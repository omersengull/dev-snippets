"use server";

import { createClient } from "@/utils/supabase/server"; // Kendi server client yoluna göre ayarla
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function createCommentAction(formData: {
  content: string;
  snippetId: string;
  parentId?: string | null;
}) {
  const supabase = await createClient();


  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "You must login!" }); 

  const { error } = await supabase.from("comments").insert([
    {
      content: formData.content,
      snippet_id: formData.snippetId,
      user_id: user.id,
      parent_id: formData.parentId || null,
    },
  ]);

  if (error) throw error;

  revalidatePath(`/snippets/${formData.snippetId}`);
}