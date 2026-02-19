"use client";
import { Search, Bell, Menu, Plus, UserRound, Code } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import AuthModal from "./AuthModal";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { NarrowSearchCard } from "./NarrowSearchCard";
interface SnippetProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  language: string;
  views: number;
  saved_count: number;
}
export const Navbar = ({ snippets }: { snippets: SnippetProps[] | null }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSnippets = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return snippets?.filter(
      (s) =>
        s.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        s.description
          ?.toLowerCase()
          .includes(searchQuery.toLocaleLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
    );
  }, [searchQuery, snippets]);
  const router = useRouter();
  const supabase = createClient();
  const lastUserRef = useRef<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;

      if (event === "SIGNED_IN" && currentUser) {
        // SADECE VE SADECE ref'teki önceki kullanıcı null ise toast göster
        // (Sekme değiştirince currentUser gelir ama ref zaten doludur, o yüzden toast çalışmaz)
        if (!lastUserRef.current) {
          toast.success(
            `Welcome back, ${currentUser.user_metadata.full_name || "User"}!`,
          );
        }
      } else if (event === "SIGNED_OUT") {
        toast.success("Logged out successfully.");
      }

      // Her durumda ref'i ve state'i güncelle
      lastUserRef.current = currentUser;
      setUser(currentUser);

      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);
  const getInitials = (email?: string) => {
    if (!email) return "??";
    const name = user?.user_metadata?.full_name || email;
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-dark-700 bg-dark-950/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer">
            <div className="bg-primary p-1.5 rounded-lg text-white neon-glow">
              <Code size={24} />
            </div>
            <Link
              href="/"
              className="text-xl font-bold leading-tight tracking-tight text-white hidden md:block"
            >
              DevSnippets
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile or simplified */}
          <div className="flex-1 max-w-2xl hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                <Search size={18} />
              </div>
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                type="text"
                className="block w-full pl-10 pr-3 py-2 bg-dark-900 border border-dark-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                placeholder="Search snippets, tags, or authors..."
              />
              {searchQuery && (
                <div className="absolute bg-dark-800 border border-dark-700 rounded-xl mt-2 w-full max-h-80 overflow-y-auto shadow-2xl z-50">
                  {filteredSnippets && filteredSnippets.length > 0 ? (
                    filteredSnippets.map((snippet) => (
                      <NarrowSearchCard
                        key={snippet.id}
                        snippet={snippet}
                        onSelect={() => setSearchQuery("")}
                      />
                    ))
                  ) : (
                    <div className="p-2">Sonuç bulunamadı.</div>
                  )}
                  
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <nav className="hidden lg:flex items-center gap-6 mr-4">
              <Link
                href="/explore"
                className={`text-sm font-medium transition-colors`}
              >
                Explore
              </Link>
            </nav>
            <div className="h-6 w-px bg-dark-700 hidden lg:block"></div>
            <nav className="hidden sm:block">
              <Link
                href="/createSnippet"
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold transition-all neon-glow group"
              >
                <Plus size={18} className="shrink-0" />
                <span className="whitespace-nowrap">Create Snippet</span>
              </Link>
            </nav>
            <button className="hidden sm:block text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-slate-400 hover:text-white">
              <Menu size={24} />
            </button>

            <div
              onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-dark-700 cursor-pointer hover:border-primary transition-all overflow-hidden bg-dark-900 relative"
            >
              {user ? (
                user.user_metadata.avatar_url || user.user_metadata.picture ? (
                  <img
                    referrerPolicy="no-referrer"
                    src={
                      user.user_metadata.avatar_url ||
                      user.user_metadata.picture
                    }
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-xs font-bold text-primary">
                    {getInitials(user.email)}
                  </span>
                )
              ) : (
                <UserRound size={20} className="text-slate-400" />
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal
        user={user}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
    </>
  );
};
