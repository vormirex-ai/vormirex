import * as React from "react";
import { useFormik } from "formik";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useGetSubjectsQuery } from "@/store/api/subjectsApi";
import { useCreateTaskMutation } from "@/store/api/studyPlannerApi";
import { FaPlus } from "react-icons/fa6";
import TagsSelector from "@/components/common/add-task/tag-selector";
import SubjectSelect from "@/components/common/add-task/subject-select";
import TaskTypeSelect from "@/components/common/add-task/task-type-select";
import PrioritySelector from "@/components/common/add-task/priority-selector";
import DatePicker from "@/components/common/add-task/task-date-picker";
import { studyPlannerFormSchema } from "../../common/add-task-form.schema";



const quickTags = [
  "Exam",
  "Revision",
  "Coding",
  "Notes",
  "Quiz",
  "Lab",
  "Reading",
];

export function StudyPlannerTaskModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const { data: subjectsData } = useGetSubjectsQuery({ page: 1, limit: 100 });
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      subject: "",
      taskType: "",
      description: "",
      date: "",
      priority: "medium",
      durationType: "30",
      customMinutes: "",
    },
    validationSchema: studyPlannerFormSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const durationMinutes =
          values.durationType === "custom"
            ? Number(values.customMinutes)
            : Number(values.durationType);

        const payload = {
          title: values.title,
          description: values.description,
          taskType: values.taskType,
          subjectId: values.subject,
          priority: values.priority,
          tags: selectedTags,
          durationMinutes,
          status: "upcoming",
          ...(values.date ? { date: values.date } : {}),
        };
        const response = await createTask(payload).unwrap();
        toast.success("Task created successfully");

        resetForm();
        setSelectedTags([]);
        setOpen(false);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create task");
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex rounded-lg gap-2">
          <FaPlus /> Add Study Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl rounded-3xl max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#43fff433,transparent_45%)]" />
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">
                Study Plan Task
              </DialogTitle>
              <DialogDescription>
                Create a task and stay on track with your studies.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-textColor">
              Task Title
              <span className="text-red-500">*</span>
            </label>

            <Input
              name="title"
              placeholder="Enter task title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.title && formik.errors.title
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />

            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-xs text-red-400">{formik.errors.title}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
       <SubjectSelect formik={formik} />
            <TaskTypeSelect formik={formik} />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-textColor">
              Description
              <span className="text-red-500">*</span>
            </label>

            <Textarea
              rows={4}
              name="description"
              placeholder="Briefly describe your task"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.description && formik.errors.description
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />

            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-xs text-red-400">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <PrioritySelector
              value={formik.values.priority}
              onChange={(value) => formik.setFieldValue("priority", value)}
            />

            <DatePicker
              label="Date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 rounded-2xl custom-surface p-1">
            {[
              { label: "15m", value: "15" },
              { label: "30m", value: "30" },
              { label: "1h", value: "60" },
              { label: "Custom", value: "custom" },
            ].map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => formik.setFieldValue("durationType", item.value)}
                className={`h-10 rounded-xl text-xs transition-all
      ${
        formik.values.durationType === item.value
          ? "bg-primary-gradient text-black"
          : "text-textColor"
      }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {formik.values.durationType === "custom" && (
            <div className="mt-2">
              <label className="text-xs text-textColor">
                Custom Duration (minutes)
              </label>

              <Input
                type="number"
                placeholder="e.g. 90"
                value={formik.values.customMinutes}
                onChange={(e) =>
                  formik.setFieldValue("customMinutes", e.target.value)
                }
                className="custom-surface mt-1"
              />

              {formik.touched.customMinutes && formik.errors.customMinutes && (
                <p className="text-xs text-red-400">
                  {formik.errors.customMinutes}
                </p>
              )}
            </div>
          )}
          <TagsSelector
            selectedTags={selectedTags}
            quickTags={quickTags}
            toggleTag={toggleTag}
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isLoading ||
                !formik.isValid ||
                !formik.values.title ||
                !formik.values.subject ||
                !formik.values.taskType ||
                !formik.values.description
              }
              className="min-w-[140px]"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
