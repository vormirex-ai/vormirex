import { useState } from "react";
import { Send } from "lucide-react";
import { ChatSuggestions } from "./chat-suggestions";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [hideSuggestions, setHideSuggestions] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
    setHideSuggestions(true);
  };

  const handleSuggestion = (text: string) => {
    onSend(text);
    setHideSuggestions(true);
  };

  return (
    <div className="mt-auto pt-4">
      {!hideSuggestions && (
        <ChatSuggestions onSuggestionClick={handleSuggestion} />
      )}

      <div className="relative group">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask your AI Tutor anything..."
          className="w-full custom-surface rounded-2xl p-5 pr-32 text-slate-200 focus:outline-none focus:border-cyan-500/30 transition-all shadow-2xl"
        />

        <Button
          onClick={handleSend}
          className="absolute right-3 top-3 bottom-3 rounded-lg"
        >
          <Send size={18} /> Send
        </Button>
      </div>
    </div>
  );
}