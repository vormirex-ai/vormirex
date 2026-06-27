import { useNavigate } from "react-router";

import {
  Play,
  BookOpen,
  Clock,
  Target,
  Trophy,
  Crown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomProgress } from "@/components/common/custom-progress";
import { DynamicIcon } from "@/components/iconMapper";
import { CourseHeaderProps } from "@/interface/subject.interface";
import { useDispatch } from "react-redux";
import { setCurrentLessonId } from "@/store/slice/subjectSlice";
import { useGetSubjectContinueQuery } from "@/store/api/subjectsApi";

export function CourseHeader({
  title,
  progress,
  description,
  stats,
  id,
  icon,
  isPro,
}: CourseHeaderProps) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: continueData,
    isLoading,
  } = useGetSubjectContinueQuery(id!, {
    skip: !id,
  });

  const lessonId =
    continueData?.data?.lessonId;

  return (
    <div className="relative custom-surface rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 shadow-md overflow-hidden pb-10">

      <div className="space-y-4 max-w-2xl flex-1">

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          <div className="w-fit p-3 dark:bg-slate-900 bg-slate-200 border border-cyan-500/10 rounded-xl shadow-inner flex items-center justify-center shrink-0">

            <DynamicIcon
              icon={icon || "FaBook"}
              className="text-2xl text-amber-400"
            />

          </div>

          <div className="space-y-1.5">

            <div className="flex flex-wrap items-center gap-2">

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                {title}
              </h1>

                <div className="flex gap-2">
                   {isPro && (
                  <span className="rounded-full px-3  text-xs font-medium bg-primary/20 border border-primary text-primary flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Pro
              </span>
                )}
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-y-2.5 gap-x-4 text-xs md:text-sm text-slate-400">

          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-slate-500" />
            {stats.lessons} lessons
          </span>

          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-500" />
            {stats.duration}
          </span>

          <span className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-slate-500" />
            {stats.quizzes} quizzes
          </span>

          {stats.hasCertificate && (
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-slate-500" />
              Completion certificate
            </span>
          )}

        </div>
      </div>

      <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t border-slate-800/60 lg:border-0 pt-4 lg:pt-0">

        <div className="text-left lg:text-right">

          <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-primary-gradient bg-clip-text text-transparent">
            {progress}%
          </span>

          <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide uppercase mt-0.5">
            Complete
          </p>

        </div>

        <Button
          disabled={
            progress === 100 ||
            !lessonId ||
            isLoading
          }
          onClick={() => {

            if (!lessonId) return;

            dispatch(
              setCurrentLessonId(lessonId)
            );

            navigate(
              `/dashboard/video-learning/${lessonId}`
            );
          }}
          className="flex items-center gap-2 rounded-xl px-5 py-2 text-sm md:text-base shrink-0"
        >

          {progress === 100 ? (
            <>
              <Trophy className="w-4 h-4" />
              Done
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Continue
            </>
          )}

        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-6">

        <CustomProgress
          value={progress}
          className="h-1.5 w-full bottom-2"
          indicatorClassName="bg-primary-gradient"
        />

      </div>
    </div>
  );
}