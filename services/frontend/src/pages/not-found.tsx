import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020817] px-4 text-white">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#051522]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_50px_rgba(56,189,248,0.1)]">
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400"
          >
            <HelpCircle className="h-12 w-12" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <h2 className="text-xl font-bold tracking-tight mt-2">Page Not Found</h2>
          <p className="text-sm text-gray-400">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            className="flex-1 bg-[#1e293b] hover:bg-[#334155] border-white/10 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Home Screen
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
