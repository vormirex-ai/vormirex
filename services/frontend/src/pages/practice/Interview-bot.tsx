import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { SetupStep } from "@/components/dashboard/interview-bot/setup-step";
import { InterviewStep } from "@/components/dashboard/interview-bot/interview-step";
import { ResultsStep } from "@/components/dashboard/interview-bot/results-step";
import { InterviewBotHeader } from "@/components/dashboard/interview-bot/interview-header";


type WorkflowSteps = "SETUP" | "INTERVIEW" | "RESULTS";

export default function InterviewBotPage() {
  const [currentStep, setCurrentStep] = useState<WorkflowSteps>("SETUP");
  const [sessionData, setSessionData] = useState<any>(null);

  const handleStartInterview = (data: any) => {
    setSessionData(data);
    setCurrentStep("INTERVIEW");
  };

  const handleFinishInterview = () => {
    setCurrentStep("RESULTS");
  };

  const handleRestartWorkflow = () => {
    setSessionData(null);
    setCurrentStep("SETUP");
  };

  return (

    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10">

      <div className="mx-auto space-y-10">
        <motion.div variants={fadeUpItem}>
          <InterviewBotHeader />
        </motion.div>

        <main className=" text-slate-100 flex flex-col justify-start">

          <div className="w-full max-w-6xl mx-auto">
            <motion.div variants={fadeUpItem}>
              {currentStep === "SETUP" && (
                <SetupStep onAnalyze={handleStartInterview} />
              )}
            </motion.div>

            <motion.div variants={fadeUpItem}>
              {currentStep === "INTERVIEW" && (
                <InterviewStep
                  onComplete={handleFinishInterview}
                  onBack={handleRestartWorkflow}
                />
              )}
            </motion.div>


            <motion.div variants={fadeUpItem}>
              {currentStep === "RESULTS" && (
                <ResultsStep onRestart={handleRestartWorkflow} />
              )}
            </motion.div>
          </div>
        </main>

      </div>
    </motion.div>
  );
}