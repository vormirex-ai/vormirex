import {
  Video,
  BookOpen,
  Bot,
  Dumbbell,
  FileQuestion,
  Layers3,
  FolderKanban,
  ClipboardCheck,
  Check,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { PreferenceType } from "@/interface/roadmap.interface";

interface Props {
  preferences: PreferenceType[];
  setPreferences: (value: PreferenceType[]) => void;
}

const preferenceOptions = [
  {
    key: "video-lessons",
    title: "Video Lessons",
    icon: Video,
  },
  {
    key: "reading-material",
    title: "Reading Material",
    icon: BookOpen,
  },
  {
    key: "ai-tutor",
    title: "AI Tutor Sessions",
    icon: Bot,
  },
  {
    key: "practice-problems",
    title: "Practice Problems",
    icon: Dumbbell,
  },
  {
    key: "quizzes",
    title: "Quizzes",
    icon: FileQuestion,
  },
  {
    key: "flashcards",
    title: "Flashcards",
    icon: Layers3,
  },
  {
    key: "projects",
    title: "Projects",
    icon: FolderKanban,
  },
  {
    key: "mock-tests",
    title: "Mock Tests",
    icon: ClipboardCheck,
  },
];

export function RoadmapStepPreferences({ preferences, setPreferences }: Props) {
  const togglePreference = (value: PreferenceType) => {
    if (preferences.includes(value)) {
      setPreferences(preferences.filter((item) => item !== value));
    } else {
      setPreferences([...preferences, value]);
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <p className="text-sm text-primary mb-2 font-medium">
          Step 5 of 7 · Learning Preferences
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Choose your learning speed
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {preferenceOptions.map((item) => {
          const Icon = item.icon;

          const active = preferences.includes(item.key as PreferenceType);

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => togglePreference(item.key as PreferenceType)}
              className={cn(
                "group relative overflow-hidden",
                "rounded-[18px]",
                "border",
                "p-4",
                "min-h-[112px]",
                "text-left",
                "transition-all duration-300",

                "bg-white border-gray-200",
                "hover:border-primary/50",
                "hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]",

                "dark:bg-[#0A1625]",
                "dark:border-white/10",
                "dark:hover:border-cyan-400/40",
                "dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]",

                "hover:-translate-y-0.5",

                active &&
                `
                    border-primary
                    bg-primary/5

                    dark:border-primary
                    dark:bg-[linear-gradient(180deg,#11283A_0%,#0A1625_100%)]
                    dark:shadow-[0_0_25px_rgba(34,211,238,0.25)]
                  `,
              )}
            >

              {active && (
                <>
                  <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_70%)]" />
                  <div className="absolute inset-0 rounded-[18px] border border-primary/30 pointer-events-none" />
                </>
              )}

              {active && (
                <div className="absolute top-3 right-3 z-20">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center",
                      "bg-primary-gradient shadow-sm",
                      "dark:bg-primary-gradient dark:shadow-[0_0_10px_rgba(34,211,238,0.6)]",
                    )}
                  >
                    <Check
                      size={10}
                      className="text-white dark:text-black"
                      strokeWidth={3}
                    />
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "relative z-10",
                  "w-11 h-11 rounded-full",
                  "flex items-center justify-center",
                  "transition-all duration-300",

                  active
                    ? ` bg-primary-gradient text-white dark:text-white dark:shadow-[0_0_18px_rgba(34,211,238,0.45)]
                      `
                    : `
                        bg-gray-100 border border-gray-200 text-gray-600
 dark:bg-white/10 dark:border-white/10 dark:text-white/70
                      `,
                )}
              >
                <Icon size={18} strokeWidth={2.2} />
              </div>

              <div className="relative z-10 mt-5">
                <h3
                  className={cn(
                    "text-[14px] font-semibold leading-snug",

                    active
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-white/90",
                  )}
                >
                  {item.title}
                </h3>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/5 to-transparent dark:from-cyan-500/5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
