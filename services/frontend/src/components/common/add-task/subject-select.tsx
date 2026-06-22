import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  formik: any;
  subjectsData: any;
};

const SubjectSelect = ({ formik, subjectsData }: Props) => {
  const selectedSubject = subjectsData?.subjects?.find(
    (item: any) => item._id === formik.values.subject
  );

  return (
    <div>
      <label className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-textColor">
        Subject <span className="text-red-500">*</span>
      </label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={`h-10 w-full rounded-lg custom-surface px-3 flex items-center justify-between ${
              formik.touched.subject && formik.errors.subject
                ? "border border-red-500"
                : ""
            }`}
          >
            <span className="truncate">
              {selectedSubject?.title || "Select subject"}
            </span>

            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-52 overflow-y-auto custom-scrollbar"
        >
          {subjectsData?.subjects?.map((subject: any) => (
            <DropdownMenuItem
              key={subject._id}
              onClick={() =>
                formik.setFieldValue("subject", subject._id)
              }
              className={`cursor-pointer ${
                formik.values.subject === subject._id
                  ? "bg-primary text-black"
                  : ""
              }`}
            >
              {subject.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {formik.touched.subject && formik.errors.subject && (
        <p className="mt-1 text-xs text-red-400">
          {formik.errors.subject}
        </p>
      )}
    </div>
  );
};

export default SubjectSelect;