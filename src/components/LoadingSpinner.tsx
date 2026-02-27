"use client";

import { useState, useEffect } from "react";

const steps = [
  "Reading your profile…",
  "Parsing job requirements…",
  "Evaluating skill alignment…",
  "Generating recommendations…",
  "Preparing interview questions…",
];

export default function LoadingSpinner() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setVisibleSteps(i + 1), (i + 1) * 1800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      {/* Dual rings */}
      <div className="relative w-20 h-20 animate-float">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200 border-t-indigo-500 animate-spin" />
        <div
          className="absolute inset-2 rounded-full border-4 border-violet-200 border-b-violet-500 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-lg font-semibold text-slate-700">
          Analyzing your profile…
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Our AI HR consultant is reviewing your profile against the job
          description
        </p>
      </div>

      {/* Step-by-step reveal */}
      <div className="space-y-2 w-full max-w-xs">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-sm transition-all duration-500 ${
              i < visibleSteps
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
            <span className="text-slate-600">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
