export function UpgradeModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-[32px] border border-blue-500/20 bg-[#070E1F] p-8">
        <button className="absolute right-5 top-5 text-slate-500">
          ✕
        </button>

        <div className="text-center">
          <div className="mb-5 text-5xl">💎</div>

          <h1 className="text-4xl font-bold text-white">
            Upgrade to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pro
            </span>
          </h1>

          <p className="mt-3 text-slate-400">
            Unlock unlimited Pomodoro sessions with Pro
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {[
            "Unlimited AI Chat conversations",
            "500+ Flashcard decks across all subjects",
            "Smart roadmap with AI personalization",
            "Priority AI — faster responses",
            "Detailed analytics and progress tracking",
            "Ad-free experience forever",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border-b border-white/5 pb-4 text-slate-200"
            >
              <span className="text-green-400">✓</span>
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-blue-500/20 bg-[#0D1630] p-8 text-center">
          <h2 className="text-5xl font-bold text-blue-500">
            $12
            <span className="text-lg text-slate-400">
              /mo
            </span>
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            7-day free trial • Cancel anytime
          </p>
        </div>

        <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30">
          Start 7-Day Free Trial
        </button>

        <p className="mt-4 text-center text-sm text-slate-500">
          No credit card required for trial
        </p>
      </div>
    </div>
  );
}