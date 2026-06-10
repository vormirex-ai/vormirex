import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { LessonHeader } from "@/components/dashboard/video-leraning/lession-header";
import { VideoPlayer } from "@/components/dashboard/video-leraning/video-player";
import { ActionButtons } from "@/components/dashboard/video-leraning/action-buttons";
import { TranscriptSection } from "@/components/dashboard/video-leraning/transcript-view";
import { AIChatSidebar } from "@/components/dashboard/video-leraning/ai-chat-container";
import { setNextLessonId } from "@/store/slice/subjectSlice";
import { useGetSubjectLessonsQuery } from "@/store/api/subjectsApi";

export default function VideoLearning() {
  const location = useLocation();
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentLessonId = useSelector((state: RootState) => state.subject.currentLessonId);
  const finalLessonId = new URLSearchParams(location.search).get("lessonId") || currentLessonId;
  const [sendMessage, setSendMessage] = useState<((text: string) => void) | null>(null);
  const { data: lessonResponse, isLoading, } = useGetSubjectLessonsQuery(finalLessonId!, { skip: !finalLessonId, });
  const lessonData = lessonResponse?.data;

  if (
    lessonData?.nextLessonId
  ) {
    dispatch(
      setNextLessonId(
        lessonData.nextLessonId
      )
    );
  }

  const seekToTime = async (
    timeString: string
  ) => {
    if (!videoRef.current) return;

    const [minutes, seconds] =
      timeString
        .split(":")
        .map(Number);

    const totalSeconds =
      minutes * 60 + seconds;

    videoRef.current.currentTime =
      totalSeconds;

    await videoRef.current.play();
  };

  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div className="flex flex-col gap-6 lg:gap-8">

        <motion.div variants={fadeUpItem}>
          <LessonHeader
            title={lessonData?.title}
            durationMinutes={
              lessonData?.durationMinutes
            }
            chapterTitle="Chapter"
            lessonNumber={
              lessonData?.sequenceOrder
            }
          />
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          <div className="flex-1 flex flex-col space-y-5 lg:space-y-6 min-w-0">
            <motion.div variants={fadeUpItem}>
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/10 w-full">
                <VideoPlayer
                  key={lessonData?._id}
                  ref={videoRef}
                  videoUrl={lessonData?.videoUrl}
                  lessonId={lessonData?._id}
                  nextLessonId={lessonData?.nextLessonId}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <ActionButtons
                onActionClick={(label) => {
                  sendMessage?.(label);
                }}
              />
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <div className="custom-surface rounded-xl p-4 sm:p-5 lg:p-6 min-h-[260px] max-h-[400px] shadow-2xl h-[500px] overflow-y-auto custom-scrollbar">

                <TranscriptSection
                  transcript={
                    lessonData?.transcript || []
                  }
                  onSeek={seekToTime}
                />

              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUpItem}
            className="w-full xl:w-[360px] shrink-0"
          >
            <aside className="w-full">
              <AIChatSidebar
                id={lessonData?.id}
                onReady={(fn) =>
                  setSendMessage(() => fn)
                }
              />

            </aside>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}