import React from "react";
import {
  Bookmark,
  FileText,
  Sparkles,
  Upload,
  ExternalLink,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export interface NoteItem {
  id: string;
  type: "AI Answer" | "My Note" | "Lesson Note" | "Uploaded";
  title: string;
  description: string;
  category: string;
  timeAgo: string;
  isBookmarked: boolean;
}

interface NoteCardProps {
  note: NoteItem;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
}) => {

  const getBadgeStyle = (type: NoteItem["type"]) => {
    switch (type) {
      case "AI Answer":
        return {
          bg: "bg-blue-500/10 text-blue-400",
          icon: <Sparkles className="w-3 h-3" />,
        };

      case "My Note":
        return {
          bg: "bg-purple-500/10 text-purple-400",
          icon: <FileText className="w-3 h-3" />,
        };

      case "Lesson Note":
        return {
          bg: "bg-emerald-500/10 text-emerald-400",
          icon: <FileText className="w-3 h-3" />,
        };

      case "Uploaded":
        return {
          bg: "bg-orange-500/10 text-orange-400",
          icon: <Upload className="w-3 h-3" />,
        };
    }
  };

  const badge = getBadgeStyle(note.type);

  return (
    <Card className="group relative overflow-hidden cursor-pointer">
      <div
        className=" absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[#63E7DC] via-[#46D3C9] to-[#26BDB3] transition-all duration-300 ease-out group-hover:w-full "
      />

      <CardContent className="p-5 pb-1">

        <div className="flex items-center justify-between mb-5">

          <span
            className={`
              inline-flex items-center gap-1.5
              rounded-full px-3 py-1
              text-xs font-medium
              ${badge.bg}
            `}
          >
            {badge.icon}
            {note.type}
          </span>

          <button
            className={`
              flex items-center justify-center
              h-8 w-8 rounded-lg transition-colors
              ${note.isBookmarked
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted"
              }
            `}
          >
            <Bookmark
              className={`w-4 h-4 ${note.isBookmarked ? "fill-current" : ""
                }`}
            />
          </button>
        </div>

        <h3
          className="
            text-lg font-semibold tracking-tight
            transition-colors
            dark:group-hover:text-primary group-hover:text-cyan-600
          "
        >
          {note.title}
        </h3>

        <p
          className="
            mt-3 text-sm leading-relaxed
            text-muted-foreground
            line-clamp-3
          "
        >
          {note.description}
        </p>

        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground mt-5">
            <span className="capitalize">
              {note.category}
            </span>{" "}
            • {note.timeAgo}
          </span>

          <button
            className="
            inline-flex items-center gap-1 mt-3
            text-sm font-medium
            text-muted-foreground
            transition-colors
            hover:text-primary
          "
          >
            {note.type === "Uploaded" ? "View" : "Open"}

            <ExternalLink
              className="
              w-3.5 h-3.5
              opacity-0
              translate-x-[-2px]
              transition-all duration-200
              group-hover:opacity-100
              group-hover:translate-x-0 mt-2
            "
            />
          </button>
        </div>
      </CardContent>


    </Card>
  );
};