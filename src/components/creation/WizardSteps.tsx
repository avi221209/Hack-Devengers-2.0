"use client";

import React from "react";
import { Check } from "lucide-react";

interface WizardStepsProps {
  currentStep: number; // 1 to 6
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

const STEP_LABELS = [
  "Business",
  "Offerings",
  "Contact",
  "Hours",
  "Branding",
  "Preview",
];

export function WizardSteps({ currentStep, totalSteps = 6, onStepClick }: WizardStepsProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#57534E] mb-2">
        <span>Step {currentStep} of {totalSteps}: <span className="text-[#C2410C] font-extrabold">{STEP_LABELS[currentStep - 1]}</span></span>
        <span>{percentage}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-[#E8DECB] overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#C2410C] to-[#EA580C] transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-6 gap-1 sm:gap-2">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <button
              key={stepNum}
              type="button"
              disabled={stepNum > currentStep}
              onClick={() => onStepClick && stepNum < currentStep && onStepClick(stepNum)}
              className={`tap-target py-1.5 px-1 rounded-xl text-[10px] sm:text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                isCurrent
                  ? "bg-[#C2410C] text-white shadow-xs scale-102"
                  : isDone
                  ? "bg-[#FFEDD5] text-[#C2410C] hover:bg-[#FED7AA]"
                  : "bg-[#F5EEDD]/60 text-[#A8A29E] cursor-not-allowed"
              }`}
            >
              {isDone ? (
                <Check className="w-3 h-3 text-[#C2410C] shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full bg-current/20 flex items-center justify-center text-[9px] shrink-0">
                  {stepNum}
                </span>
              )}
              <span className="truncate hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
