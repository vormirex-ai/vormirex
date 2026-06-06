import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { Button } from "@/components/ui/button";

interface ChallengeResultProps {
  score: number;
  accuracy: number;
  onRetry: () => void;
  onExit: () => void;
}

export const ChallengeResult: React.FC<ChallengeResultProps> = ({
  score,
  accuracy,
  onRetry,
  onExit,
}) => {

  const { width, height } = useWindowSize();

  return (
    <div className="mx-auto text-center space-y-6 py-12 px-4 text-slate-200 relative justify-center min-h-[70vh] overflow-hidden">

      {/* Confetti */}
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={220}
        gravity={0.18}
      />

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Emoji */}
      <div className="flex justify-center relative z-10">
        <div className="text-5xl p-4 bg-amber-500/10 rounded-full border border-amber-500/20 animate-bounce duration-1000">
          💪
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-1 relative z-10">
        <h2 className="text-2xl font-black text-primary tracking-tight">
          Challenge Complete!
        </h2>

        <p className="text-sm text-slate-400">
          All questions answered successfully
        </p>
      </div>

      {/* Score */}
      <div className="flex flex-col gap-2 py-4 relative z-10">
        <div className="text-5xl font-black text-cyan-400 tracking-tight leading-none">
          {score} pts
        </div>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-4">
          Top accuracy: {accuracy}%
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-3 relative z-10">
        <Button
          className="rounded-xl px-5 py-5"
          onClick={onRetry}
        >
          Try Again
        </Button>

        <Button
          onClick={onExit}
          variant="secondary"
          className="rounded-xl px-5 py-5"
        >
          Exit
        </Button>
      </div>
    </div>
  );
};