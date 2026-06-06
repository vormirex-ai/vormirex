import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  value: string;
  label: string;
}

export function StatsCard({ icon, value, label }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1225] p-5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
        {icon}
      </div>

      <h2 className="text-3xl font-bold text-white">{value}</h2>

      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}