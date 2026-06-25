import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Upload } from "lucide-react";
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
import { uploadNoteSchema } from "./upload-note.schema";

import { useCreateNoteMutation } from "@/store/api/notesApi";
import SubjectSelect from "@/components/common/add-task/subject-select";

export function UploadNoteDialog() {
  const [open, setOpen] = useState(false);
  const [createNote, { isLoading }] = useCreateNoteMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      subjectId: "",
      subjectName: "",
      file: null as File | null,
    },

    validationSchema: uploadNoteSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("subjectId", values.subjectId);
        formData.append("subjectName", values.subjectName);
        if (values.file) {
         formData.append("file", values.file);
        }

        const response = await createNote(formData).unwrap();

        toast.success("Note uploaded successfully");

        formik.resetForm();
        setOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload note");
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Note
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto custom-scrollbar">
  <DialogHeader className="items-center text-center">
 

 <DialogTitle className="flex items-center justify-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
    <Upload className="h-5 w-5 text-primary" />
  </div>

  <span>Upload Note</span>
</DialogTitle>

  <DialogDescription>
    Upload your study notes, PDFs, and learning materials to keep them organized and easily accessible.
  </DialogDescription>
</DialogHeader>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#43fff433,transparent_45%)]" />
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>

            <Input
              id="title"
              name="title"
              placeholder="Enter note title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.title && formik.errors.title
                  ? ""
                  : ""
              }
            />

            {formik.touched.title && formik.errors.title && (
              <p className="text-xs text-red-500
              ">{formik.errors.title}</p>
            )}
          </div>

          <SubjectSelect formik={formik} />

          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-red-500"> * </span>
            </Label>

            <Textarea
              id="content"
              name="content"
              placeholder="Write note content..."
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`min-h-[120px] custom-scrollbar custom-surface ${
                formik.touched.content && formik.errors.content
                  ? "border-destructive"
                  : ""
              }`}
            />

            {formik.touched.content && formik.errors.content && (
              <p className="text-xs text-red-500">
                {formik.errors.content}
              </p>
            )}
          </div>

          <div className="space-y-2 mb-5">
            <Label htmlFor="file">
              PDF File 
            </Label>

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

            <Label
              htmlFor="file"
              className="flex h-10 cursor-pointer items-center justify-center rounded-md  custom-surface"
            >
              {formik.values.file ? formik.values.file.name : "Choose PDF"}
            </Label>
          </div>

          <Button type="submit" className="w-full rounded-lg" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Note"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
