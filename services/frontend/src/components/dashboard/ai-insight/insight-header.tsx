export const InsightHeader = () => {
  return (
    <div className="space-y-6 mb-6 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className=" text-2xl md:text-4xl  font-bold  flex items-center gap-2">
            📊 AI Insights
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Deep analytics and predictions tailored to your learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};