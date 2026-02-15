"use client";
import { useEffect,useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ViewTracker({ snippetId }: { snippetId: string }) {
  const supabase = createClient();
  const hasIncremented = useRef(false);
  useEffect(() => {
    if (hasIncremented.current) return;

    const trackView = async () => {
      // 1. Kullanıcının bu oturumda bu snippet'ı görüp görmediğini kontrol et
      // (Sayfa her yenilendiğinde değil, oturum başına 1 kez saymak için)
      const viewedKey = `viewed_${snippetId}`;
      const hasViewed = sessionStorage.getItem(viewedKey);

      if (!hasViewed) {
        hasIncremented.current = true;
        // 2. SQL fonksiyonumuzu (rpc) çağır
        const { error } = await supabase.rpc("increment_views", { 
          target_id: snippetId 
        });
        if(error){
          console.error("Hata:", error);
          hasIncremented.current = false;
        }
        else { 
          sessionStorage.setItem(viewedKey, "true");
        }
      }
    };

    trackView();
  }, [snippetId, supabase]);

  return null; // Bu bileşen bir şey render etmez, sadece arka planda çalışır
}