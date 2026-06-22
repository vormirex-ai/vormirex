import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentLessonId, setCurrentChapterId, } from "@/store/slice/subjectSlice";
import { Check, Play, Lock } from "lucide-react";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "in-progress" | "locked";
}

export interface Chapter {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
  lessons: Lesson[];
}

export function CourseChapterCard({ chapter }: { chapter: Chapter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const activeLessonRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <div className="custom-surface rounded-2xl p-5 flex flex-col h-[420px] overflow-hidden transition-all duration-200 hover:border-primary">

      <div className="shrink-0">
        <div className="flex items-center justify-between mb-4">

          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-400">
              Chapter {chapter.id}
            </span>

            <h2 className="text-lg font-bold tracking-tight mt-0.5 text-slate-900 dark:text-slate-100">
              {chapter.title}
            </h2>
          </div>

          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
            {chapter.status}
          </span>

        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar">

        {chapter.lessons.map((lesson, index) => {
          const isCompleted = lesson.status === "completed";
          const isInProgress = lesson.status === "in-progress";
          const isLocked = lesson.status === "locked";

          return (
            <div
              key={lesson.id}
              ref={isInProgress ? activeLessonRef : null}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all shadow-sm
                ${isInProgress
                  ? "bg-primary/10 border-primary/40"
                  : isCompleted
                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                }
                hover:shadow-md hover:border-primary/40
              `}
            >

              <div className="flex items-center gap-3.5">

                {isCompleted && (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}

                {isInProgress && (
                  <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary flex items-center justify-center text-primary animate-pulse">
                    <Play className="w-2.5 h-2.5 ml-0.5" />
                  </div>
                )}

                {isLocked && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs text-slate-600">
                    {index + 1}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lesson.duration}
                  </p>
                </div>
              </div>

              <div>
                {isCompleted && (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}

                {isInProgress && (
                  <button
                    onClick={() => {
                      if (!lesson.id) {
                        console.log("Lesson ID missing", lesson);
                        return;
                      }
                      dispatch(setCurrentLessonId(lesson.id));
                      dispatch(setCurrentChapterId(chapter.id));
                      navigate(
                        `/dashboard/video-learning?lessonId=${lesson.id}`
                      );
                    }}
                    className="text-xs font-semibold bg-primary-gradient text-slateText px-3 py-1.5 rounded-lg hover:opacity-90 transition"
                  >
                    Resume
                  </button>
                )}

                {isLocked && (
                  <Lock className="w-4 h-4 text-slate-500" />
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}