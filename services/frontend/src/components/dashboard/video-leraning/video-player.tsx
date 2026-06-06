import { useEffect, useState } from "react";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
} from "lucide-react";

import { Slider } from "@/components/ui/slider";

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(20);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }

          return prev + 1;
        });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="custom-surface rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:border-cyan-400/50">

      <div className="aspect-video relative flex items-center justify-center bg-card overflow-hidden">

        {isPlaying && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              PLAYING
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 text-xs text font-mono">
          ∫f(x)dx = F(x) + C
        </div>

        <div className="absolute top-14 left-6 text-sm  font-mono">
          d/dx[F(x)] = f(x)
        </div>

        <button
          onClick={togglePlay}
          className="z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
        >
          {isPlaying ? (
            <Pause className="text-white fill-white w-8 h-8" />
          ) : (
            <Play className="fill-white text-white w-8 h-8 ml-1" />
          )}
        </button>

        <div className="absolute bottom-6 right-6 text-xs text-white bg-black/50 px-3 py-2 rounded-lg">
          13:56 / 45:00
        </div>
      </div>

      <div className="p-4 bg-border backdrop-blur rounded-b-2xl">

        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={(value) => setProgress(value[0])}
          className="mb-5 cursor-pointer [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.relative]:bg-slate-800 [&_[data-orientation=horizontal]]:h-1.5"
        />

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-6 ">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="w-5 h-5 cursor-pointer hover:text-primary" />
              ) : (
                <Play className="w-5 h-5 cursor-pointer hover:text-primary" />
              )}
            </button>

            <SkipBack className="w-5 h-5 cursor-pointer hover:text-primary" />

            <SkipForward className="w-5 h-5 cursor-pointer hover:text-primary" />

            <Volume2 className="w-5 h-5 cursor-pointer hover:text-primary" />
          </div>


          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span className="cursor-pointer hover:text-primary">
              1× Speed
            </span>

            <Maximize className="w-5 h-5 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}