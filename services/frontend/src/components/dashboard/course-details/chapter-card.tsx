import { Check, Play, Lock } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'locked';
}

export interface Chapter {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  lessons: Lesson[];
}

export function CourseChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <div className=" custom-surface rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-primary">
      <div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Chapter {chapter.id}
            </span>
            <h2 className="text-lg font-bold  tracking-tight mt-0.5">{chapter.title}</h2>
          </div>

          {chapter.status === 'completed' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Done <Check className="w-3 h-3" />
            </span>
          )}
          {chapter.status === 'in-progress' && (
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              In Progress
            </span>
          )}
          {chapter.status === 'upcoming' && (
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Upcoming
            </span>
          )}
        </div>

        <div className="space-y-3">
          {chapter.lessons.map((lesson, index) => {
            const isCompleted = lesson.status === 'completed';
            const isInProgress = lesson.status === 'in-progress';
            const isLocked = lesson.status === 'locked';

            return (
              <div
                key={lesson.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${isInProgress
                  ? 'bg-primary/5 border-cyan-500/10 shadow-md shadow-indigo-950/20'
                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-cyan-500/10'
                  } ${isLocked ? 'opacity-40' : 'opacity-100'}`}
              >
                <div className="flex items-center gap-3.5">
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  {isInProgress && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-indigo-400 animate-pulse">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </div>
                  )}
                  {isLocked && (
                    <div
                      className="
      w-6 h-6 rounded-full
      bg-slate-200 dark:bg-slate-800
      border border-slate-300 dark:border-slate-700
      text-slate-700 dark:text-slate-200
      flex items-center justify-center
      font-semibold text-xs
    "
                    >
                      {index + 1}
                    </div>
                  )}


                  <div>
                    <h3 className={`text-sm font-semibold tracking-tight ${isInProgress ? 'text-blue-400' : 'dark:text-slate-200 text-slateText'}`}>
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {lesson.duration} {isInProgress && '· In Progress'} {isLocked && '· Locked'}
                    </p>
                  </div>
                </div>


                <div>
                  {isCompleted && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  {isInProgress && (
                    <button className="text-xs font-semibold bg-primary-gradient text-black px-3 py-1.5 rounded-lg shadow shadow-indigo-600/30 transition-all">
                      Resume
                    </button>
                  )}
                  {isLocked && <Lock className="w-4 h-4 text-slate-600" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}