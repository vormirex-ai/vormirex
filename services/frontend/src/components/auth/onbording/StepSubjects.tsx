import { subjects } from "@/components/data/onboardingData";
import SelectableCard from "./onboardingCard";


const StepSubjects = ({ formData, updateFormData }: any) => {

  const toggleSubject = (subject: string) => {
    const updated = formData.subjects.includes(subject)
      ? formData.subjects.filter((s: string) => s !== subject)
      : [...formData.subjects, subject];

    updateFormData({ subjects: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white">
        Select subjects 📚
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {subjects.map((subject) => (
          <SelectableCard
            key={subject.title}
            title={subject.title}
            icon={subject.icon}
            selected={formData.subjects.includes(subject.title)}
            onClick={() => toggleSubject(subject.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default StepSubjects;