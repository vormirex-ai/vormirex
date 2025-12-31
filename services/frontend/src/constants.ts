import {
  faCode,
  faDatabase,
  faLightbulb,
  faChartLine,
  faCubes,
  faLaptopCode,
  faClipboardList,
  faBookmark,
  faCircleQuestion,
  faBookOpen,
  faPaperclip,
  faCalculator,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export interface MenuItem {
  icon: IconDefinition;
  label: string;
}

export const SUBJECTS: MenuItem[] = [
  { icon: faCode, label: "Cyber Security" },
  { icon: faDatabase, label: "Data Science" },
  { icon: faLightbulb, label: "AI / ML" },
  { icon: faChartLine, label: "Data Analytics" },
];

export const CUSTOM_COURSES: MenuItem[] = [
  { icon: faCubes, label: "Booster Pack" },
  { icon: faLaptopCode, label: "Coding Mastery" },
  { icon: faClipboardList, label: "Exam Prep" },
  { icon: faChartLine, label: "Your Progress" },
  { icon: faBookmark, label: "Saved Chats" },
];

export const RECENT_CHATS: MenuItem[] = [
  { icon: faCircleQuestion, label: "SQL Joins: LEFT vs. INNER" },
  { icon: faCircleQuestion, label: "Python Decorators" },
  { icon: faCircleQuestion, label: "Cross-Site Scripting (XSS)" },
];

export const QA_CARDS: MenuItem[] = [
  { icon: faBookOpen, label: "Summarize Tech Article" },
  { icon: faCircleQuestion, label: "Generate Coding Challenge" },
  { icon: faPaperclip, label: "Convert Code to Docs" },
  { icon: faCalculator, label: "Debug Step-by-Step" },
];
