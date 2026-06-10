import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";

const NavigationButtons = ({
  step,
  prevStep,
  nextStep,
  handleSubmit,
  canProceed,
  isLoading,
}: any) => {
  return (
    <div className="mt-10 flex items-center gap-4">

      {step > 1 && (
        <Button
          onClick={prevStep}
          variant="outline"
          className="flex items-center gap-2 py-6 rounded-xl "
        >
          <FaArrowLeftLong />
          Back
        </Button>
      )}

      {step < 5 ? (
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="flex-1 py-6 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
        >
          Continue →
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
          disabled={!canProceed || isLoading}
          className="flex-1 py-6 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
        >
          {isLoading ? "Generating..." : "Generate AI Roadmap"}
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;