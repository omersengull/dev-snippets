  import { createClient } from "@/utils/supabase/server";
  import ExploreClient from "./ExploreClient";

  export default async function ExplorePage() {
    const supabase = await createClient();
    const { count: userCount, error:userError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });
    if (userError) {
      console.error("Sayı çekilirken hata oluştu:", userError.message);
    } else {
      console.log("Toplam profil sayısı:", userCount);
    }
    const { data: snippets, error } = await supabase
      .from("snippets")
      .select(
        `
        *,
        profiles (
          full_name,
          avatar_url
        )
      `,
      )
      .eq("visibility", "Public")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Veri çekilirken hata oluştu:", error);
    }

    return <ExploreClient userCount={userCount || 0} snippets={snippets || []} />;
  }
