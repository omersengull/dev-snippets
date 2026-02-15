
export default function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div className="text-text-muted mb-1 flex items-center gap-1.5">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-2xl font-bold text-text-main">{value}</span>
    </div>
  );
}