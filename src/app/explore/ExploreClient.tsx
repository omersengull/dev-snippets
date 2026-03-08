"use client";
import { SnippetCard } from "../../components/SnippetCard";
import {
  Code,
  Terminal,
  Database,
  Settings,
  TrendingUp,
  Clock,
  Star,
  Users,
  Cpu,
  ChevronDown,
  FileCode,
  Layers,
  Code2,
  FileText,
  Braces,
  FileJson,
  Target,
  Gem,
  Plus,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useEffect, useMemo, useState } from "react";
import { Snippet } from "@/types/snippet";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

const ExploreClient = ({
  snippets,
  userCount,
}: {
  snippets: Snippet[];
  userCount: number;
}) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [visibleCount,setVisibleCount]=useState(6);
  const [activeFilterType, setActiveFilterType] = useState("Trending");
  const [user, setUser] = useState<User | null>(null);
  const otherLanguages = [
    {
      label: "TypeScript",
      extension: ".ts",
      value: "typescript",
      icon: <Code size={18} />,
    },
    {
      label: "HTML",
      extension: ".html",
      value: "html",
      icon: <Code2 size={18} />,
    },
    {
      label: "CSS",
      extension: ".css",
      value: "css",
      icon: <Layers size={18} />,
    },
    {
      label: "React JSX",
      extension: ".jsx",
      value: "jsx",
      icon: <FileCode size={18} />,
    },
    {
      label: "C#",
      extension: ".cs",
      value: "csharp",
      icon: <Code size={18} />,
    },
    { label: "C++", extension: ".cpp", value: "cpp", icon: <Code size={18} /> },
    {
      label: "Swift",
      extension: ".swift",
      value: "swift",
      icon: <Code size={18} />,
    },
    {
      label: "Kotlin",
      extension: ".kt",
      value: "kotlin",
      icon: <Code size={18} />,
    },
    { label: "Ruby", extension: ".rb", value: "ruby", icon: <Gem size={18} /> },
    {
      label: "Dart",
      extension: ".dart",
      value: "dart",
      icon: <Target size={18} />,
    },
    { label: "C", extension: ".c", value: "c", icon: <Code size={18} /> },
    {
      label: "JSON",
      extension: ".json",
      value: "json",
      icon: <FileJson size={18} />,
    },
    {
      label: "Markdown",
      extension: ".md",
      value: "markdown",
      icon: <FileText size={18} />,
    },
    {
      label: "YAML",
      extension: ".yaml",
      value: "yaml",
      icon: <Braces size={18} />,
    },
  ];

  const trendingSnippetsLanguageCounts = snippets.reduce(
    (acc: Record<string, number>, x) => {
      acc[x.language] = (acc[x.language] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const sortedTSnippetsLCounts = Object.entries(
    trendingSnippetsLanguageCounts,
  ).sort(([, a], [, b]) => b - a);
  const filtered = useMemo(() => {
    if (!snippets) return [];

    // 1. Önce Dile Göre Filtrele
    let result = snippets.filter((s) => {
      if (activeCategory === "SELECT A LANGUAGE" || !activeCategory) return true;
      return s.language?.toLowerCase() === activeCategory.toLowerCase();
    });

    // 2. Sonra Seçili Filtre Tipine Göre Sırala
    switch (activeFilterType) {
      case "Trending":
        // İzlenme sayısına (views) göre büyükten küçüğe
        result = result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "Latest":
        // Oluşturulma tarihine göre en yeni en üstte
        result = result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case "MostSaved":
        // Kaydedilme sayısına (saved_count) göre büyükten küçüğe
        result = result.sort(
          (a, b) => (b.saved_count || 0) - (a.saved_count || 0),
        );
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, activeFilterType, snippets]);
  const noResults = filtered.length === 0;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  useEffect(() => {
  setVisibleCount(6)
}, [filtered])
  return (
    <div className="flex-1 max-w-[1440px] mx-auto w-full flex px-6 py-8 gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-64 hidden xl:block shrink-0 sticky top-24 h-fit">
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex items-center gap-2 mb-4 px-3">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Categories
              </span>
            </div>
            <nav className="flex flex-col gap-1">
              <NavItem
                icon={<Code size={18} />}
                label="React TSX"
                onClick={() => setActiveCategory("tsx")}
                active={activeCategory === "tsx"}
              />
              <NavItem
                icon={<Terminal size={18} />}
                label="Python"
                onClick={() => setActiveCategory("Python")}
                active={activeCategory === "Python"}
              />
              <NavItem
                icon={<Cpu size={18} />}
                label="GO"
                onClick={() => setActiveCategory("GO")}
                active={activeCategory === "GO"}
              />
              <NavItem
                icon={<Code size={18} />}
                label="JavaScript"
                onClick={() => setActiveCategory("JavaScript")}
                active={activeCategory === "JavaScript"}
              />
              <NavItem
                icon={<Database size={18} />}
                label="SQL"
                onClick={() => setActiveCategory("SQL")}
                active={activeCategory === "SQL"}
              />
              <NavItem
                icon={<Settings size={18} />}
                label="Rust"
                onClick={() => setActiveCategory("Rust")}
                active={activeCategory === "Rust"}
              />
              {expanded && (
                <div className="flex flex-col gap-1 pl-2 border-l border-white/10">
                  {otherLanguages.map((lang) => (
                    <NavItem
                      key={lang.value}
                      icon={lang.icon}
                      label={lang.label}
                      onClick={() => setActiveCategory(lang.value)}
                      active={activeCategory === lang.value}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                />
                {expanded ? "Daha az göster" : "Daha fazla göster"}
              </button>
            </nav>
          </section>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 max-w-4xl min-w-0">
        {/* Quick Filters */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <FilterButton
            onClick={() => {
              setActiveFilterType("Trending");
            }}
            icon={<TrendingUp size={14} />}
            label="Trending"
            active={activeFilterType === "Trending"}
          />
          <FilterButton
            onClick={() => {
              setActiveFilterType("Latest");
            }}
            icon={<Clock size={14} />}
            label="Latest"
            active={activeFilterType === "Latest"}
          />
          <FilterButton
            onClick={() => {
              setActiveFilterType("MostSaved");
            }}
            icon={<Star size={14} />}
            label="Most Saved"
            active={activeFilterType === "MostSaved"}
          />
        </div>

        {/* Snippets List */}
        <div className="flex flex-col gap-6">
          {noResults && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/40">
              <Code size={32} />
              <p className="text-sm">No snippets found for this language.</p>
              <p className="mt-4">Add one now.</p>

              <div>
                <Link
                  href="/createSnippet"
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold transition-all neon-glow group"
                >
                  <Plus size={18} className="shrink-0" />
                  <span className="whitespace-nowrap">Create Snippet</span>
                </Link>
              </div>
            </div>
          )}
          {filtered.slice(0, visibleCount).map((snippet: Snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>

        {!noResults && visibleCount < filtered.length && (
          <div className="mt-8 flex justify-center">
            <button onClick={()=>{setVisibleCount(prev=>prev+6)}} className="flex items-center gap-2 px-8 py-3 bg-dark-800 border border-dark-700 rounded-xl text-sm font-bold hover:border-primary hover:text-primary transition-all text-slate-300">
              <span>Load More Snippets</span>
            </button>
          </div>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 hidden lg:block shrink-0 h-fit sticky top-24">
        <div className="flex flex-col gap-6">
          {/* Join Community Widget */}
          <div className="bg-primary p-6 rounded-2xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Join the Community</h3>
              <p className="text-white/80 text-sm mb-4">
                Share snippets and collaborate with 50k+ devs.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
                className="w-full bg-white text-primary py-2.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                Sign Up Now
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 text-white/10 group-hover:scale-110 transition-transform duration-500">
              <Users size={120} />
            </div>
          </div>

          {/* Trending Authors */}
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-4">
              Trending Authors
            </h3>
            <div className="flex flex-col gap-4">
              <AuthorRow
                name="dev_master"
                avatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              />
              <AuthorRow
                name="coding_ninja"
                avatar="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              />
              <AuthorRow
                name="frontend_gal"
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-dark-800/30 rounded-2xl p-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-4">
              Platform Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-dark-800 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Snippets</p>
                <p className="text-lg font-bold text-white">
                  {snippets.length}
                </p>
              </div>
              <div className="p-3 bg-dark-800 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Users</p>
                <p className="text-lg font-bold text-white">{userCount}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <AuthModal
        user={user}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      active
        ? "bg-primary/10 text-primary font-semibold"
        : "text-slate-400 hover:bg-dark-800 hover:text-slate-200"
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const FilterButton = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
      active
        ? "bg-white text-black"
        : "bg-dark-900 border border-dark-700 text-slate-300 hover:border-primary"
    }`}
  >
    {icon}
    {label}
  </button>
);

const AuthorRow = ({ name, avatar }: { name: string; avatar: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
      <span className="text-sm font-medium text-slate-300 hover:text-primary cursor-pointer transition-colors">
        {name}
      </span>
    </div>
    <button className="text-primary text-xs font-bold hover:underline">
      Follow
    </button>
  </div>
);
export default ExploreClient;
