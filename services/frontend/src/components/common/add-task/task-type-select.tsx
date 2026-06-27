import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  formik: any;
};

const taskTypes = [
  { label: "Practice", value: "practice" },
  { label: "Revision", value: "revision" },
  { label: "Coding", value: "coding" },
  { label: "Reading", value: "reading" },
  { label: "Notes", value: "notes" },
  { label: "Lab", value: "lab" },
  { label: "Quiz", value: "quiz" },
  { label: "Exam", value: "exam" },
];

const TaskTypeSelect = ({ formik }: Props) => {
  const selectedType = taskTypes.find(
    (item) => item.value === formik.values.taskType
  );

  return (
    <div>
      <label className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-textColor">
        Task Type <span className="text-red-500">*</span>
      </label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={`h-10 w-full rounded-lg custom-surface px-3 flex items-center justify-between ${
              formik.touched.taskType && formik.errors.taskType
                ? "border border-red-500"
                : ""
            }`}
          >
            <span className="truncate">
              {selectedType?.label || "Select task type"}
            </span>

            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-52 overflow-y-auto custom-scrollbar"
        >
          {taskTypes.map((type) => (
            <DropdownMenuItem
              key={type.value}
              onClick={() =>
                formik.setFieldValue("taskType", type.value)
              }
              className={`cursor-pointer ${
                formik.values.taskType === type.value
                  ? "bg-primary text-black"
                  : ""
              }`}
            >
              {type.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {formik.touched.taskType && formik.errors.taskType && (
        <p className="mt-1 text-xs text-red-400">
          {formik.errors.taskType}
        </p>
      )}
    </div>
  );
};

export default TaskTypeSelect;