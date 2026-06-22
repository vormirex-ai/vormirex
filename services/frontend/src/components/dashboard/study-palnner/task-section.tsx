import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TaskCard } from "./task-card";
import { TaskActions } from "../../common/add-task/task-action";
import { useDeleteTaskMutation,useGetPlannerQuery,
 useUpdateTaskMutation} from "@/store/api/studyPlannerApi";

interface TaskSectionProps {
  type: "completed" | "upcoming";
  completedTasksData?: any[];
  upcomingTaskData?: any[];
}

export function TaskSection({ type, completedTasksData = [], upcomingTaskData = []}: TaskSectionProps) {
  const navigate = useNavigate();
  const { refetch } = useGetPlannerQuery();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const isCompleted = type === "completed";
  const tasks = isCompleted ? completedTasksData : upcomingTaskData;

 const handleCompleteTask = async (
  taskId: string,
  status?: string
) => {

  if (status === "completed") {
    toast.info("Task already completed");
    return;
  }

  try {
    const payload = { id: taskId, status: "completed" };
    const result = await updateTask(payload);

    if ("error" in result) {
      console.error("PATCH ERROR =>", result.error);
      toast.error(JSON.stringify(result.error, null, 2));
      return;
    }

    toast.success("Task marked as completed 🎉");
    refetch();
  } catch (error) {
    console.error("CATCH ERROR =>", error);
    toast.error("Failed to complete task");
  }
};

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await deleteTask(taskId).unwrap();
      toast.success(response?.message || "Task deleted successfully");
      refetch();
    } catch (error) {
      console.error("DELETE ERROR =>", error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="custom-surface rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div
          className={`w-3 h-3 rounded-full ${
            isCompleted ? "bg-green-400" : "bg-blue-400"}`}
        />

        <h3 className="md:text-2xl text-lg font-bold">
          {isCompleted
            ? `Completed (${completedTasksData.length})`
            : `Upcoming (${upcomingTaskData.length})`}
        </h3>
      </div>

      <div className="space-y-4  max-h-[500px] overflow-y-auto custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No {type} tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              type={
                task.status === "completed" ? "completed" : "upcoming"
              }
              icon={
                task.status === "completed" ? "check" : "calendar"
              }
              title={task.title}
              xpAwarded={task?.xpAwarded}
              subtitle={`${task.durationMinutes} min`}
              buttonText={
                task.status === "completed"
                  ? `+${task.xpAwarded ?? 0} XP`
                  : "Start"
              }
              onAction={() => {
                if (task.status !== "completed") {
                  navigate(`/productivity/timer/${task._id}`);
                }
              }}
              actions={
                <TaskActions
                  loading={isUpdating}
                  completeDisabled={task.status === "completed"}
                  onComplete={() =>
                    handleCompleteTask(task._id, task.status)}
                  onDelete={() =>handleDeleteTask(task._id)}
                />
              }
            />
          ))
        )}
      </div>
    </div>
  );
}