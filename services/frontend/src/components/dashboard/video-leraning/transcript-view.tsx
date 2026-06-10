import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptItem {
  time: string;
  text: string;
}

interface TranscriptSectionProps {
  transcript: TranscriptItem[];
  onSeek: (time: string) => void;
}

export function TranscriptSection({
  transcript,
  onSeek,
}: TranscriptSectionProps) {
  return (
    <div className="flex flex-col h-full">

      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-slate-500 rounded-sm" />

        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Transcript
        </h4>
      </div>

      <ScrollArea className="flex-1 pr-4">

        <div className="md:space-y-4 space-x-2">

          {transcript?.map((item, index) => (
            <div
              key={index}
              onClick={() => onSeek(item.time)}
              className="flex gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all"
            >
              <span className="dark:text-primary text-primary-600 font-mono text-sm font-bold shrink-0">
                {item.time}
              </span>

              <p className="text-sm leading-relaxed group-hover:underline transition-colors line-clamp-2">
                — {item.text}
              </p>
            </div>
          ))}

        </div>
      </ScrollArea>
    </div>
  );
}