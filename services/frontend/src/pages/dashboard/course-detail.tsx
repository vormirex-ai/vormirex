import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { RootState } from "@/store/store";

import { containerStagger, fadeUpItem } from "@/lib/motion";
import {
  normalizeChapterStatus,
  normalizeLessonStatus,
} from "@/lib/statusNormalizer";

import { CourseChapterCard } from "@/components/dashboard/course-details/chapter-card";
import { CourseHeader } from "@/components/dashboard/course-details/course-header";
import { CourseDetailsSkeleton } from "@/components/skeleton/course-details-skeleton";

import { useGetSubjectCurriculumQuery } from "@/store/api/subjectsApi";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const reduxId = useSelector(
    (state: RootState) =>
      state.subject.selectedSubjectId
  );

  const subjectId = id || reduxId;

  const {
    data: response,
    isLoading: loading,
    isError,
  } = useGetSubjectCurriculumQuery(subjectId!, {
    skip: !subjectId,
  });

  const curriculum = response?.data;

  if (loading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || !curriculum) {
    return (
      <div className="min-h-screen flex items-center justify-center text-textColor">
        Failed to load curriculum
      </div>
    );
  }

  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div className="mx-auto space-y-10">

        <button
          onClick={() => navigate("/dashboard/subjects")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Subjects
        </button>

        <motion.div variants={fadeUpItem}>
          <CourseHeader
            title={curriculum?.subject?.title}
            icon={curriculum?.subject?.icon}
            progress={
              curriculum?.overallProgress?.percentage || 0
            }
            description={
              curriculum?.subject?.description
            }
            stats={{
              lessons:
                curriculum?.overallProgress
                  ?.totalLessons || 0,

              duration: `${curriculum?.overallProgress
                ?.studyTimeHours || 0
                }h`,

              quizzes:
                curriculum?.chapters?.length || 0,

              hasCertificate:
                curriculum?.subject
                  ?.hasCertificate,
            }}
            id={curriculum?.subject?.id}
          />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

            {curriculum?.chapters?.map(
              (chapter: any) => (
                <CourseChapterCard
                  key={chapter._id}
                  chapter={{
                    id: chapter.sequenceOrder,
                    title: chapter.title,
                    status:
                      normalizeChapterStatus(
                        chapter.status
                      ),

                    lessons:
                      chapter.lessons?.map(
                        (lesson: any) => ({
                          id: lesson._id,
                          title: lesson.title,
                          duration: `${lesson.durationMinutes} min`,
                          status:
                            normalizeLessonStatus(
                              lesson.status
                            ),
                        })
                      ),
                  }}
                />
              )
            )}

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseDetails;