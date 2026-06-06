import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Share2 } from "lucide-react";

export function LessonHeader() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
      <div className="min-w-0">
        <div className="flex items-start sm:items-center gap-3 mb-2">

          <div className="w-6 h-6 shrink-0 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-xs font-bold">L</span>
          </div>

          <h1 className="text-2xl md:text-4xl  font-bold leading-snug break-words">
            Calculus: Integration Techniques
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-textColor">
          <span>Chapter 5 • Lesson 3</span>
          <span>• 45 min</span>
          <Badge
            variant="secondary"
            className="bg-primary-gradient text-black  border-none rounded-md"
          >
            In Progress
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 w-full sm:w-auto">

        <Button
          variant="secondary"
          className="flex-1 sm:flex-none "
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Save
        </Button>

        <Button
          variant="secondary"
          className="flex-1 sm:flex-none "
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}