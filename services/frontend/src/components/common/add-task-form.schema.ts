import * as Yup from "yup";

export const focusTimerFormSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Task title is required"),
  subject: Yup.string().required("Subject is required"),
  taskType: Yup.string().required("Task type is required"),
  description: Yup.string()
    .min(10, "Minimum 10 characters")
    .required("Description is required"),
});


export const studyPlannerFormSchema = Yup.object({
  title: Yup.string().min(3).required("Task title is required"),
  subject: Yup.string().required("Subject is required"),
  taskType: Yup.string().required("Task type is required"),
  description: Yup.string().min(10).required("Description is required"),
  priority: Yup.string().oneOf(["low", "medium", "high"]).required(),
  durationType: Yup.string().required(),
  customMinutes: Yup.number().when("durationType", {
    is: "custom",
    then: (schema) =>
      schema
        .typeError("Enter valid minutes")
        .required("Custom duration is required")
        .integer("Only whole numbers are allowed")
        .min(5, "Minimum 5 minutes"),
  }),
});