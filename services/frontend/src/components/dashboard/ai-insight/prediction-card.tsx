import { Card, CardContent } from "@/components/ui/card";

export default function PredictionCard() {
  return (
    <div className="space-y-6 h-full">
      <Card className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />

        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold">
              🤖 AI Prediction
            </h3>
            <p className="text-sm text-slate-500">
              Based on your learning velocity
            </p>
          </div>

          <h2 className="text-5xl font-bold text-primary">
            10 days
          </h2>

          <p className="leading-7 text-slate-400">
            You can complete the{" "}
            <span className="font-semibold dark:text-white text-black">
              Calculus course
            </span>{" "}
            in approximately 10 days at your current pace.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-card p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                72%
              </p>
              <span className="text-xs text-slate-500">
                Current
              </span>
            </div>

            <div className="rounded-xl bg-card p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">
                100%
              </p>
              <span className="text-xs text-slate-500">
                Target
              </span>
            </div>

            <div className="rounded-xl bg-card p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">
                10d
              </p>
              <span className="text-xs text-slate-500">ETA</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-emerald-500/20">
        <CardContent className="p-6 space-y-5">
          <h3 className="text-xl font-semibold">
            💡 AI Recommendation
          </h3>

          <p className="leading-7 text-slate-400">
            Focus on{" "}
            <span className="font-semibold dark:text-white text-black">
              Integration by Parts
            </span>{" "}
            this week. Spend 20 extra minutes on practice
            problems to close the 48% gap.
          </p>

          <button className="w-full rounded-xl border border-white/10 bg-card py-3 font-medium transition hover:bg-white/5">
            🤖 Ask AI for a study plan
          </button>
        </CardContent>
      </Card>
    </div>
  );
}