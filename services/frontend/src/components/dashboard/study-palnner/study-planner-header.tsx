import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { FaPlus } from "react-icons/fa6";


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

          <CalendarDateRangePicker setDate={function (newDate: DateRange): void {
            throw new Error("Function not implemented.");
          }} />
          <Button className="flex rounded-lg gap-2"><FaPlus />Add Task</Button>
        </div>

      </div>

    </div>
  );
};