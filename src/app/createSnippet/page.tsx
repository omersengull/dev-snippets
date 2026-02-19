"use client";
import { useEffect, useRef, useState } from "react";
import {
  Copy,
  Trash2,
  Globe,
  Lock,
  X,
  Send,
  Keyboard,
  ChevronDown,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "@/constants/languages";
import { Snippet } from "@/types/snippet";
type SnippetCreateInput = Omit<
  Snippet,
  "id" | "user_id" | "created_at" | "profiles" | "saved" | "views" | "comments"
>;
type visibilityTypes = "Public" | "Private";
const CreateSnippetPage = () => {
  const [loading, setLoading] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [currentRow, setCurrentRow] = useState(1);
  const [columnCount, setColumnCount] = useState(0);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("UntitledProject");
  const [visibility, setVisibility] = useState<visibilityTypes>("Public");
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    SUPPORTED_LANGUAGES[0],
  );
  const router = useRouter();
  const spanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState("auto");

  useEffect(() => {
    if (spanRef.current) {
      const scrollWidth = spanRef.current.offsetWidth;
      const constrainedWidth = Math.min(Math.max(scrollWidth + 20, 261), 500);
      setWidth(`${constrainedWidth}px`);
    }
  }, [title]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a snippet title!");
      return;
    }
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload: SnippetCreateInput = {
      title: title.trim(),
      file_name: title.trim() + selectedLanguage.extension,
      language: formData.get("language") as string,
      code: formData.get("code") as string,
      description: formData.get("description") as string,
      visibility: visibility,
      lines: code.split("\n").length,
    };

    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("An error occurred" + res.status + ":" + errorText);
        if (res.status === 401 || errorText.includes("Unauthorized")) {
          toast.error("You must to login to add code snippet!");
        } else {
          toast.error("An error occurred : " + errorText);
        }
        return;
      }

      toast.success("Snippet successfully added!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    const lines = e.target.value.split("\n").length;
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = e.target.value.substring(0, cursorPosition);
    const lastLineBeforeCursor = textBeforeCursor.split("\n").at(-1);
    setColumnCount(lastLineBeforeCursor?.length || 0);
    setLineCount(lines);
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langObj = SUPPORTED_LANGUAGES.find(
      (lang) => lang.value === e.target.value,
    );
    if (langObj) {
      setSelectedLanguage(langObj);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Mevcut değeri güncelle (2 boşluk ekle)
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      setCode(newValue);

      // İmleç konumunu ayarla (bir sonraki render'dan sonra)
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#0a0a0a]">
      <form className="flex w-full h-full" onSubmit={handleSubmit}>
        {/* Main Editor Section */}
        <section className="flex-1 flex flex-col min-w-0">
          {/* Editor Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-dark-700 bg-dark-950">
            <div className="flex flex-col gap-1 flex-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <button className="hover:text-primary transition-colors">
                  Dashboard
                </button>
                <span>/</span>
                <span className="text-white">Create New Snippet</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Genişliği ölçen span */}
                <span
                  ref={spanRef}
                  className="absolute opacity-0 pointer-events-none whitespace-pre text-2xl font-bold"
                  aria-hidden="true"
                >
                  {title || "UntitledProject"}
                </span>

                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  style={{ width: width }}
                  required
                  spellCheck={false}
                  placeholder="UntitledProject"
                  className="bg-transparent border-none p-0 text-2xl font-bold focus:ring-0 placeholder:text-gray-700 text-white outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-dark-800 rounded-lg p-1 border border-dark-700">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="p-1.5 flex flex-row items-center hover:bg-dark-700 rounded transition-colors text-slate-400 hover:text-white"
                  title="Copy"
                >
                  {copied ? <span className="mr-1 text-sm">Copied!</span> : ""}
                  {copied ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                  
                  
                </button>

                <button
                  type="button"
                  onClick={()=>setCode('')}
                  className="p-1.5 hover:bg-red-900/20 rounded transition-colors text-slate-400 hover:text-red-500"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="relative">
                <select
                  value={selectedLanguage.value}
                  required
                  name="language"
                  onChange={handleLanguageChange}
                  className="appearance-none bg-dark-900 border border-dark-700 text-white pl-3 pr-8 py-2 rounded-lg text-sm font-medium focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="" hidden>
                    SELECT A LANGUAGE
                  </option>
                  {SUPPORTED_LANGUAGES.slice(1).map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Code Input Area */}
          <div className="flex-1 overflow-auto font-mono text-sm relative">
            <div className="flex min-h-full">
              {/* Line Numbers */}
              <div className="w-12 bg-dark-950 border-r border-dark-700 py-4 flex flex-col items-center gap-0 text-[13px] leading-6 text-slate-600 select-none">
                {Array.from({ length: Math.max(20, lineCount) }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              {/* Textarea */}
              <div className="flex-1 bg-[#0a0a0a] relative">
                <textarea
                  name="code"
                  required
                  className="pb-20 w-full h-full bg-transparent border-none focus:ring-0 resize-none p-4 text-slate-200 leading-6 whitespace-pre font-mono outline-none"
                  spellCheck={false}
                  value={code}
                  onKeyDown={handleKeyDown}
                  onChange={handleCode}
                  onSelect={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    const textBeforeCursor = target.value.substring(
                      0,
                      target.selectionStart,
                    );
                    const lastLineBeforeCursor = textBeforeCursor
                      .split("\n")
                      .at(-1);
                    setColumnCount(lastLineBeforeCursor?.length || 0);
                  }}
                />
              </div>
            </div>

            {/* Editor Footer Status */}
            <div className="absolute bottom-4 right-6 bg-dark-800/80 backdrop-blur px-3 py-1 rounded-full border border-dark-700 text-[12px] text-slate-400 flex gap-3">
              <span>UTF-8</span>
              <span>Spaces: 2</span>
              <span>
                Ln {lineCount}, Col {columnCount + 1}
              </span>
            </div>
          </div>
        </section>

        {/* Right Settings Sidebar */}
        <aside className="w-80 border-l border-dark-700 bg-dark-950 flex flex-col shrink-0">
          <div className="p-6 border-b border-dark-700">
            <h3 className="text-white text-sm font-semibold mb-1 uppercase tracking-wider">
              Snippet Settings
            </h3>
            <p className="text-slate-500 text-xs">
              Configure how others see your code.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                className="w-full pb-20 bg-dark-900 border border-dark-700 rounded-lg text-sm text-white p-3 focus:outline-none focus:border-primary min-h-[200px] placeholder:text-slate-600 resize-none"
                placeholder="Explain what this snippet does (optional)"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm font-medium">
                Visibility
              </label>
              <div className="grid grid-cols-2 gap-2 bg-dark-900 p-1 rounded-lg border border-dark-700 relative">
                {["Public", "Private"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setVisibility(type as visibilityTypes)}
                    className={`relative flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-colors duration-300 z-10 ${
                      visibility === type
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {type === "Public" ? (
                      <Globe size={14} />
                    ) : (
                      <Lock size={14} />
                    )}
                    {type}

                    {visibility === type && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-md -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-dark-700">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Status</span>
                <span className="flex items-center gap-1 text-emerald-500 font-medium">
                  <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Draft Saved
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Last updated</span>
                <span>2 minutes ago</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#0c121d] flex flex-col gap-3 border-t border-dark-700">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              <Send size={18} />
              {loading ? "Publishing..." : "Publish Snippet"}
            </button>
          </div>
        </aside>

        {/* Visual Toast */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 bg-dark-800 border border-dark-700 rounded-full shadow-2xl z-50 animate-bounce-in">
          <div className="flex items-center gap-2 px-2 text-xs text-white">
            <Keyboard size={16} className="text-primary" />
            <span className="font-medium">Editor active</span>
          </div>
          <div className="h-4 w-[1px] bg-dark-700"></div>
          <span className="text-xs text-slate-400">
            Markdown shortcuts enabled
          </span>
        </div>
      </form>
    </div>
  );
};

const Tag = ({ label, neutral }: { label: string; neutral?: boolean }) => (
  <span
    className={`px-2 py-1 text-[11px] font-bold rounded flex items-center gap-1 border ${
      neutral
        ? "bg-dark-800 text-slate-400 border-dark-700"
        : "bg-primary/20 text-primary border-primary/30"
    }`}
  >
    #{label}
    <button className="hover:text-white">
      <X size={10} />
    </button>
  </span>
);
export default CreateSnippetPage;
