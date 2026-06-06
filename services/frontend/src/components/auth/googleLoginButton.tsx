import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const API_ROOT =
  import.meta.env.VITE_API_URL || "http://localhost/api";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_ROOT}/auth/google`;
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleGoogleLogin}
      className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2 py-6"
    >
      <FcGoogle className="w-5 h-5" />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;