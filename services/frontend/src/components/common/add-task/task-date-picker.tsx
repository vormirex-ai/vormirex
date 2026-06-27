import { Input } from "@/components/ui/input";

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePicker({
  label,
  name,
  value,
  onChange,
}: DatePickerProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
        {label}
      </label>

      <Input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        onClick={(e) => {
          (e.currentTarget as HTMLInputElement).showPicker?.();
        }}
        min={new Date().toISOString().split("T")[0]}
        className="
          h-12 w-full custom-surface
          cursor-pointer
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          [&::-webkit-calendar-picker-indicator]:opacity-100
          [&::-webkit-calendar-picker-indicator]:invert
        "
      />
    </div>
  );
}