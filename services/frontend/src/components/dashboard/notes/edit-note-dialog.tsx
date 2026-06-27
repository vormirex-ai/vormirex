import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import SubjectSelect from "@/components/common/add-task/subject-select";
import { uploadNoteSchema } from "./upload-note.schema";
import { useUpdateNoteMutation } from "@/store/api/notesApi";

export function EditNotesDialog({ notesData }: any) {
  const [open, setOpen] = useState(false);
  const [updateNote, { isLoading }] = useUpdateNoteMutation();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: notesData?.title || "",
      content: notesData?.content || "",
      subjectId: notesData?.subjectId || "",
      subjectName: notesData?.subjectName || "",

      file: null as File | null,
      existingFileUrl: notesData?.fileUrl || "",

      isBookmarked: notesData?.isBookmarked || false,
    },

    validationSchema: uploadNoteSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("subjectId", values.subjectId);
        formData.append("subjectName", values.subjectName);
        formData.append("isBookmarked", String(values.isBookmarked));

        if (values.file) {
          formData.append("file", values.file);
        }
        for (const pair of formData.entries()) {
          //   console.log(pair[0], pair[1]);
        }
        const response = await updateNote({
          id: notesData._id,
          body: formData,
        }).unwrap();

        toast.success("Note updated successfully");
        setOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to update note");
      }
    },
  });

  const isUnchanged =
  JSON.stringify(formik.values) === JSON.stringify(formik.initialValues);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 rounded-lg">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto custom-scrollbar">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Pencil className="h-5 w-5 text-primary" />
            </div>
            <span>Update Note</span>
          </DialogTitle>

          <DialogDescription>
            Edit your note details, update the content, or replace the uploaded
            file.
          </DialogDescription>
        </DialogHeader>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#43fff433,transparent_45%)]" />
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>

          <SubjectSelect formik={formik} />

          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              className="min-h-[120px] custom-surface custom-scrollbar"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Add to Bookmarks</Label>

              <Switch
                checked={formik.values.isBookmarked}
                onCheckedChange={(val) =>
                  formik.setFieldValue("isBookmarked", val)
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>PDF File</Label>
              </div>

              <Input
                id="file"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0] || null;
                  formik.setFieldValue("file", file);
                }}
              />
              <div className="flex gap-2">
                {formik.values.existingFileUrl && (
                  <a
                    href={formik.values.existingFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-sm hover:underline mt-2"
                  >
                    View PDF
                  </a>
                )}
                <Label
                  htmlFor="file"
                  className="flex h-10 cursor-pointer items-center justify-center rounded-md custom-surface text-sm px-2"
                >
                  {formik.values.file
                    ? `New: ${formik.values.file.name}`
                    : "Replace PDF (optional)"}
                </Label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || isUnchanged}
            className="w-full rounded-lg"
          >
            {isLoading ? "Updating..." : "Update Note"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
