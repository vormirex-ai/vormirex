// components/task-queue/task-form-modal.tsx

"use client";

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

import {
  CalendarDays,
  Sparkles,
  Plus,
  Minus,
  X,
} from "lucide-react";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Task title is required"),

  subject: Yup.string().required("Subject is required"),

  taskType: Yup.string().required("Task type is required"),

  description: Yup.string()
    .min(10, "Minimum 10 characters")
    .required("Description is required"),
});

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

  const [pomodoros, setPomodoros] = React.useState(2);
  const [priority, setPriority] = React.useState("Medium");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(["Math"]);

  const formik = useFormik({
    initialValues: {
      title: "",
      subject: "",
      taskType: "",
      description: "",
      dueDate: "",
    },

    validationSchema,

    onSubmit: (values) => {
      const payload = {
        ...values,
        pomodoros,
        priority,
        tags: selectedTags,
      };

      console.log(payload);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 ">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" backdrop-blur-2x sm:max-w-2xl rounded-3x overflow-hidde shadow-[0_0_80px_rgba(64,255,233,0.18)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#43fff433,transparent_45%)]" />

        <DialogHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                flex h-11 w-11 items-center justify-center
                rounded-xl
                bg-primary/20
                border border-primary/20
                shadow-[0_0_25px_rgba(99,231,220,0.45)]
              "
              >
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
          </div>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="relative z-10 mt-2 space-y-5"
        >
          {/* Task Title */}
          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
              Task Title
            </label>

            <Input
              name="title"
              placeholder="Enter task title"
              value={formik.values.title}
              onChange={formik.handleChange} />

            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-xs text-red-400">
                {formik.errors.title}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
                Subject
              </label>

              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("subject", value)
                }
              >
                <SelectTrigger
                  className="
                 h-13 rounded-lg
                   custom-surface w-full
                  "
                >
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
                Task Type
              </label>

              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("taskType", value)
                }
              >
                <SelectTrigger
                  className="
                    h-13 rounded-lg
                   custom-surface w-full
                  "
                >
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Practice">Practice</SelectItem>
                  <SelectItem value="Revision">Revision</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
              Description
            </label>

            <Textarea
              rows={4}
              name="description"
              placeholder="Briefly describe your task"
              value={formik.values.description}
              onChange={formik.handleChange} />

            {formik.touched.description &&
              formik.errors.description && (
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

              <div
                className="
                flex h-10 items-center justify-between custom-surface
                rounded-lg  px-3
              "
              >
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setPomodoros((prev) =>
                      prev > 1 ? prev - 1 : 1
                    )
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="text-center">
                  <p className="text-xl font-bold">
                    {pomodoros}
                  </p>

                  <span className="text-xs text-textColor">
                    50 min
                  </span>
                </div>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setPomodoros((prev) => prev + 1)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
                Due Date
              </label>

              <div className="relative">
                <Input
                  type="date"
                  name="dueDate"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                />

                <CalendarDays className="absolute right-3 top-3.5 h-4 w-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-textColor">
              Priority
            </label>

            <div
              className=" grid grid-cols-3 gap-2 rounded-2xl custom-surface p-1"
            >
              {["Low", "Medium", "High"].map((item, index) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setPriority(item)}
                  className={`
                    h-10 rounded-xl text-sm transition-all
                    ${priority === item
                      ? "bg-primary-gradient text-black shadow-[0_0_30px_rgba(99,231,220,0.5)]"
                      : "text-textColor hover:text-primary-500 "
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-xs uppercase tracking-wider text-textColor">
              Tags
            </label>

            <div className="mb-3 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  className=" rounded-full bg-primary/20 text-primary custom-surface px-3 py-1"
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
                  className=" rounded-full custom-surface  px-3 py-1.5 text-xs  transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary
                  "
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="hover:border hover:border-primary">
              Cancel
            </Button>

            <Button
              type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}