import { Button } from "@/components/ui/button";

const actions = [
  { label: "Explain Simply", icon: "🧠" },
  { label: "Give Example", icon: "💡" },
  { label: "Exam Answer", icon: "📝" },
  { label: "Summarize", icon: "📋" },
];

export function ActionButtons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4  ">
      {actions.map((item) => (
        <Button
          key={item.label}
          variant="outline"
          className="bg-card border-slate-700 transition-all py-6"
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </Button>
      ))}
    </div>
  );
}