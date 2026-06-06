import { RotateCcw, PlusCircle, BarChart3, ShieldCheck, Sparkles, Key, ClipboardList, Zap, Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultsStepProps {
  onRestart: () => void;
}

export function ResultsStep({ onRestart }: ResultsStepProps) {
  const scores = [
    { label: "Q1: Behavioral", score: "3/10", fill: 30, color: "bg-rose-500" },
    { label: "Q2: Behavioral", score: "8/10", fill: 80, color: "bg-cyan-400" },
    { label: "Q3: Behavioral", score: "1/10", fill: 10, color: "bg-rose-500" },
    { label: "Q4: Behavioral", score: "1/10", fill: 10, color: "bg-rose-500" },
    { label: "Q5: Behavioral", score: "0/10", fill: 0, color: "bg-slate-800" },
    { label: "Q6: Situational", score: "0/10", fill: 0, color: "bg-slate-800" },
    { label: "Q7: Situational", score: "0/10", fill: 0, color: "bg-slate-800" },
    { label: "Q8: Situational", score: "0/10", fill: 0, color: "bg-slate-800" },
  ];

  const suggestions = [
    {
      icon: <BarChart3 className="w-4 h-4 text-yellow-500" />,
      title: "Keep it to 1–2 Pages Maximum",
      desc: "Recruiters spend avg 7 seconds on first scan. Trim irrelevant experience. Only keep the last 10 years."
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
      title: "Add a Skills Section with Proficiency",
      desc: "Organize skills by category (Languages, Frameworks, Tools). Mention proficiency level where relevant."
    },
    {
      icon: <Key className="w-4 h-4 text-indigo-400" />,
      title: "Highlight Certifications",
      desc: "Add relevant certifications (AWS, Google, Microsoft, HubSpot, etc.) — they significantly strengthen a resume."
    },
    {
      icon: <Zap className="w-4 h-4 text-yellow-400" />,
      title: "Use Strong Action Verbs",
      desc: '"Responsible for managing" → "Led", "Engineered", "Architected", "Optimized". Start every bullet with a powerful verb.'
    },
    {
      icon: <Link className="w-4 h-4 text-purple-400" />,
      title: "Add Links to Proof of Work",
      desc: "Include GitHub, Portfolio, LinkedIn, or live project URLs. Let recruiters see your work, not just read about it."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 ">
      <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 dark:text-slate-300 text-slateText">
        📊 Interview Complete!
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Grid */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="text-center py-8">
            <CardContent className="space-y-4">
              <div className="text-4xl justify-center flex">📚</div>
              <div className="space-y-1">
                <div className="text-5xl font-black text-primary tracking-tight">16%</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Interview Score</div>
              </div>
              <p className="text-xs font-medium text-cyan-400 pt-1">
                Keep Studying — You'll Get There!
              </p>
            </CardContent>
          </Card>

          <Card >
            <CardHeader className="pb-3 pt-4">
              <CardTitle className="text-xs font-bold uppercase tracking-wider dark:text-slate-300 text-slateText flex items-center gap-1.5">
                📝 Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {scores.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">{item.label}</span>
                    <span className={`${item.score === "0/10" ? "text-slate-600" : item.score === "8/10" ? "text-cyan-400" : "text-rose-500"} font-semibold font-mono`}>{item.score}</span>
                  </div>
                  <div className="w-full h-1.5 dark:bg-slate-900 bg-slate-300 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: `${item.fill}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Grid */}
        <div className="lg:col-span-7 space-y-4">
          <Card className=" h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" /> Resume Improvement Suggestions
              </CardTitle>
              <p className="text-[11px] text-slate-500">
                AI-powered feedback based on your resume and the job position
              </p>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {suggestions.map((sug, idx) => (
                <div key={idx} className="flex gap-3 border border-primary bg-primary/5 dark:bg-[#154249]/40  p-3 rounded-xl transition-all hover:bg-primary-gradient cursor-pointer dark:hover:text-black">
                  <div className="bg-primary-gradient p-2 h-9 w-9 rounded-lg border border-slate-800 flex items-center justify-center flex-shrink-0">
                    {sug.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold  tracking-wide">{sug.title}</h4>
                    <p className="text-xs text-slate-500 leading-normal ">{sug.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>


      <div className="flex gap-3 pt-2">
        <Button onClick={onRestart} className="flex-1 font-semibold py-5 rounded-lg text-xs flex items-center justify-center gap-1">
          <RotateCcw className="w-4 h-4" /> Practice Again
        </Button>
        <Button variant="secondary" onClick={onRestart} className=" -xs px-5 rounded-lg">
          <PlusCircle className="w-4 h-4 mr-1.5" /> New Resume
        </Button>
      </div>
    </div>
  );
}