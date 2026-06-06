import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { CourseChapterCard } from '@/components/dashboard/course-details/chapter-card'
import { CourseHeader } from '@/components/dashboard/course-details/course-header'
import { chaptersData } from '@/components/data/course-mock-data'
import { ArrowLeft } from 'lucide-react'
import { useGetSubjectDetailsQuery } from "@/store/api/subjectsApi";

const CourseDetails = () => {

  const { id } = useParams();
  const reduxId = useSelector(
    (state: any) => state.subject.selectedSubjectId
  );

  const subjectId = id || reduxId;
  const { data: subjectDetails, isLoading: loading } = useGetSubjectDetailsQuery(subjectId, {
    skip: !subjectId,
  });
  const subjectData = subjectDetails?.data;


  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div className=" mx-auto space-y-10">

        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Subjects
        </button>
        <motion.div variants={fadeUpItem}>
          <CourseHeader
            title="Mathematics"
            progress={72}
            description="Master calculus, algebra, statistics and more with AI-guided explanations and practice problems."
            stats={{
              lessons: 156,
              duration: "~42 hours",
              quizzes: 5,
              hasCertificate: true
            }}
            id={subjectData?.id}
          />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {chaptersData.map((chapter) => (
              <CourseChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CourseDetails

