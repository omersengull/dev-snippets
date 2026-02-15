import { CodeBlock } from "../../components/CodeBlock";
import { SnippetCard } from "../../components/SnippetCard";
import { Code, Cloud, Copy, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import Footer from "@/components/Footer";

export const LandingPage = async () => {
  const supabase = await createClient();
  const { data: snippets, error } = await supabase.from("snippets").select(`*,
    profiles(
    full_name,avatar_url)`).eq("visibility","Public").order("created_at",{ascending:false});
  if(error) {
    console.error(error.message);
    return <div>Something went wrong while loading the data...</div>
  }
  const heroCode = `export const useAuth = () => {
  const [user, setUser] = useState(null);

  // Initialize authentication logic
  useEffect(() => {
    const unsubscribe = auth.onStateChange(u => {
      setUser(u);
    });
    return unsubscribe;
  }, []);
}`;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1200px] w-full px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Text */}
          <div className="flex flex-col gap-8 lg:w-1/2">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-bold tracking-widest text-xs uppercase animate-pulse">
                Welcome to the future of code sharing
              </span>
              <h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                Share Your <span className="text-primary">Genius</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-[500px] leading-relaxed">
                The fastest way for developers to store, share, and discover
                beautiful code snippets in a modern, dark-themed environment.
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary-hover text-white text-base font-bold transition-all hover:scale-105 neon-glow">
                Explore Snippets
              </button>
              <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 border border-white/10 glass text-white text-base font-bold hover:bg-white/5 transition-all">
                Create Snippet
              </button>
            </div>
          </div>

          {/* Right Code Mockup */}
          <div className="lg:w-1/2 w-full perspective-1000">
            <div className="glass rounded-xl overflow-hidden neon-glow border border-primary/20 transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-500 shadow-2xl">
              <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-500/80"></div>
                  <div className="size-3 rounded-full bg-yellow-500/80"></div>
                  <div className="size-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                  AuthService.ts
                </div>
                <div className="w-10"></div>
              </div>
              <div className="p-6 bg-dark-950/80">
                <CodeBlock
                  code={heroCode}
                  language="TypeScript"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-primary/5 border-y border-white/5 py-16 flex justify-center">
        <div className="max-w-[1200px] w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem
              icon={<Code size={24} />}
              title="Syntax Highlighting"
              desc="Support for 100+ languages with vibrant themes that make code pop."
            />
            <FeatureItem
              icon={<Cloud size={24} />}
              title="Cloud Sync"
              desc="Your snippets available on every device, instantly with secure cloud storage."
            />
            <FeatureItem
              icon={<Copy size={24} />}
              title="Instant Copy"
              desc="One-click copy to clipboard with beautiful visual feedback built-in."
            />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-[1200px] w-full px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Trending Now
            </h2>
            <p className="text-slate-400 mt-2">
              Discover what the community is building today.
            </p>
          </div>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline group">
            View All{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

const FeatureItem = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex flex-col gap-4 p-6 glass rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
    <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-slate-400">{desc}</p>
  </div>
);


