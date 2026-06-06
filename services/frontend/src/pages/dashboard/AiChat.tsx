import { useState } from "react";
import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { ChatHeader } from "@/components/dashboard/ai-chat/chat-header";
import { ChatSuggestions } from "@/components/dashboard/ai-chat/chat-suggestions";
import { ChatMessage } from "@/components/common/ai-chat/chat-message";
import { ChatLoading } from "@/components/common/ai-chat/chat-loading";
import { ChatInput } from "@/components/common/ai-chat/chat-input";
import { Message } from "@/interface/chatMsg.interface";
import { useLocation } from "react-router-dom";

export default function AIChatPage() {
  const location = useLocation();

  const isPublicChat = location.pathname === "/ai-chat";
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Hello! I'm your AI Tutor. 🎓\nI can help you with coding, science, math and more.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: `You asked: "${text}"\n\nThis is an AI generated response.`,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
    >
      <div
        className={`
    h-[calc(100dvh-50px)]
    flex flex-col max-w-5xl mx-auto  overflow-hidden
    ${isPublicChat
            ? "rounded-2xl border border-white/10 bg-[#16363b]/40 backdrop-blur-xl shadow-2xl mt-24 p-6"
            : "bg-transparent border-0 shadow-none p-1 lg:p-10"
          }
  `}
      >
        <motion.div variants={fadeUpItem}>
          <div className="shrink-0">
            <ChatHeader />
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto py-6 pr-2 custom-scrollbar ">
          <motion.div variants={fadeUpItem}>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={
                  <div className="space-y-2 whitespace-pre-line">
                    {message.content}
                  </div>
                }
              />
            ))}

            {loading && <ChatLoading />}
          </motion.div>
        </div>

        <motion.div variants={fadeUpItem}>
          <div className="shrink-0 pt-4">
            <ChatInput
              onSend={handleSendMessage}
              placeholder="Ask your AI Tutor anything..."
              showSuggestions={messages.length <= 1}
            >
              <ChatSuggestions onSuggestionClick={handleSendMessage} />
            </ChatInput>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
