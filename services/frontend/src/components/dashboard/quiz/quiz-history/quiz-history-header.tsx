import { History } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isSubjectView: boolean;
  selectedSubject: string;
  subjects: any[];
  handleSubjectChange: (
    value: string
  ) => void;
}

export default function HistoryHeader({
  isSubjectView,
  selectedSubject,
  subjects,
  handleSubjectChange,
}: Props) {
  const getSubjectName = (
    subjectId: string
  ) => {
    const found = subjects.find(
      (s: any) => s._id === subjectId
    );

    return found?.title || "Unknown Subject";
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 dark:text-primary text-primary-500 shadow-lg shadow-primary/10">
          <History className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quiz History
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your quiz performance &
            learning progress
          </p>
        </div>
      </div>


      {!isSubjectView ? (
        <Select
          value={selectedSubject}
          onValueChange={handleSubjectChange}
        >
          <SelectTrigger className=" min-w-[240px] border border-border bg-card px-4 text-sm font-medium shadow-sm transition-all duration-300 hover:border-primary/40 focus:ring-2 focus:ring-primary/20">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>

          <SelectContent className=" border border-border bg-card backdrop-blur-xl mt-8">
            <SelectItem
              value="all"
              className=" focus:bg-primary focus:text-primary-foreground"
            >
              All Subjects
            </SelectItem>

            {subjects.map((subject: any) => (
              <SelectItem
                key={subject._id}
                value={subject._id}
                className=" focus:bg-primary hover:cursor-pointer focus:text-primary-foreground"
              >
                {subject.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium dark:text-primary text-primary-500 rounded-full">
          <History className="h-4 w-4" />
          {getSubjectName(selectedSubject)}
        </div>
      )}
    </div>
  );
}