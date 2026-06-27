import React from "react";
import { FileText, Sparkles, Upload, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { NoteItem } from "@/interface/notes.interface";
import { useNavigate } from "react-router";
import { BookmarkButton } from "./book-marks";

interface NoteCardProps {
  note: NoteItem;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const navigate = useNavigate();

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

      default:
        return {
          bg: "bg-gray-500/10 text-gray-400",
          icon: <FileText className="w-3 h-3" />,
        };
    }
  };

  const badge = getBadgeStyle(note.type);

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer h-full"
      onClick={() => navigate(`/productivity/notes/notes-details/${note.id}`)}
    >
      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[#63E7DC] via-[#46D3C9] to-[#26BDB3] transition-all duration-300 ease-out group-hover:w-full" />

      <CardContent className="flex h-full flex-col p-5 pb-4">
        <div className="mb-5 flex items-center justify-between">
          <span
            className={` inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${badge.bg}`}>
            {badge.icon}
            {note.type}
          </span>

          <BookmarkButton id={note.id} isBookmarked={note.isBookmarked} />
        </div>

        <h3 className="text-lg font-semibold tracking-tight transition-colors dark:group-hover:text-primary group-hover:text-cyan-600">
          {note.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {note.description}
        </p>

        <div className="mt-3">
          <span className="inline-flex line-clamp-1 items-center rounded-full dark:bg-primary/10 bg-primary/30 px-2 py-1 text-xs dark:text-primary text-primary-500">
            {note.subjectName}
          </span>
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <p>Uploaded:</p>
            <p>{note.timeAgo}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (note.fileUrl) {
                window.open(note.fileUrl, "_blank", "noopener,noreferrer");
              }
            }}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            View PDF
            <ExternalLink
              className=" w-3.5 h-3.5 opacity-0 -translate-x-[2px] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
