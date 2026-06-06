import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";

import { RoadmapProgress } from "./roadmap-progress";
import { RoadmapStepGoal } from "./roadmap-step-goal";
import { RoadmapStepLevel } from "./roadmap-step-level";
import { RoadmapStepTime } from "./roadmap-step-time";

import {
  GoalType,
  LevelType,
  PaceType,
  PreferenceType,
  TimeLine,
} from "@/interface/roadmap.interface";
import { cn } from "@/lib/utils";
import { RoadmapStepPace } from "./regenerate-step-pace";
import { RoadmapStepPreferences } from "./regenrate-step-preferences";

export function RegeneratePlanModal() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<GoalType>("master");
  const [level, setLevel] = useState<LevelType>("beginner");
  const [timeLine, setTimeLine] = useState<TimeLine>("30 Minutes");
  const [customTime, setCustomTime] = useState("");
  const [pace, setPace] = useState<PaceType>("balanced");
  const [
    preferences,
    setPreferences,
  ] = useState<PreferenceType[]>(
    []
  );


  const totalSteps = 7;




  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-primary-gradient text-black font-semibold">
          Regenerate Plan
        </Button>
      </DialogTrigger>

      <DialogContent
        className=" p-0 overflow-hidden border border-cyan-400/40 rounded-[32px] max-w-4xl dark:bg-[#030817] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_45%)] "
      >
        <DialogHeader className="relative border-b border-cyan-500/10 px-8 pt-7 pb-5">

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-black shrink-0">
              <Sparkles size={20} />
            </div>

            <div>
              <DialogTitle className="text-xl sm:text-2xl font-semibold">
                Regenerate Learning Roadmap
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-400 mt-1.5 max-w-2xl">
                Create a personalized study plan
                based on your goals,
                availability, and learning
                preferences.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 pt-5">
          <RoadmapProgress
            step={step}
            total={totalSteps}
          />
        </div>

        <div className="px-8 py-8 min-h-[320px]">
          {step === 1 && (
            <RoadmapStepGoal
              goal={goal}
              setGoal={setGoal}
            />
          )}

          {step === 2 && (
            <RoadmapStepLevel
              level={level}
              setLevel={setLevel}
            />
          )}

          {step === 3 && (
            <RoadmapStepTime
              level={timeLine}
              setLevel={setTimeLine}
              customTime={customTime}
              setCustomTime={setCustomTime}
            />
          )}
          {step === 4 && (
            <RoadmapStepPace
              pace={pace}
              setPace={setPace}
            />
          )}
          {step === 5 && (
            <RoadmapStepPreferences
              preferences={preferences}
              setPreferences={
                setPreferences
              }
            />
          )}
        </div>

        <div className="border-t border-cyan-500/30 px-8 py-5 flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            className="text-gray-400 hover:text-white"
            onClick={() => {
              if (step > 1) {
                setStep((prev) => prev - 1);
              }
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({
              length: totalSteps,
            }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index + 1 <= step
                    ? "w-8 bg-primary-gradient"
                    : "w-6 dark:bg-white/10 bg-gray-400"
                )}
              />
            ))}
          </div>

          <Button
            type="button"
            onClick={() =>
              setStep((prev) =>
                Math.min(
                  prev + 1,
                  totalSteps
                )
              )
            }
            className=" rounded-full px-7 bg-primary-gradient text-black font-semibold"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}