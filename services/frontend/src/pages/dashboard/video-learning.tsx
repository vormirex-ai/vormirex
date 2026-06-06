import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { LessonHeader } from "@/components/dashboard/video-leraning/lession-header";
import { VideoPlayer } from "@/components/dashboard/video-leraning/video-player";
import { ActionButtons } from "@/components/dashboard/video-leraning/action-buttons";
import { TranscriptSection } from "@/components/dashboard/video-leraning/transcript-view";
import { AIChatSidebar } from "@/components/dashboard/video-leraning/ai-chat-container";
import { useParams } from "react-router-dom";

export default function VideoLearning() {
  const { id } = useParams();
  // console.log("VideoLearning ID:", id);

  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div className="flex flex-col gap-6 lg:gap-8">

        <motion.div variants={fadeUpItem}>
          <LessonHeader />
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">

          <div className="flex-1 flex flex-col space-y-5 lg:space-y-6 min-w-0">

            <motion.div variants={fadeUpItem}>
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/10 w-full">
                <VideoPlayer />
              </div>
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <ActionButtons />
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <div className="custom-surface rounded-xl p-4 sm:p-5 lg:p-6  min-h-[260px] max-h-[400px]  shadow-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:border-cyan-400/5 h-[500px] overflow-y-auto custom-scrollbar">
                <TranscriptSection />
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUpItem}
            className="w-full xl:w-[360px] shrink-0"
          >
            <aside className="w-full">
              <AIChatSidebar id={id} />
            </aside>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}