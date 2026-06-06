import { useState } from "react";
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
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";

import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "@/components/auth/googleLoginButton";
import { useLoginMutation } from "@/store/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/slice/authSlice";
import { toast } from "sonner";
import { RootState } from "@/store/store";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onboardingCompleted = useSelector(
    (state: RootState) => state.onboarding.completed
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const [login, { isLoading: loading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setError("");
      try {
        const response = await login(values).unwrap();

        if (response?.success) {

          dispatch(
            setCredentials({
              user: response.user,
              token: response.accessToken,
            })
          );
          toast.success("Login Successful ✅");
          if (onboardingCompleted) {
            navigate("/dashboard");
          } else {
            navigate("/onboarding");
          }

        } else {
          setError(response?.message);
          toast.error(response?.message || "Login failed ❌");
        }

      } catch (err: any) {
        const errMsg = err?.data?.message || err?.message || "Something went wrong ❌";
        setError(errMsg);
        toast.error(errMsg);
      }
    },
  });
  return (
    <div className="min-h-screen w-full flex items-center justify-center  relative overflow-hidden px-4">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />

      <Card className="w-full max-w-md backdrop-blur-xl  bg-[#051522] text-white shadow-[0_0_40px_rgba(56,189,248,0.15)] z-10 p-2 md:p-6">
        <CardHeader className="space-y-1 flex flex-col items-center">

          <div className="flex items-center gap-2 cursor-pointer my-5">
            <img src={logo} alt="Logo" className="w-6 h-6" />

            <span className="font-bold text-xl tracking-tight bg-primary bg-clip-text text-transparent">
              VORMIREX
            </span>
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back 👋
          </CardTitle>

          <CardDescription className="text-gray-400">
            Sign in to continue your learning journey
          </CardDescription>

        </CardHeader>

        <CardContent className="grid gap-6">

          <GoogleLoginButton />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>

            <div className="relative flex justify-center text-xs ">
              <span className="bg-[#0c1425] px-2 text-gray-500">
                or sign in with email
              </span>
            </div>
          </div>

          <div className="grid gap-4">

            <div className="grid gap-2">

              <Label
                htmlFor="email"
                className="text-gray-400 ml-1"
              >
                Email address
              </Label>

              <div className="relative">

                <Mail className="absolute left-3 top-[18px] h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="user@example.com"
                  className="bg-white/5 border-white/10 pl-10 py-6"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-gray-400 ml-1">
                  Password
                </Label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-500" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 pl-10 py-6 "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-4 text-gray-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}

              </div>

            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

          </div>

          <Button
            onClick={() => formik.handleSubmit()}
            className="py-6 text-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-1">
                Signing In
                <span className="animate-pulse">.</span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                >
                  .
                </span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                >
                  .
                </span>
              </span>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5 font-bold" />
                Sign In
              </>
            )}
          </Button>

          <p className="text-sm text-gray-400 text-center">
            Don't have an account?{" "}

            <Link
              to="/sign-up"
              className="text-blue-400 hover:underline"
            >
              Create account
            </Link>
          </p>

          <button
            className="text-xs text-gray-500 hover:text-white transition-colors mb-6"
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;