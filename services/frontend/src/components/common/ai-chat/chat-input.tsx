import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInputProps } from "@/interface/chatMsg.interface";

export function ChatInput({
  onSend,
  placeholder = "Ask something...",
  showSuggestions = false,
  children,
  inputClassName = "",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="space-y-4">
      {showSuggestions && children}
      <div className="relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder={placeholder}
          className={`w-full bg-[#27545A] border border-cyan-500/10 rounded-2xl p-4 pr-28 text-white placeholder:text-slate-300 focus:outline-none focus:border-cyan-500/30 ${inputClassName}`}
        />

        <Button
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
        >
          <Send size={16} />  &nbsp; Send
        </Button>
      </div>
    </div>
  );
}