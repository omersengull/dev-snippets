import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";

// Font Tanımlamaları
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans", 
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono", 
});

export const metadata: Metadata = {
  title: "DevSnippets - Share Your Genius",
  description: "The fastest way for developers to store and share code snippets.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
    const { data: snippets, error } = await supabase.from("snippets").select("id,title,description,code,language,views,saved_count").eq("visibility","Public").order("views",{ascending:false});
    if(error) {
    console.error(error.message);
    return <div>Something went wrong while loading the data...</div>
  }
  
  return (
  
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans">
         <Navbar snippets={snippets}/>
           <Toaster position="top-right" 
          toastOptions={{
            style: {
              background: '#18181b', 
              color: '#fff',
              border: '1px solid #27272a',
            },
          }}/>
        {children}
      </body>
    </html>
  );
}