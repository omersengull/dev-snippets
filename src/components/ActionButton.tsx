export default function ActionButton({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-border/50 rounded-lg font-bold text-sm transition-all border border-border text-text-muted hover:text-white cursor-pointer">
      {icon}
      <span>{label}</span>
      <span className="bg-border px-1.5 py-0.5 rounded text-[10px] text-text-main">
        {count}
      </span>
    </button>
  );
}