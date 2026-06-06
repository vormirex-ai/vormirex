import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { SubjectCard } from "@/components/dashboard/subjects/subject-cards";
import { SubjectHeader } from "@/components/dashboard/subjects/subject-header";
import { PaginationWithLinks } from "@/components/pagination-with-link";
import { useGetSubjectsQuery } from "@/store/api/subjectsApi";
import { Subject } from "@/interface/subject.interface";
import { SubjectSkeletonCard } from "@/components/skeleton/SubjectSkeletonCard";

export default function SubjectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const activeTab = searchParams.get("tab") || "All Subjects";
  const search = searchParams.get("search") || "";

  const { data, isLoading: loading } = useGetSubjectsQuery({ page, limit: pageSize });
  const subjects: Subject[] = data?.subjects || [];
  const totalCount = data?.total || 0;

  const filteredSubjects = subjects.filter((subject: Subject) => {
    const matchSearch =
      subject.title.toLowerCase().includes(search.toLowerCase()) ||
      subject.description?.toLowerCase().includes(search.toLowerCase()) ||
      subject.tags?.some((tag: string) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchTab =
      activeTab === "All Subjects"
        ? true
        : activeTab === "In Progress"
          ? subject.userStatus === "in_progress"
          : subject.userStatus === "completed";

    return matchSearch && matchTab;
  });

  const handleTabChange = (tab: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", tab);
      params.set("page", "1");
      return params;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("search", value);
      params.set("page", "1");
      return params;
    });
  };

  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <SubjectHeader
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            search={search}
            setSearch={handleSearchChange}
          />
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SubjectSkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>

            <motion.div
              variants={containerStagger(0.12)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredSubjects.map((subject: Subject) => (
                <motion.div key={subject._id} variants={fadeUpItem}>
                  <SubjectCard
                    _id={subject._id}
                    title={subject.title}
                    icon={subject.icon}
                    topics={subject.totalLessons}
                    lessons={subject.lessonsDone}
                    progress={subject.progressPercentage}
                    timeStudied={`${Math.floor(
                      subject.totalStudyTimeSeconds / 3600
                    )}h`}
                    status={subject.userStatus}
                    color={subject.isPro ? "#ec4899" : "#6366f1"}
                    description={subject.description}
                    subtitle={subject.subtitle}
                    isPro={subject.isPro}
                    price={subject.price}
                    tags={subject.tags}
                    hasCertificate={subject.hasCertificate}
                  />
                </motion.div>
              ))}
            </motion.div>


            {filteredSubjects.length === 0 && (
              <div className="text-center py-10 text-textColor">
                No subjects found
              </div>
            )}


            {totalCount > pageSize && (
              <PaginationWithLinks
                page={page}
                pageSize={pageSize}
                totalCount={totalCount}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}