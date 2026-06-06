import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaRocket, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useSignupMutation } from "@/store/api/authApi";
import { toast } from "sonner";
import GoogleLoginButton from "@/components/auth/googleLoginButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name cannot contain numbers"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [signup, { isLoading: loading }] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await signup(values).unwrap();
        if (response?.success) {
          toast.success("Signup Successful ✅");
          formik.resetForm();
          navigate("/login");
        } else {
          toast.error(response?.message || "Signup failed ❌");
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again."
        );
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center  relative overflow-hidden px-4">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />

      <Card className="w-full max-w-md bg-[#051522] backdrop-blur-xl  text-white shadow-[0_0_40px_rgba(56,189,248,0.15)] z-10 p-2 md:p-6">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 cursor-pointer my-5">
            <img src={logo} alt="Logo" className="w-6 h-6" />

            <span className="font-bold text-xl tracking-tight bg-primary bg-clip-text text-transparent">
              VORMIREX
            </span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create account 🚀</CardTitle>
          <CardDescription className="text-gray-400">
            Start your AI-powered learning journey today
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">

          <GoogleLoginButton />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs ">
              <span className="bg-[#0c1425] px-2 text-gray-500">or sign up with email</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className=" ml-1 text-gray-400">Full Name</Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-[18px] h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your full name"
                  className="bg-white/5 border-white/10 pl-10 py-6 "
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="ml-1 text-gray-400">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-[18px] h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="user@example.com"
                  className="bg-white/5 border-white/10 pl-10 py-6 "
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
                <Label htmlFor="password" className=" ml-1 text-gray-400">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-500" />

                <Input
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 pl-10 pr-10 py-6"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
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
            <p className="text-xs text-textColor">By creating an account you agree to our
              <span className="text-blue-400 text-xs"> Terms of Service</span>
            </p>
          </div>

          <Button className="py-6 text-lg"
            onClick={() => formik.handleSubmit()}
            disabled={loading}
          >
            <FaRocket className="mr-2 h-5  w-5" /> Create Account
          </Button>

          <p className="text-sm text-gray-400 text-center">
            Already have an account? {""}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>


      </Card>
    </div>
  );
};

export default SignUp;