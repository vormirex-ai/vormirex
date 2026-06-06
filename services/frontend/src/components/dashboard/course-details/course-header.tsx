import { useNavigate } from "react-router";
import { Play, BookOpen, Clock, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomProgress } from '@/components/common/custom-progress';
import { useGetSubjectContinueQuery } from '@/store/api/subjectsApi';


interface CourseHeaderProps {
  title: string;
  progress: number;
  description: string;
  stats: {
    lessons: number;
    duration: string;
    quizzes: number;
    hasCertificate: boolean;
  };
  id?: string;
}

export function CourseHeader({ title, progress, description, stats, id }: CourseHeaderProps) {
  const navigate = useNavigate();
  const { data: continueData } = useGetSubjectContinueQuery(id, { skip: !id });
  const lessonId = continueData?.data?.lessonId;



  return (
    <div className="relative overflow-hidden custom-surface rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-3">

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-inner flex items-center justify-center">
            <div className="w-8 h-8 flex items-center justify-center font-bold text-amber-400 border-2 border-amber-400 rounded-md transform -rotate-12">
              📐
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                In Progress
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Pro
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs md:text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-500" /> {stats.lessons} lessons</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-500" /> {stats.duration}</span>
          <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-slate-500" /> {stats.quizzes} quizzes</span>
          {stats.hasCertificate && (
            <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-slate-500" /> Completion certificate</span>
          )}
        </div>
      </div>

      <div className="w-full md:w-auto flex md:flex-col items-end justify-between md:justify-center gap-4 border-t border-slate-800/60 md:border-0 pt-4 md:pt-0">
        <div className="text-right">
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight bg-primary-gradient  bg-clip-text text-transparent">
            {progress}%
          </span>
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Complete</p>
        </div>

        <Button
          onClick={() => {
            if (!lessonId) {
              console.warn("Lesson ID not found yet");
              return;
            }

            navigate(`/dashboard/video-learning/${lessonId}`);
          }}
          className="flex items-center gap-2 rounded-xl"
        >
          Continue
        </Button>
      </div>

      <CustomProgress
        value={progress}
        className=" absolute bottom-4 left-2 right-0 h-2 "
        indicatorClassName="bg-primary-gradient"
      />
    </div>
  );
}