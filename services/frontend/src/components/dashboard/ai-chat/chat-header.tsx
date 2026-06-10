import { MessageCircle, Trash2, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function ChatHeader() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full pb-4 border-b border-cyan-500/10">

      <div className="flex flex-col min-w-0">

        <div className="flex items-center gap-2">
          <MessageCircle
            className="text-slate-200 shrink-0"
            size={22}
          />

          <h1 className="text-2xl md:text-4xl  font-bold truncate">
            AI Chat
          </h1>

        </div>

        <p className="text-sm md:text-base text-slate-500 mt-1 leading-relaxed">
          Your personal AI tutor — ask anything, anytime
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">

        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none"
        >
          <Trash2 size={16} className="mr-2" />
          Clear
        </Button>

        <Button
          onClick={() => navigate("/dashboard/chat-history")}
          variant="secondary"
          size="sm"
          className="flex-1 sm:flex-none rounded-lg hover:bg-primary-gradient hover:text-slateText"
        >
          <History size={16} className="mr-2" />
          History
        </Button>
      </div>
    </div>
  );
}