import { TaskCard } from "./task-card";

interface TaskSectionProps {
  type: "completed" | "upcoming";
}

export function TaskSection({ type }: TaskSectionProps) {
  const isCompleted = type === "completed";

  return (
    <div className="custom-surface rounded-3xl p-6">

      <div className="flex items-center gap-2 mb-6">
        <div
          className={`w-3 h-3 rounded-full ${isCompleted ? "bg-green-400" : "bg-blue-400"
            }`}
        />

        <h3 className="text-2xl font-bold">
          {isCompleted ? "Completed (8)" : "Upcoming (5)"}
        </h3>
      </div>
      <div className="space-y-4">

        {isCompleted ? (
          <>
            <TaskCard
              type="completed"
              icon="check"
              title="Integration by Parts — Theory"
              subtitle="Mon • 45 min"
              buttonText="+80 XP"
            />

            <TaskCard
              type="completed"
              icon="check"
              title="Integration Practice Problems"
              subtitle="Mon • 30 min"
              buttonText="+60 XP"
            />

            <TaskCard
              type="completed"
              icon="check"
              title="Trigonometric Substitution"
              subtitle="Tue • 50 min"
              buttonText="+100 XP"
            />
          </>
        ) : (
          <>
            <TaskCard
              icon="calendar"
              title="Partial Fractions — Introduction"
              subtitle="Today • 45 min"
              buttonText="Start"
            />

            <TaskCard
              icon="monitor"
              title="Python: OOP Concepts"
              subtitle="Today • 40 min"
              buttonText="Later"
            />

            <TaskCard
              icon="math"
              title="Improper Integrals"
              subtitle="Thu • 40 min"
              buttonText="Thu"
            />
          </>
        )}

      </div>
    </div>
  );
}