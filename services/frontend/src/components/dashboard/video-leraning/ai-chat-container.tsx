import { useCallback, useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { ChatLoading } from "@/components/common/ai-chat/chat-loading";
import { ChatInput } from "@/components/common/ai-chat/chat-input";
import { ChatMessage } from "@/components/common/ai-chat/chat-message";
import { Message } from "@/interface/chatMsg.interface";
import {
  useGetAiChatHistoryQuery,
  useSendAiMessageMutation,
} from "@/store/api/aiTutorApi";

interface AIChatSidebarProps {
  id?: string;
  onReady?: (sendFn: (text: string) => void) => void;
}

export function AIChatSidebar({ id, onReady }: AIChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data: chatHistory,
    isLoading: historyLoading,
    isFetching,
  } = useGetAiChatHistoryQuery(id!, {
    skip: !id,
  });

  const [sendAiMessage, { isLoading: sendLoading }] =
    useSendAiMessageMutation();

  useEffect(() => {
    if (!chatHistory) return;

    const chats = chatHistory?.data?.messages || [];

    if (chats.length > 0) {
      const formatted: Message[] = chats.map((msg: any) => ({
        role: msg.role === "model" ? "ai" : "user",
        content: msg.content,
      }));

      setMessages(formatted);
    } else {
      setMessages([
        {
          role: "ai",
          content: "👋 Hi! I'm watching this lesson with you. Ask me anything...",
        },
      ]);
    }
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sendLoading, chatHistory]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim() || !id) return;

      const userMessage: Message = {
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      try {
        const response = await sendAiMessage({
          lessonId: id,
          message: text,
        }).unwrap();

        const chats = response?.data?.messages || [];
        const lastAiMessage = [...chats]
          .reverse()
          .find((msg: any) => msg.role === "model");

        const aiMessage: Message = {
          role: "ai",
          content: lastAiMessage?.content || "No response from AI",
        };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Send message error:", error);

        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "Something went wrong. Please try again.",
          },
        ]);
      }
    },
    [id, sendAiMessage]
  );

  useEffect(() => {
    if (onReady) onReady(handleSend);
  }, [onReady, handleSend]);

  const handleClear = () => {
    setMessages([
      {
        role: "ai",
        content: "👋 Hi! I'm watching this lesson with you. Ask me anything...",
      },
    ]);
  };

  return (
    <div className="w-full lg:w-[400px] h-[85vh] custom-surface rounded-xl flex flex-col shadow-xl">

      <div className="p-4 border-b border-cyan-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-gradient p-2 rounded-lg">
            <img src={logo} className="w-4 h-4" alt="logo" />
          </div>

          <div>
            <h3 className="text-sm font-bold">AI Tutor Assistant</h3>
            <span className="text-[10px] text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Online
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="text-red-600 hover:bg-red-600 hover:text-white"
        >
          <Trash2 size={18} />
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto custom-scrollbar"
      >
        {(historyLoading || isFetching) && <ChatLoading />}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}

        {sendLoading && <ChatLoading />}
      </div>

      <div className="p-4 border-t border-slate-800">
        <ChatInput onSend={handleSend} placeholder="Ask about this topic..." />
      </div>
    </div>
  );
}