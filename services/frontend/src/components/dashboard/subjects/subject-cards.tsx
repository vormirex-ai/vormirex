import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { CustomProgress } from "@/components/common/custom-progress";
import { DynamicIcon } from "@/components/iconMapper";
import { SubjectCardProps } from "@/interface/subject.interface";
import { useDispatch } from "react-redux";
import { setSelectedSubjectId } from "@/store/slice/subjectSlice";
import { useNavigate } from "react-router";



export const SubjectCard = ({
  _id,
  title,
  icon,
  topics,
  lessons,
  progress,
  timeStudied,
  status,
  color,
  description,
  subtitle,
  isPro,
  price,
  tags,
  hasCertificate,
}: SubjectCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedSubjectId(_id));
    navigate(`/dashboard/course-details/${_id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className=" group relative overflow-hidden rounded-2xl cursor-pointer custom-surface transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_0_30px_rgba(99,231,220,0.08)]">

      <div
        className=" absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[#63E7DC] via-[#46D3C9] to-[#26BDB3] transition-all duration-500 group-hover:w-full" />
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-2xl bg-border p-3 text-2xl transition-transform duration-300 group-hover:scale-105">
            {/* {icon} */}
            <DynamicIcon icon={icon} />
          </div>

          <Badge
            variant="secondary"
            className={`
              border-none rounded-lg

              ${status === "In Progress"
                ? "bg-blue-500/10 text-blue-400"
                : ""
              }

              ${status === "New"
                ? "bg-emerald-500/10 text-emerald-400"
                : ""
              }

              ${status === "Not Started"
                ? "bg-orange-500/10 text-orange-400"
                : ""
              }

              ${status === "Started"
                ? "bg-violet-500/10 text-violet-400"
                : ""
              }
            `}
          >
            {status}
          </Badge>
        </div>

        <h3 className="mb-1 text-xl font-bold">
          {title}
        </h3>

        <p className="mb-6 text-sm text-textColor">
          {topics} topics • {lessons} lessons done
        </p>


        <div className="mb-5 space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-textColor">
              Progress
            </span>

            <span style={{ color }}>
              {progress}%
            </span>
          </div>

          <div className="relative">
            <CustomProgress
              value={progress}
              className="h-2"
            />

            <div
              className="absolute left-0 top-0 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: color,
                boxShadow: `0 0 12px ${color}`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-textColor">
          <Clock size={14} />

          <span>{timeStudied} studied</span>
        </div>
      </CardContent>
    </Card>
  );
};