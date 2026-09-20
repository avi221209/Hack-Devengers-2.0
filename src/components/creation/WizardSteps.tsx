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
    <div className="w-full mb-6 bg-[#FFF7ED] p-3.5 sm:p-4 rounded-2xl border border-[#FDBA74]/50 shadow-2xs">
      {/* Progress Bar Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#1C1917] mb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C2410C] animate-ping" />
          <span>Step {currentStep} of {totalSteps}:</span>
          <span className="text-[#C2410C] font-extrabold">{STEP_LABELS[currentStep - 1]}</span>
        </span>
        <span className="text-[#C2410C] font-black">{percentage}% Complete</span>
      </div>

      {/* Persistent Progress Bar */}
      <div className="w-full h-3 rounded-full bg-[#E8DECB] overflow-hidden mb-3.5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[#C2410C] via-[#EA580C] to-[#D97706] transition-all duration-300 rounded-full shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-6 gap-1 sm:gap-1.5">
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
                  ? "bg-[#C2410C] text-white shadow-sm scale-102 border border-orange-400"
                  : isDone
                  ? "bg-white text-[#C2410C] border border-[#FDBA74] hover:bg-[#FFEDD5]"
                  : "bg-white/50 text-[#A8A29E] border border-transparent cursor-not-allowed"
              }`}
            >
              {isDone ? (
                <Check className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[9px] shrink-0">
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
