import { TimelineItem } from "@/interface/roadmap.interface";

export const roadmapTimeline: TimelineItem[] = [
  {
    day: "MONDAY",
    title: "Integration by Parts — Theory",
    duration: "45 min",
    completed: true,
  },
  {
    day: "MONDAY",
    title: "Integration by Parts — Practice Problems",
    duration: "30 min",
    completed: true,
  },
  {
    day: "TUESDAY",
    title: "Trigonometric Substitution",
    duration: "50 min",
    completed: true,
  },
  {
    day: "WEDNESDAY",
    title: "Partial Fractions — Introduction",
    duration: "45 min",
    active: true,
  },
  {
    day: "WEDNESDAY",
    title: "Partial Fractions — Exercises",
    duration: "30 min",
  },
  {
    day: "THURSDAY",
    title: "Improper Integrals",
    duration: "40 min",
  },
  {
    day: "FRIDAY",
    title: "Mixed Integration Quiz",
    duration: "20 min",
  },
];

export const stepMeta: Record<number, string> = {
  1: "Learning Goal",
  2: "Skill Level",
  3: "Daily Study Time",
  4: "Study Pace",
  5: "Preferences",
  6: "Availability",
  7: "Roadmap Enhancements",
  8: "Summary",
};
