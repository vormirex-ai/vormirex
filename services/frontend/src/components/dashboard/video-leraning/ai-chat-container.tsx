import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { ChatLoading } from "@/components/common/ai-chat/chat-loading";
import { ChatInput } from "@/components/common/ai-chat/chat-input";
import { ChatMessage } from "@/components/common/ai-chat/chat-message";
import { Message } from "@/interface/chatMsg.interface";

import { useGetAiChatHistoryQuery, useSendAiMessageMutation } from "@/store/api/aiTutorApi";

export function AIChatSidebar({ id }: { id?: string }) {
  const { data: chatHistory, isLoading: fetchingChats } = useGetAiChatHistoryQuery(id, { skip: !id });
  const [sendMessage, { isLoading: sendingMessage }] = useSendAiMessageMutation();

  const loading = fetchingChats || sendingMessage;

  const chats = chatHistory?.data?.messages || [];
  const messages: Message[] = chats.length > 0
    ? chats.map((msg: any) => ({
        role: msg.role === "model" ? "ai" : "user",
        content: msg.content,
      }))
    : [
        {
          role: "ai",
          content: "👋 Hi! I'm watching this lesson with you. Ask me anything...",
        },
      ];

  const handleSend = async (text: string) => {
    if (!text.trim() || !id) return;

    try {
      await sendMessage({
        lessonId: id,
        message: text,
      }).unwrap();
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  const handleClear = () => {
    // Clear chat is mock/local in UI or can be extended if backend supports clearing chats.
    // For now we do nothing or could extend.
  };


  return (
    <div className="w-full lg:w-[400px] h-[85vh] custom-surface rounded-xl flex flex-col shadow-xl">

      <div className="p-4 border-b border-cyan-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-gradient p-2 rounded-lg">
            <img src={logo} className="w-4 h-4" />
          </div>

          <div>
            <h3 className="text-sm font-bold">
              AI Tutor Assistant
            </h3>
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
        >
          <Trash2 size={18} />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            role={msg.role}
            content={msg.content}
          />
        ))}

        {loading && <ChatLoading />}
      </div>

      <div className="p-4 border-t border-slate-800">
        <ChatInput
          onSend={handleSend}
          placeholder="Ask about this topic..."
        />
      </div>
    </div>
  );
}