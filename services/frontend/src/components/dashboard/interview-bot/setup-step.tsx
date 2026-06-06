import React, { useState } from "react";
import { Briefcase, FileText, Target, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SetupStepProps {
  onAnalyze: (data: any) => void;
}

export function SetupStep({ onAnalyze }: SetupStepProps) {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("frontend developer");
  const [company, setCompany] = useState("");
  const [expLevel, setExpLevel] = useState("Mid Level");
  const [interviewType, setInterviewType] = useState("mixed");

  const wordCount = resume.trim() ? resume.trim().split(/\s+/).length : 0;

  const handleAnalyze = () => {
    onAnalyze({ resume, role, company, expLevel, interviewType });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 custom-surface">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Your Resume
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Paste your resume text below. Include your skills, experience, and education.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Paste your resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="min-h-[280px] border-primary bg-primary/5 dark:bg-[#154249]/40 focus-visible:ring-indigo-500 text-sm resize-none text-slate-300 placeholder:text-slate-600"
              />
              {resume.length === 0 && (
                <div className="absolute top-10 left-3 pointer-events-none text-xs text-slate-600 space-y-2 max-w-[90%]">
                  <p className="font-semibold">Example:</p>
                  <p>John Doe | john@email.com | LinkedIn: linkedin.com/in/johndoe</p>
                  <p className="font-semibold mt-2">EXPERIENCE</p>
                  <p>Software Engineer — TechCorp (2022–Present)</p>
                  <p>• Built REST APIs using Node.js and Express</p>
                  <p>• Reduced page load time by 40% using React optimization</p>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
              <span>{wordCount} words</span>
              <Button variant="ghost" size="sm" onClick={() => setResume("")} className="text-slate-400 hover:text-primary h-auto p-1">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2 ">
                <Briefcase className="w-4 h-4 text-primary" /> Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Job Position / Role *</label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className=" bg-primary/5 dark:bg-[#154249]/40  text-sm focus-visible:ring-primary text-slateText dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Company (Optional)</label>
                <Input
                  placeholder="e.g. Google, Amazon, or leave blank"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className=" bg-primary/5 dark:bg-[#154249]/40  text-sm focus-visible:ring-primary text-slateText dark:text-white placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Experience Level</label>
                <div className="flex gap-2">
                  {[
                    { id: "Fresher", label: "🌱 Fresher" },
                    { id: "Mid Level", label: "⚡ Mid Level" },
                    { id: "Senior", label: "🚀 Senior" }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setExpLevel(lvl.id)}
                      className={`flex-1 py-2 text-xs font-medium rounded-md border transition-all
        ${expLevel === lvl.id
                          ? "bg-[#dff4f7] dark:bg-[#154249] border-primary text-slate-700 dark:text-white shadow-sm"
                          : "bg-white dark:bg-card text-slate-500 dark:text-slate-400 border-slate-200 dark:border-cyan-500/10 hover:border-primary hover:bg-[#eefbfd] hover:dark:bg-[#154249]/40"
                        }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Type Box */}
          <Card >
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Interview Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={interviewType} onValueChange={setInterviewType} className="space-y-2.5">
                {[
                  { id: "mixed", title: "Mixed (Recommended)", desc: "Technical + Behavioral + HR questions" },
                  { id: "technical", title: "Technical Only", desc: "Coding, problem solving, domain skills" },
                  { id: "behavioral", title: "Behavioral Only", desc: "Soft skills, teamwork, leadership" },
                  { id: "hr", title: "HR Round Only", desc: "Salary, availability, career goals" }
                ].map((type) => (
                  <label
                    key={type.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all
    ${interviewType === type.id
                        ? "bg-[#dff4f7] dark:bg-[#154249] border-primary"
                        : "bg-white dark:bg-[#154249]/40 border-slate-200 dark:border-cyan-500/10 hover:border-primary hover:bg-[#eefbfd] hover:dark:bg-[#154249]/40"
                      }`}
                  >
                    <RadioGroupItem
                      value={type.id}
                      id={type.id}
                      className="mt-0.5 border-slate-600 text-indigo-500 focus-visible:ring-indigo-500"
                    />

                    <div className="grid gap-0.5 pointer-events-none">
                      <span className="text-sm font-semibold">{type.title}</span>

                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {type.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Button
            onClick={handleAnalyze}
            className="w-full bg-primary-gradient  rounded-xl text-sm"
          >
            🤖 Analyze Resume & Generate Questions
          </Button>
        </div>
      </div>
    </div>
  );
}