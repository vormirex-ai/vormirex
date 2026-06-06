import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, KeyRound } from "lucide-react";
import { RiSendPlaneFill } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading: loading }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await forgotPassword({ email: values.email }).unwrap();
        if (response?.success) {
          toast.success("Reset link sent to email 📩");
          resetForm();
        } else {
          toast.error(response?.message || "Something went wrong ❌");
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message || error?.message || "Something went wrong ❌"
        );
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020817] px-4">
      <Card className="w-full max-w-md bg-[#051522] backdrop-blur-xl text-white shadow-[0_0_40px_rgba(56,189,248,0.15)] p-2 md:p-6">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 cursor-pointer my-5">
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <span className="font-bold text-xl tracking-tight bg-primary bg-clip-text text-transparent">
              VORMIREX
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#1a2235] p-3 rounded-xl border border-white/10 shadow-inner mb-4">
              <KeyRound className="w-6 h-6 text-yellow-400" />
            </div>

            <CardTitle className="text-2xl font-bold tracking-tight">
              Reset password
            </CardTitle>

            <CardDescription className="text-gray-400 text-sm mt-2 mb-4">
              Enter your email and we'll send a reset link to your inbox.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-400">
                Email address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="user@example.com"
                  className="bg-white/5 border-white/10 pl-10 py-6"
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="py-6 text-lg w-full cursor-pointer"
            >
              <RiSendPlaneFill className="mr-2 h-4 w-4" />
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Footer link */}
          <p className="text-sm text-gray-500 text-center">
            Remembered it?{" "}
            <Link to="/login" className="text-blue-400 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;