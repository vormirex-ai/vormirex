import * as yup from "yup";

export const uploadNoteSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string(),
  subjectId: yup.string().required("Subject is required"),
  subjectName: yup.string().required("Subject name is required"),
file: yup.mixed<File>().nullable(),
});