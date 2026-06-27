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
import { Sparkles, Plus, Minus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetSubjectsQuery } from "@/store/api/subjectsApi";
import { useCreateFocusTaskMutation } from "@/store/api/focusApi";
import SubjectSelect from "@/components/common/add-task/subject-select";
import TaskTypeSelect from "@/components/common/add-task/task-type-select";
import TagsSelector from "@/components/common/add-task/tag-selector";
import PrioritySelector from "@/components/common/add-task/priority-selector";
import DatePicker from "@/components/common/add-task/task-date-picker";
import { focusTimerFormSchema } from "../../common/add-task-form.schema";

const quickTags = [
  "Exam",
  "Revision",
  "Coding",
  "Notes",
  "Quiz",
  "Lab",
  "Reading",
];

export function TaskFormModal() {
  const [open, setOpen] = React.useState(false);
  const [pomodoros, setPomodoros] = React.useState(2);
  const [priority, setPriority] = React.useState("medium");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const { data: subjectsData } = useGetSubjectsQuery({ page: 1, limit: 100 });

  const [createFocusTask, { isLoading }] = useCreateFocusTaskMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      subject: "",
      taskType: "",
      description: "",
      dueDate: "",
    },

    validationSchema : focusTimerFormSchema,
    validateOnMount: true,

    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          title: values.title,
          subjectId: values.subject,
          taskType: values.taskType,
          description: values.description,
          dueDate: values.dueDate || undefined,
          estimatedPomodoros: pomodoros,
          priority,
          tags: selectedTags,
        };

        const response = await createFocusTask(payload).unwrap();
        toast.success("Task created successfully");
        resetForm();
        setPomodoros(2);
        setPriority("medium");
        setSelectedTags([]);
        setOpen(false);
      } catch (error: any) {
        console.error("CREATE TASK ERROR =>", error);
        toast.error(error?.data?.message || "Failed to create task");
      }
    },
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add
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
                {" "}
                Add Task to Queue
              </DialogTitle>
              <DialogDescription>
                Plan your next focused study session
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="relative z-10 mt-2 space-y-5"
        >
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

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
                Estimated Pomodoros
              </label>

              <div className="flex h-10 items-center justify-between custom-surface rounded-lg px-3">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setPomodoros((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="text-center">
                  <p className="text-xl font-bold">{pomodoros}</p>
                </div>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setPomodoros((prev) => prev + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DatePicker
              label="Due Date"
              name="dueDate"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
            />
          </div>
          <PrioritySelector value={priority} onChange={setPriority} />

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
