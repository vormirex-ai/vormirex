import {
  LayoutDashboard,
  BookOpen,
  Video,
  MessageCircle,
  Map,
  Trophy,
  Timer,
  Library,
  Zap,
  BarChart3,
  Medal,
  Calendar,
  PenLine,
  FileText,
  Mic2,
  User,
  Settings,
  Home,
  LucideIcon,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  isNew?: boolean;
}

export interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    groupLabel: "MAIN",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { title: "Subjects", path: "/dashboard/subjects", icon: BookOpen },
      {
        title: "Subject Detail",
        path: "/dashboard/course-details",
        icon: FileText,
      },
      {
        title: "Video Library",
        path: "/dashboard/video-learning",
        icon: Video,
        isNew: true,
      },
      { title: "AI Chat", path: "/dashboard/ai-chat", icon: MessageCircle },
      { title: "Roadmap", path: "/dashboard/roadmap", icon: Map },
      { title: "Quiz", path: "/practice/quiz", icon: Trophy },
      {
        title: "Daily Challenge",
        path: "/practice/daily-challenges",
        icon: Zap,
      },
      {
        title: "Focus Timer",
        path: "/productivity/timer",
        icon: Timer,
        isNew: true,
      },
      {
        title: "Flashcards",
        path: "/practice/flash-cards",
        icon: Library,
        isNew: true,
      },
    ],
  },

  {
    groupLabel: "ANALYTICS",
    items: [
      { title: "Insights", path: "/analytics/Insights", icon: BarChart3 },
      { title: "Leaderboard", path: "/analytics/leaderboard", icon: Medal },
      {
        title: "Study Planner",
        path: "/productivity/study-planner",
        icon: Calendar,
      },
      { title: "Notes", path: "/productivity/notes", icon: PenLine },

      { title: "Interview Bot", path: "/practice/interview-bot", icon: Mic2 },
    ],
  },
  {
    groupLabel: "ACCOUNT",
    items: [
      { title: "Profile", path: "/account/profile", icon: User },
      { title: "Settings", path: "/dashboard/settings", icon: Settings },
      { title: "Help", path: "/", icon: HelpCircle },
      { title: "Home", path: "/", icon: Home },
    ],
  },
];
