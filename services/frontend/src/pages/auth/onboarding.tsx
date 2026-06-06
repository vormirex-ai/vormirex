import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  setOnboardingCompleted,
  saveOnboardingData,
} from "@/store/slice/onboardingSlice";
import StepGoal from "@/components/auth/onbording/StepGoal";
import StepSubjects from "@/components/auth/onbording/StepSubjects";
import StepStudyTime from "@/components/auth/onbording/StepStudyTime";
import StepLevel from "@/components/auth/onbording/StepLevel";
import ProgressBar from "@/components/auth/onbording/ProgressBar";
import NavigationButtons from "@/components/auth/onbording/NavigationButtons";
import OnboardingFinish from "@/components/auth/onbording/OnboardingFinish";

const initialFormData = {
  goal: "",
  subjects: [],
  studyTime: "",
  level: "",
};

const OnboardingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    const urlStep = Number(searchParams.get("step"));
    if (urlStep >= 1 && urlStep <= 5) {
      setStep(urlStep);
    }
  }, []);

  const updateFormData = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };


  const nextStep = () => {
    if (step < 5) {
      const newStep = step + 1;
      setStep(newStep);
      setSearchParams({ step: String(newStep) });
    }
  };


  const prevStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);

      setSearchParams({ step: String(newStep) });
    }
  };

  const canProceed = () => {
    if (step === 1) return !!formData.level;
    if (step === 2) return formData.subjects.length > 0;
    if (step === 3) return !!formData.goal;
    if (step === 4) return !!formData.studyTime;
    if (step === 5) return true;
    return false;
  };

  const handleSubmit = () => {
    dispatch(saveOnboardingData(formData));
    dispatch(setOnboardingCompleted(true));

    toast.success("Onboarding Completed ✅");

    setSearchParams({});
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center my-7">
      <div className="relative w-full max-w-2xl bg-[#0A0F1F] rounded-[32px] p-8 border border-white/10 shadow-[0_0_25px_rgba(34,211,238,0.12)]">

        <ProgressBar step={step} />

        <div className="mt-6 flex-1">

          {step === 1 && (
            <StepLevel
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 2 && (
            <StepSubjects
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 3 && (
            <StepGoal
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 4 && (
            <StepStudyTime
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 5 && (
            <OnboardingFinish
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

        </div>

        <NavigationButtons
          step={step}
          prevStep={prevStep}
          nextStep={nextStep}
          handleSubmit={handleSubmit}
          canProceed={canProceed()}
        />

      </div>
    </div>
  );
};

export default OnboardingPage;