import { Button } from "../ui/button";
import { Play } from "lucide-react";
import CardSection from "./hero-section/FloatingCard";
import { FaRocket } from "react-icons/fa6";
import StatsSection from "./hero-section/HeroStats";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleWatchDemo = () => {
    navigate("/ai-chat");
  };

  return (
    <section className="relative pt-10 pb-14 md:pb-20 px-4 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#0A0B14] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full 
bg-[#142128] backdrop-blur-md 
border border-[#1f3b5b] 
shadow-[0_0_20px_rgba(106,236,225,0.08)] 
text-xs text-primary mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#22c55e]" />
          Powered by Advanced AI • 50K+ Students Learning
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Learning That Feels Like <br />
          <span className="relative font-bold">
            <span className="animate-gradient-x bg-primary-gradient bg-clip-text text-transparent">
              Playing
            </span>
          </span>
        </h1>

        <p className="text-textColor text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Your friendly AI teacher available 24/7 to turn studying into an
          exciting adventure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Button
            onClick={handleStartLearning}
            className="py-6 font-bold px-8"
          >
            <FaRocket /> &nbsp; Start Learning Free
          </Button>

          <Button
            onClick={handleWatchDemo}
            variant="secondary"
            className="border-slate-700 bg-slate-900/50 px-8 py-6 text-white hover:border hover:border-primary"
          >
            <Play className="w-4 h-4 mr-2 fill-current text-primary" />
            Try AI Demo
          </Button>
        </div>

        <CardSection />

        <hr className="w-full max-w-[550px] mx-auto border-t border-white/20 my-7" />

        <StatsSection />
      </div>
    </section>
  );
};

export default Hero;