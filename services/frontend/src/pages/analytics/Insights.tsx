import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { InsightHeader } from "@/components/dashboard/ai-insight/insight-header";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";
import {
  BarChart3,
  Clock3,
  Target,
  Trophy,
} from "lucide-react";
import ProgressListCard from "@/components/dashboard/ai-insight/ProgressListCard";
import LearningPattern from "@/components/dashboard/ai-insight/learning-pattern";
import PredictionCard from "@/components/dashboard/ai-insight/prediction-card";

const weakTopics = [
  { title: "Integration by Parts", value: 52, color: "bg-red-400" },
  { title: "Python Decorators", value: 58, color: "bg-orange-400" },
  { title: "Quantum Mechanics", value: 64, color: "bg-yellow-400" },
  { title: "Partial Fractions", value: 68, color: "bg-lime-400" },
];

const strongTopics = [
  { title: "Derivatives & Rules", value: 94, color: "bg-emerald-400" },
  { title: "Python Basics", value: 91, color: "bg-cyan-400" },
  { title: "Newton's Laws", value: 88, color: "bg-blue-400" },
  { title: "Limits & Continuity", value: 85, color: "bg-violet-400" },
];

const AiInsightsPage = () => {
  return (

    <div className="min-h-screen  p-1 lg:p-10">
      <div className=" mx-auto space-y-10">

        <motion.div variants={fadeUpItem}>
          <div className="shrink-0">
            <InsightHeader />
          </div>
        </motion.div>

        <motion.div
          variants={containerStagger(0.12)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard
            title="Avg Quiz Score"
            value={82}
            suffix="%"
            icon={BarChart3}
            badge="5% this week"
            iconBg="bg-blue-500/10"
            iconColor="text-blue-400"
          />

          <StatCard
            title="Avg Daily Study"
            value={3.2}
            suffix="h"
            icon={Clock3}
            badge="0.4h"
            iconBg="bg-emerald-500/10"
            iconColor="text-emerald-400"
          />

          <StatCard
            title="Completion Rate"
            value={94}
            suffix="%"
            icon={Target}
            badge="2%"
            iconBg="bg-violet-500/10"
            iconColor="text-violet-400"
          />

          <StatCard
            title="Global Rank"
            value={5}
            suffix="Top %"
            icon={Trophy}
            badge="3 positions"
            iconBg="bg-amber-500/10"
            iconColor="text-amber-400"
          />
        </motion.div>
        <motion.div
          variants={fadeUpItem}
          initial="hidden"
          animate="show"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ProgressListCard
              title="Weak Topics"
              badge="Needs Work"
              badgeClass="bg-red-500/10 text-red-400"
              items={weakTopics}
            />

            <ProgressListCard
              title="Strength Areas"
              badge="Excellent"
              badgeClass="bg-emerald-500/10 text-emerald-400"
              items={strongTopics}
            />
          </div>
        </motion.div>
        <motion.div
          variants={fadeUpItem}
          initial="hidden"
          animate="show"
        >
          <div className="grid gap-6 lg:grid-cols-2 items-stretch">
            <LearningPattern />
            <PredictionCard />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AiInsightsPage
