import { StudyPlannerTaskModal } from "./add-study-planner-task";


export const StudyPannerHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl  font-bold  flex items-center gap-2">
            📅 Study Planner
          </h1>
          <p className="text-textColor mt-1 text-sm md:text-base">Your weekly study schedule. Stay consistent, stay ahead.</p>
        </div>

        <div className="flex gap-3">

      <StudyPlannerTaskModal/>
        </div>

      </div>

    </div>
  );
};