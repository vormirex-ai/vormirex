import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import {
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/store/api/authApi";
import logo from "../../assets/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      if (!token) {
        toast.error("Invalid or expired reset link");
        return;
      }

      try {
        const response = await resetPassword({ token, password: values.password }).unwrap();

        if (response?.success) {
          toast.success("Password reset successful ✅");
          navigate("/login");
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

  const passwordsMatch =
    formik.values.password &&
    formik.values.confirmPassword &&
    !formik.errors.confirmPassword &&
    !formik.errors.password;

  const passwordsNotMatch =
    formik.values.confirmPassword &&
    (formik.errors.confirmPassword || formik.values.password !== formik.values.confirmPassword);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
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
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Create New Password
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm mt-2 mb-4 text-center">
              Enter your new password below to secure your account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-400">
                New Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white/5 border-white/10 pl-10 pr-10 py-6"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-400">
                Confirm Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white/5 border-white/10 pl-10 pr-16 py-6"
                />

                <div className="absolute right-10 top-4">
                  {passwordsMatch && (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  )}

                  {passwordsNotMatch && (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-4 text-gray-400 hover:text-white transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {passwordsMatch && (
                <p className="text-xs text-green-400">
                  Passwords match
                </p>
              )}

              {passwordsNotMatch && (
                <p className="text-xs text-red-400">
                  {formik.errors.confirmPassword || "Passwords do not match"}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="py-6 text-lg w-full cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          <button
            type="button"
            className="text-xs text-gray-500 hover:text-white transition-colors mb-6 m-auto flex cursor-pointer"
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;