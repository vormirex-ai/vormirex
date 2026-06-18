import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { CalendarDays, Sparkles, Plus, Minus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetSubjectsQuery } from "@/store/api/subjectsApi";
import { useCreateFocusTaskMutation } from "@/store/api/focusApi";

const validationSchema = Yup.object({
  title: Yup.string().min(3, "Minimum 3 characters").required("Task title is required"),
  subject: Yup.string().required("Subject is required"),
  taskType: Yup.string().required("Task type is required"),
  description: Yup.string()
    .min(10, "Minimum 10 characters")
    .required("Description is required"),
});

const quickTags = ["Exam","Revision","Coding","Notes","Quiz","Lab","Reading",];

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

    validationSchema,
    validateOnMount: true,

    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          title: values.title,
          subject: values.subject,
          taskType: values.taskType,
          description: values.description,
          dueDate: values.dueDate || undefined,
          estimatedPomodoros: pomodoros,
          priority,
          tags: selectedTags,
        };

        console.log("TASK PAYLOAD =>", payload);

        const response = await createFocusTask(payload).unwrap();
        console.log("CREATE TASK RESPONSE =>", response);
        toast.success("Task created successfully");
        resetForm();
        setPomodoros(2);
        setPriority("medium");
        setSelectedTags([]);
        setOpen(false);
      } catch (error: any) {
        console.log("CREATE TASK ERROR =>", error);
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

      <DialogContent className="sm:max-w-2xl rounded-3xl max-h-[600px] overflow-y-auto custom-scrollbar"   onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#43fff433,transparent_45%)]" />

        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>

            <div>
              <DialogTitle className="text-xl font-semibold">
                Add Task to Queue
              </DialogTitle>

              <DialogDescription className="text-textColor">
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

          {/* SUBJECT + TASK TYPE */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-textColor">
                Subject
                <span className="text-red-500">*</span>
              </label>

              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("subject", value)
                }
              >
                <SelectTrigger
                  className={`h-13 rounded-lg custom-surface w-full ${
                    formik.touched.subject && formik.errors.subject
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px] overflow-y-auto custom-scrollbar">
                  {subjectsData?.subjects?.map((subject: any) => (
                    <SelectItem key={subject._id} value={subject._id}>
                      {subject.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formik.touched.subject && formik.errors.subject && (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.subject}
                </p>
              )}
            </div>

            {/* TASK TYPE */}
            <div>
              <label className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-textColor">
                Task Type
                <span className="text-red-500">*</span>
              </label>

              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("taskType", value)
                }
              >
                <SelectTrigger
                  className={`h-13 rounded-lg custom-surface w-full ${
                    formik.touched.taskType && formik.errors.taskType
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px] overflow-y-auto custom-scrollbar">
                  <SelectItem value="practice">Practice</SelectItem>
                  <SelectItem value="revision">Revision</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="lab">Lab</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                </SelectContent>
              </Select>

              {formik.touched.taskType && formik.errors.taskType && (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.taskType}
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
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

          {/* POMODOROS + DATE */}
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

       <div>
  <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
    Due Date
  </label>

<Input
  type="date"
  name="dueDate"
  value={formik.values.dueDate}
  onChange={formik.handleChange}
  onClick={(e) => {
    (e.currentTarget as HTMLInputElement).showPicker?.();
  }}
  className="
    h-12 custom-surface
    cursor-pointer
    [&::-webkit-calendar-picker-indicator]:cursor-pointer
    [&::-webkit-calendar-picker-indicator]:opacity-100
    [&::-webkit-calendar-picker-indicator]:invert
  "
/>
</div>
          </div>

          {/* PRIORITY */}
          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
              Priority
            </label>

            <div className="grid grid-cols-3 gap-2 rounded-2xl custom-surface p-1">
              {["low", "medium", "high"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setPriority(item)}
                  className={`h-10 rounded-xl text-sm transition-all capitalize
                    ${
                      priority === item
                        ? "bg-primary-gradient text-black"
                        : "text-textColor"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* TAGS */}
          <div>
            <label className="mb-3 block text-xs uppercase tracking-wider text-textColor">
              Tags
            </label>

            <div className="mb-3 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  className="rounded-full bg-primary/20 text-primary px-3 py-1"
                >
                  {tag}

                  <X
                    onClick={() => toggleTag(tag)}
                    className="ml-2 h-3 w-3 cursor-pointer"
                  />
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="rounded-full custom-surface px-3 py-1.5 text-xs hover:bg-primary/10"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
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



