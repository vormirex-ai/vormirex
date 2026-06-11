import { SubjectSkeletonCard } from "@/components/skeleton/SubjectSkeletonCard";
import SelectableCard from "./onboardingCard";
import { useGetSubjectsQuery } from "@/store/api/subjectsApi";

const StepSubjects = ({ formData, updateFormData }: any) => {
  const { data, isLoading, isError } =
    useGetSubjectsQuery({ page: 1, limit: 20 });

  const subjects = data?.subjects || data?.data || [];

  const toggleSubject = (subjectId: string) => {
    const updated = formData.subjects.includes(subjectId)
      ? formData.subjects.filter((s: string) => s !== subjectId)
      : [...formData.subjects, subjectId];

    updateFormData({ subjects: updated });
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(4)].map((_, index) => (
          <SubjectSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-400">
        Failed to load subjects
      </div>
    );
  }

  return (
    <div className="min-h-[420px] max-h-[470px] overflow-y-auto pr-2 custom-scrollbar">
      <h2 className="text-2xl font-bold">
        Select subjects 📚
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {subjects.map((subject: any) => (
          <SelectableCard
            key={subject._id}
            title={subject.title}
            icon={subject.icon}
            selected={formData.subjects.includes(subject._id)}
            onClick={() => toggleSubject(subject._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default StepSubjects;