interface PrioritySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PrioritySelector({
  value,
  onChange,
}: PrioritySelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
        Priority
      </label>

      <div className="grid grid-cols-3 gap-2 rounded-2xl custom-surface p-1">
        {["low", "medium", "high"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`h-10 rounded-xl text-sm transition-all capitalize ${
              value === item
                ? "bg-primary-gradient text-black"
                : "text-textColor"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}