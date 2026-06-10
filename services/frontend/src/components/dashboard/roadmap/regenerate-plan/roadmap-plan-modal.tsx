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
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

import { RoadmapProgress } from "./roadmap-progress";
import { RoadmapStepGoal } from "./roadmap-step-goal";
import { RoadmapStepLevel } from "./roadmap-step-level";
import { RoadmapStepTime } from "./roadmap-step-time";
import { RoadmapStepPace } from "./regenerate-step-pace";
import { RoadmapStepPreferences } from "./roadmap-step-preferences";
import { RoadmapStepAvailability } from "./roadmap-step-availability";
import { RoadmapStepSummary } from "./roadmap-step-summary";
import { RoadmapStepEnhancements } from "../roadmap-step-enhancements";

import {
  GoalType,
  LevelType,
  PaceType,
  PreferenceType,
  TimeLine,
} from "@/interface/roadmap.interface";

import { cn } from "@/lib/utils";
import { stepMeta } from "@/components/data/roadmap-data";

export function RegeneratePlanModal() {
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  const stepLabel = stepMeta[step];
  const [goal, setGoal] = useState<GoalType>("master");
  const [goalDescription, setGoalDescription] = useState("");
  const [level, setLevel] = useState<LevelType>("beginner");
  const [timeLine, setTimeLine] = useState<TimeLine>("30 Minutes");
  const [customTime, setCustomTime] = useState("");
  const [pace, setPace] = useState<PaceType>("balanced");
  const [preferences, setPreferences] = useState<PreferenceType[]>([
    "video-lessons",
  ]);
  const [selectedDay, setSelectedDay] = useState("Mon");

  const [enhancements, setEnhancements] = useState([
    { id: "revision", title: "Include Revision Sessions", enabled: true },
    { id: "assessment", title: "Weekly Assessments", enabled: true },
    { id: "ai", title: "AI Recommendations", enabled: true },
    { id: "mock", title: "Mock Exams", enabled: true },
    { id: "challenge", title: "Daily Challenges", enabled: false },
    { id: "practice", title: "Personalized Practice", enabled: false },
    { id: "review", title: "Progress Reviews", enabled: true },
  ]);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-primary-gradient text-black font-semibold">
          Regenerate Plan
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 gap-2 md:px-6 px-1 overflow-hidden border border-primary/20 rounded-2xl w-[85vw] sm:w-full max-w-4xl h-[70vh] flex flex-col bg-background dark:bg-[#030817]">
        <DialogHeader className="shrink-0 px-3 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4">

          <div className="flex items-start gap-3 sm:gap-4">

            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-primary-gradient flex items-center justify-center text-black shrink-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div className="min-w-0">

              <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold leading-snug">
                Regenerate Learning Roadmap
              </DialogTitle>

              <DialogDescription className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
                Create a personalized study plan based on your goals and preferences.
              </DialogDescription>

            </div>
          </div>
        </DialogHeader>

        {step !== 8 && (
          <div className="px-6 pt-4">
            <RoadmapProgress
              step={step}
              total={totalSteps}
              label={stepLabel}
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          {step === 1 && (
            <RoadmapStepGoal
              goal={goal}
              setGoal={setGoal}
              goalDescription={goalDescription}
              setGoalDescription={setGoalDescription}
            />
          )}

          {step === 2 && (
            <RoadmapStepLevel level={level} setLevel={setLevel} />
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
            <RoadmapStepPace pace={pace} setPace={setPace} />
          )}

          {step === 5 && (
            <RoadmapStepPreferences
              preferences={preferences}
              setPreferences={setPreferences}
            />
          )}

          {step === 6 && (
            <RoadmapStepAvailability
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          )}

          {step === 7 && (
            <RoadmapStepEnhancements
              enhancements={enhancements}
              setEnhancements={setEnhancements}
            />
          )}

          {step === 8 && (
            <RoadmapStepSummary
              goal={goal}
              goalDescription={goalDescription}
              level={level}
              dailyStudy={
                timeLine === "Custom" ? customTime : timeLine
              }
              pace={pace}
              preferences={preferences}
              selectedDay={selectedDay}
            />
          )}
        </div>
        {step !== 8 ? (
          <div className="px-4 sm:px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={step === 1}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex justify-center gap-2 order-first sm:order-none">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i + 1 <= step
                      ? "w-8 bg-primary-gradient"
                      : "w-5 bg-muted"
                  )}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="w-full sm:w-auto"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">

            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="rounded-full px-8 w-full sm:w-auto"
            >
              Generate Again
            </Button>

            <Button className="rounded-full px-8 bg-primary-gradient text-black font-semibold w-full sm:w-auto">
              View New Roadmap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}