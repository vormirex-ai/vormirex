import {
  Search,
  Clock3,
  Bookmark,
  Trash2,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChatHistoryHeader } from "@/components/dashboard/ai-chat/chat-history/chat-history-header";

const conversations = [
  {
    title: "Newton's Laws Explained",
    category: "Science",
    tags: ["Physics", "Mechanics"],
    description:
      "Let's break down the three laws of motion with everyday examples and practice problems.",
    time: "Today • 2:14 PM",
    pinned: true,
  },
  {
    title: "Python Loops & Functions",
    category: "Coding",
    tags: ["Python", "Basics"],
    description:
      "We covered loops, list comprehensions, and reusable functions with examples.",
    time: "Today • 11:02 AM",
  },
  {
    title: "World War II Timeline",
    category: "History",
    tags: ["20th Century", "Europe"],
    description:
      "Structured timeline from the invasion of Poland in 1939 to V-J Day in 1945.",
    time: "Yesterday • 8:40 PM",
  },
  {
    title: "Algebra Problem Solving",
    category: "Mathematics",
    tags: ["Algebra", "Quadratics"],
    description:
      "Step-by-step walkthrough of quadratic equations and factorization shortcuts.",
    time: "Yesterday • 4:25 PM",
    pinned: true,
  },
  {
    title: "Photosynthesis Process",
    category: "Science",
    tags: ["Biology", "Cells"],
    description:
      "Light reactions, Calvin cycle, and common misconceptions explained simply.",
    time: "2 days ago",
  },
  {
    title: "JavaScript Interview Questions",
    category: "Coding",
    tags: ["JavaScript", "Interview"],
    description:
      "Closures, hoisting, event loop, and commonly asked frontend interview questions.",
    time: "3 days ago",
  },
];

const filters = [
  "All Chats",
  "Mathematics",
  "Science",
  "Coding",
  "History",
  "Recent",
  "Favorites",
];

export default function ConversationHistory() {
  return (
    <div className="min-h-screen  p-6">
      <ChatHistoryHeader />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div>

          <Card className="mb-4">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textColor w-4 h-4" />

                  <Input
                    placeholder="Search conversations..."
                    className="pl-10 custom-surface h-11 rounded-full py-6"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                  >
                    Advanced
                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-full"
                  >
                    Latest First
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {filters.map((item, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={index === 0 ? "default" : "secondary"}
                    className={`rounded-full text-xs ${index === 0
                      ? "bg-primary-gradient hover:bg-primary text-black"
                      : ""
                      }`}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>


          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
            {conversations.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden"
              >
                <CardContent className="p-4 sm:p-5">
                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500">
                        {item.category}
                      </p>

                      <h3 className="font-semibold text-base sm:text-lg mt-1 break-words">
                        {item.title}
                      </h3>
                    </div>

                    {item.pinned && (
                      <Badge className="shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-slateText dark:text-primary">
                        Pinned
                      </Badge>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-slate-400 leading-6">
                    {item.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {item.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="
                rounded-full border
                border-primary-500
                bg-slate-100 dark:bg-[#0b1730]
                text-slate-700 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-800
                text-[10px] sm:text-xs
              "
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 flex flex-col gap-4 border-t border-primary pt-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* TIME */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                      <Clock3 className="h-4 w-4 shrink-0" />
                      <span>{item.time}</span>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-slate-400 hover:text-white"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <Button className="rounded-full text-xs sm:text-sm">
                        Continue
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        <div className="space-y-5">

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-400 uppercase tracking-widest">
                This Week
              </p>

              <h2 className="text-5xl font-bold mt-3">9.2</h2>

              <p className="text-slate-400 mt-1">Total AI tutoring time</p>
              <div className="flex items-end justify-between w-full h-48 md:h-56 mt-8 px-2">
                {[30, 55, 40, 70, 48, 90, 60].map((h, i) => (
                  <div
                    key={i}

                    className="w-6 sm:w-10 md:w-12 bg-primary-gradient rounded-t-full transition-all duration-300 ml-2"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-7 text-center text-xs text-slate-500 mt-4 px-2">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </CardContent>
          </Card>

          <Card >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold">Recent Activity</h3>

                <Button
                  variant="link"
                  className="text-primary p-0 h-auto"
                >
                  View all
                </Button>
              </div>

              <div className="space-y-5">
                {[
                  {
                    label: "Today",
                    value: "4 AI sessions completed",
                    hrs: "1.8 hrs",
                  },
                  {
                    label: "Yesterday",
                    value: "6 AI sessions completed",
                    hrs: "2.5 hrs",
                  },
                  {
                    label: "Last Week",
                    value: "18 AI sessions completed",
                    hrs: "9.2 hrs",
                  },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between"
                  >
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-primary-gradient rounded-full mt-2" />

                      <div>
                        <p className="font-medium">{activity.label}</p>

                        <p className="text-sm text-slate-400">
                          {activity.value}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm text-slate-500">
                      {activity.hrs}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-6">Top Subjects</h3>

              <div className="space-y-5">
                {[
                  { label: "Science", value: "42%" },
                  { label: "Coding", value: "31%" },
                  { label: "Mathematics", value: "18%" },
                  { label: "History", value: "9%" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.label}</span>
                      <span className="text-slate-400">{item.value}</span>
                    </div>

                    <div className="w-full h-2 dark:bg-slate-800 bg-slate-500 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-gradient rounded-full"
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}