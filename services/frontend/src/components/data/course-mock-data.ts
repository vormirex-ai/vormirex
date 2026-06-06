import { Chapter } from "../dashboard/course-details/chapter-card";

export const chaptersData: Chapter[] = [
  {
    id: 1,
    title: "Limits & Continuity",
    status: "completed",
    lessons: [
      {
        id: "l1",
        title: "Introduction to Limits",
        duration: "18 min",
        status: "completed",
      },
      {
        id: "l2",
        title: "One-Sided Limits",
        duration: "22 min",
        status: "completed",
      },
      {
        id: "l3",
        title: "Continuity & Discontinuity",
        duration: "28 min",
        status: "completed",
      },
    ],
  },
  {
    id: 2,
    title: "Derivatives",
    status: "completed",
    lessons: [
      {
        id: "l4",
        title: "What is a Derivative?",
        duration: "20 min",
        status: "completed",
      },
      {
        id: "l5",
        title: "Differentiation Rules",
        duration: "35 min",
        status: "completed",
      },
      {
        id: "l6",
        title: "Chain Rule & Applications",
        duration: "40 min",
        status: "completed",
      },
    ],
  },
  {
    id: 4,
    title: "Integration Techniques",
    status: "in-progress",
    lessons: [
      {
        id: "l7",
        title: "Introduction to Integration",
        duration: "25 min",
        status: "completed",
      },
      {
        id: "l8",
        title: "Integration by Parts",
        duration: "45 min",
        status: "in-progress",
      },
      {
        id: "l9",
        title: "Partial Fractions",
        duration: "30 min",
        status: "locked",
      },
      {
        id: "l10",
        title: "Improper Integrals",
        duration: "35 min",
        status: "locked",
      },
    ],
  },
  {
    id: 5,
    title: "Differential Equations",
    status: "upcoming",
    lessons: [
      {
        id: "l11",
        title: "First-Order ODEs",
        duration: "40 min",
        status: "locked",
      },
      {
        id: "l12",
        title: "Separation of Variables",
        duration: "35 min",
        status: "locked",
      },
      { id: "l13", title: "Linear ODEs", duration: "45 min", status: "locked" },
    ],
  },
];
