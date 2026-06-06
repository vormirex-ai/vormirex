interface ChatSuggestionsProps {
  onSuggestionClick?: (suggestion: string) => void;
}

const SUGGESTIONS = [
  "Explain Newton's 3 Laws",
  "What is integration by parts?",
  "Python list comprehension",
];

export function ChatSuggestions({
  onSuggestionClick,
}: ChatSuggestionsProps) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-bold text-textColor uppercase tracking-widest mb-3">
        Suggested Questions
      </p>

      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            onClick={() => onSuggestionClick?.(text)}
            className="px-4 py-2 rounded-lg bg-card border border-slate-800 text-xs text-textColor hover:border-cyan-500/40 transition-all active:scale-95"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}