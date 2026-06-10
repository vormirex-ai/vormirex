import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { fadeUpItem } from "@/lib/motion";

export default function QuizHistoryCard({
  quiz,
  subjectName,
}: any) {
  return (
    <motion.div
      variants={fadeUpItem}
      initial="hidden"
      animate="show"
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {subjectName}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {new Date(
              quiz.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatBox
            label="Score"
            value={`${quiz.score}%`}
          />

          <StatBox
            label="XP"
            value={`+${quiz.xpEarned}`}
          />

          <StatBox
            label="Questions"
            value={quiz.totalQuestions}
          />

          <StatBox
            label="Time"
            value={`${quiz.timeTaken}s`}
            icon={<Clock3 className="h-3.5 w-3.5" />}
          />
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({
  label,
  value,
  icon,
}: any) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 px-5 py-4 text-center backdrop-blur-xl">
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>

      <div className="mt-2 text-lg font-bold dark:text-primary text-primary-500">
        {value}
      </div>
    </div>
  );
}