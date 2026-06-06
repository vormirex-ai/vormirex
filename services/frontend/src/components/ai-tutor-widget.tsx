import React, { useState } from "react";
import { X, Send, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AITutorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi! 👋 Ask me anything about your studies.",
    },
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);


    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: "ai",
        text: "I'm here to help! 🚀",
      };

      setMessages((prev) => [...prev, aiReply]);
    }, 800);

    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-[320px] md:w-[400px] md:h-[580px] h-[450px] overflow-hidden border border-border bg-background/95 backdrop-blur-xl shadow-2xl rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-300 md:py-4 py-2">

          <CardHeader className="border-b border-border px-4 py-3 flex flex-row items-center justify-between space-y-0 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary-gradient dark:bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
                  <img
                    src={logo}
                    alt="AI"
                    className="w-4 h-4 object-contain"
                  />
                </div>

                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  AI Tutor
                </h3>

                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="text-emerald-500 font-medium">
                    Online
                  </span>
                  • Ready to help
                </p>
              </div>
            </div>


            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="rounded-xl"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 flex-1 h-[calc(100%-140px)]">
            <ScrollArea className="h-full px-4 md:py-4 py-2">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                      }`}
                  >

                    {msg.sender === "ai" && (
                      <>
                        <div className="w-9 h-9 shrink-0 rounded-full bg-primary-gradient dark:bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
                          <img
                            src={logo}
                            alt="AI"
                            className="w-4 h-4 object-contain"
                          />
                        </div>

                        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-primary/10 border border-primary/10 px-4 py-3  text-xs md:text-sm text-foreground shadow-sm">
                          {msg.text}
                        </div>
                      </>
                    )}

                    {msg.sender === "user" && (
                      <>
                        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-3  text-xs md:text-sm shadow-md">
                          {msg.text}
                        </div>

                        <div className="w-9 h-9 shrink-0 rounded-full bg-muted border border-border flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <div className="border-t border-border p-2 md:p-4 bg-background/80 backdrop-blur-xl">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <Input
                type="text"
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-11 rounded-xl border-border bg-background"
              />

              <Button
                type="submit"
                size="icon"
                disabled={!message.trim()}
                className="h-11 w-11 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}

      <div className="flex justify-end">
        <Button
          onClick={toggleChat}
          className={`relative
      w-12 h-12 sm:w-14 sm:h-14
      rounded-full md:px-5 px-3
      bg-primary shadow-2xl overflow-visible
      transition-all duration-300
      ${isOpen ? "scale-95" : "hover:scale-110"}
    `}
        >
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
              <span className="absolute -inset-2 rounded-full border-2 border-cyan-400/40 animate-[ping_1.8s_linear_infinite]" />
              <span className="absolute -inset-4 rounded-full border border-cyan-400/20 animate-[ping_2.5s_linear_infinite]" />
            </>
          )}

          <img
            src={logo}
            alt="AI"
            className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />

          {!isOpen && (
            <span className="absolute top-0 right-0 z-20 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-300 border-2 border-background animate-pulse" />
          )}
        </Button>
      </div>
    </div>
  );
}
