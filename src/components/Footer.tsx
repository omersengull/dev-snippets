import { Code } from 'lucide-react';


const FooterColumn = ({ title, links }: { title: string; links: string[] }) => (
  <div className="flex flex-col gap-3">
    <h4 className="text-sm font-bold text-white">{title}</h4>
    {links.map((link) => (
      <a
        key={link}
        href="#"
        className="text-slate-500 text-sm hover:text-primary transition-colors"
      >
        {link}
      </a>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 mt-auto py-12 flex justify-center glass">
        <div className="max-w-[1200px] w-full px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-white">
              <div className="size-6 bg-primary rounded flex items-center justify-center">
                <Code size={14} className="text-white" />
              </div>
              <h2 className="text-white text-lg font-bold">DevSnippets</h2>
            </div>
            <p className="text-slate-500 text-sm">
              Built for developers, by developers.
            </p>
          </div>
          <div className="flex gap-12">
            <FooterColumn
              title="Product"
              links={["Features", "Pricing", "Extension"]}
            />
            <FooterColumn
              title="Resources"
              links={["API Docs", "Community", "Support"]}
            />
          </div>
        </div>
      </footer>
  )
}

export default Footer