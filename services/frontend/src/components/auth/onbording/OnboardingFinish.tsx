import { Rocket } from "lucide-react";

const OnboardingFinish = ({ formData }: any) => {
  const StatCard = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: string | number;
    color: string;
  }) => (
    <div
      className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border ${color} w-full h-24 sm:h-28 md:h-32`}
    >
      <span className="text-xl sm:text-2xl font-bold text-white text-center">
        {value}
      </span>

      <span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-70 mt-1 text-center text-textColor">
        {label}
      </span>
    </div>
  );

  const planWeeks = 8;
  const subjectsCount = formData.subjects?.length || 3;
  const dailyGoal = formData.studyTime || "45 min";

  return (
    <div className="px-2 sm:px-0">

      <div className="mb-6 text-center flex flex-col items-center justify-center">
        <Rocket
          size={52}
          className="sm:size-[64px] text-cyan-400 fill-cyan-400/20 rotate-12 my-4 sm:my-6"
        />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          Your AI roadmap is ready!
        </h2>

        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-textColor max-w-md px-2">
          We've built a personalized learning plan just for you. Let's start your journey to mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full mb-8 sm:mb-10">

        <StatCard
          label="Weeks Plan"
          value={planWeeks}
          color="border-blue-500/30 bg-blue-500/5 text-blue-400"
        />

        <StatCard
          label="Subjects"
          value={subjectsCount}
          color="border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
        />

        <StatCard
          label="Daily Goal"
          value={dailyGoal}
          color="border-orange-500/30 bg-orange-500/5 text-orange-400"
        />

      </div>
    </div>
  );
};

export default OnboardingFinish;