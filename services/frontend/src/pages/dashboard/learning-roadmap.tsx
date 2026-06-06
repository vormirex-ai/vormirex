import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { RoadmapHeader } from "@/components/dashboard/roadmap/roadmap-header";
import { RoadmapProgressCard } from "@/components/dashboard/roadmap/roadmap-progress-card";
import { RoadmapTimeline } from "@/components/dashboard/roadmap/roadmap-timeline";
import { RoadmapTipCard } from "@/components/dashboard/roadmap/roadmap-tip-card";
import { RoadmapChatCard } from "@/components/dashboard/roadmap/roadmap-chat-card";

export default function RoadmapPage() {


  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div >
        <motion.div variants={fadeUpItem}>
          <RoadmapHeader />
        </motion.div>
        <motion.div variants={fadeUpItem}>
          <RoadmapProgressCard />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <RoadmapTimeline />
            <div className="space-y-6">
              <h3 className="font-bold text-xl">
                🤖 AI STUDY TIPS
              </h3>

              <RoadmapTipCard
                icon="💡"
                title="Integration by Parts Tip"
                description="Remember LIATE rule: always pick your 'u' term following Logarithm → Inverse trig → Algebraic → Trigonometric → Exponential order."
              />

              <RoadmapTipCard
                icon="⚡"
                title="Study Strategy"
                description="Based on your pattern, you learn best in focused 45-minute sessions."
              />

              <RoadmapTipCard
                icon="🏆"
                title="This Week's Goal"
                description="Complete 3 lessons + 1 quiz to unlock the Integration Master badge."
              />

              <RoadmapChatCard />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}