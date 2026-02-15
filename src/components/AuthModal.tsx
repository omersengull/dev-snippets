import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Github, Lock, LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  user: User | null;
}
const LoginModal = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  user,
}: LoginModalProps) => {
  if (!isLoginModalOpen) return null;
  const router = useRouter();
  const supabase = createClient();
  const handleLogin = async (provider: "google" | "github") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        toast.error("Giriş yapılırken bir hata oluştu: " + error.message);
      }
     
    } catch (error: any) {
      toast.error(error.message);
    } 
  };
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Çıkış yapılırken bir hata oluştu: " + error.message);
    } else {

      setIsLoginModalOpen(false);
      router.refresh();
    }
  };
  return (
    <>
      {user ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Arka planı karartma ve flulaştırma */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/20"
            onClick={() => setIsLoginModalOpen(false)}
          />

          {/* Modal İçeriği */}
          <div className="relative w-full max-w-md bg-dark-950 border border-dark-700 rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            {/* Kapatma Butonu */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              {/* İkon Bölümü - Çıkış için Kırmızı/Turuncu Tonlar */}
              <div className="size-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <LogOut className="text-red-500" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-white italic">Sign Out</h2>
              <p className="text-slate-400 text-sm mt-2">
                Are you sure you want to log out of your account? Any unsaved
                changes might be lost.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Çıkış Yap Butonu */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsLoginModalOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-red-900/20"
              >
                <LogOut size={20} />
                Sign Out Now
              </button>

              {/* Vazgeç Butonu */}
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="w-full bg-dark-800 hover:bg-dark-700 text-white font-semibold py-3 rounded-xl border border-dark-600 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center mt-6 uppercase tracking-widest">
              Your session is protected
            </p>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Arka planı karartma ve flulaştırma */}
          <div
            className="absolute inset-0  backdrop-blur-sm"
            onClick={() => setIsLoginModalOpen(false)}
          />

          {/* Modal İçeriği */}
          <div className="relative w-full max-w-md bg-dark-950 border border-dark-700 rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="size-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/30">
                <Lock className="text-primary" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white italic">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Sign in to save and share your snippets.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Google ile Giriş (Örnek) */}
              <button
                onClick={() => {
                  handleLogin("google");
                }}
                className="w-full bg-white hover:bg-slate-100 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                <img
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  className="size-5"
                  alt="Google"
                />
                Continue with Google
              </button>

              {/* GitHub ile Giriş (Örnek) */}
              <button
                onClick={() => {
                  handleLogin("github");
                }}
                className="w-full bg-dark-800 hover:bg-dark-700 text-white font-semibold py-3 rounded-xl border border-dark-600 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                <Github size={20} />
                Continue with GitHub
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center mt-6 uppercase tracking-widest">
              Secure Authentication by Supabase Auth
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
