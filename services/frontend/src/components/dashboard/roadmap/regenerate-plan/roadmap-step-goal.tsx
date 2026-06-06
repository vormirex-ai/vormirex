import {
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
  Trophy,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { RoadmapOptionCard } from "./roadmap-option-card";

import { GoalType } from "@/interface/roadmap.interface";

interface Props {
  goal: GoalType;
  setGoal: (value: GoalType) => void;
}

export function RoadmapStepGoal({ goal, setGoal }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          What is your learning objective?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          <RoadmapOptionCard
            title="Master Subject"
            description="Deep dive into a topic"
            icon={<GraduationCap size={20} />}
            active={goal === "master"}
            onClick={() => setGoal("master")}
          />

          <RoadmapOptionCard
            title="Exam Preparation"
            description="Ace your upcoming exam"
            icon={<ShieldCheck size={20} />}
            active={goal === "exam"}
            onClick={() => setGoal("exam")}
          />

          <RoadmapOptionCard
            title="Job Ready Skills"
            description="Build market-ready expertise"
            icon={<BriefcaseBusiness size={20} />}
            active={goal === "job"}
            onClick={() => setGoal("job")}
          />

          <RoadmapOptionCard
            title="Interview Preparation"
            description="Crack technical rounds"
            icon={<BookOpen size={20} />}
            active={goal === "interview"}
            onClick={() => setGoal("interview")}
          />

          <RoadmapOptionCard
            title="Competitive Exams"
            description="JEE, NEET, GATE & more"
            icon={<Trophy size={20} />}
            active={goal === "competitive"}
            onClick={() => setGoal("competitive")}
          />

          <RoadmapOptionCard
            title="Custom Goal"
            description="Define your own path"
            icon={<Sparkles size={20} />}
            active={goal === "custom"}
            onClick={() => setGoal("custom")}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-3 block">
          Describe your goal
        </label>

        <Textarea
          placeholder="Become proficient in Mathematics and complete Calculus within 3 months."
          className="min-h-[120px] sm:min-h-[130px] rounded-2xl sm:rounded-3xl   resize-none"
        />
      </div>
    </div>
  );
}
