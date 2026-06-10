import { Rocket } from "lucide-react";

const OnboardingFinish = ({ formData }: any) => {

  const planWeeks = 8;
  const subjectsCount = formData.subjects?.length || 0;
  const dailyGoal = formData.studyTime || "Not set";


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
      className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${color} w-full h-28`}
    >
      <span className="text-xl font-bold text-white text-center">
        {value}
      </span>

      <span className="text-xs uppercase tracking-wider opacity-70 mt-1 text-center text-textColor">
        {label}
      </span>
    </div>
  );

  return (
    <div className="px-2 sm:px-0">

      <div className="mb-6 text-center flex flex-col items-center justify-center">
        <Rocket
          size={60}
          className="text-cyan-400 fill-cyan-400/20 rotate-12 my-6"
        />

        <h2 className="text-2xl font-bold text-white mb-2">
          Your AI roadmap is ready!
        </h2>

        <p className="text-sm text-textColor max-w-md">
          We built a personalized learning plan for you.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
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