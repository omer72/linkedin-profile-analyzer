"use client";

import { AnalysisResult } from "@/lib/types";

interface ResultsPanelProps {
  result: AnalysisResult;
}

function ScoreBadge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const ringColor =
    score >= 70 ? "stroke-emerald-500" : score >= 40 ? "stroke-amber-500" : "stroke-red-500";
  const textColor =
    score >= 70 ? "text-emerald-600" : score >= 40 ? "text-amber-600" : "text-red-600";

  return (
    <div className="flex justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            strokeWidth="8"
            className="stroke-slate-100"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={ringColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ animation: `score-fill 1.2s ease-out` }}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${textColor}`}>
          {score}%
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  iconColor,
  children,
  delay = 0,
}: {
  title: string;
  iconColor: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-3">
        <span className={`w-1 h-6 rounded-full ${iconColor}`} />
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletList({ items, dotColor }: { items: string[]; dotColor: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-slate-700">
          <span className={`w-2 h-2 rounded-full ${dotColor} mt-1.5 shrink-0`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const { companyAnalysis } = result;

  return (
    <div className="space-y-6">
      {/* Match Score */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-md border border-slate-200 p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50 animate-fade-in-up"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
          Match Score
        </h3>
        <ScoreBadge score={result.matchScore} />
        <p className="text-slate-600 mt-4 text-center max-w-2xl mx-auto">
          {result.matchExplanation}
        </p>
      </div>

      {/* Company Intel */}
      {companyAnalysis && (
        <Section title="Company Intel" iconColor="bg-slate-600" delay={50}>
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-1">
                {companyAnalysis.companyName}
              </h4>
              <p className="text-slate-600 text-sm">{companyAnalysis.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-1">
                  Financial Status
                </h4>
                <p className="text-slate-600 text-sm">
                  {companyAnalysis.financialStatus}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-1">
                  Growth Trajectory
                </h4>
                <p className="text-slate-600 text-sm">
                  {companyAnalysis.growthTrajectory}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {companyAnalysis.recentNews.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Recent News
                  </h4>
                  <BulletList items={companyAnalysis.recentNews} dotColor="bg-indigo-500" />
                </div>
              )}

              {companyAnalysis.concerns.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Concerns
                  </h4>
                  <BulletList items={companyAnalysis.concerns} dotColor="bg-red-500" />
                </div>
              )}

              {companyAnalysis.cultureSignals.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Culture Signals
                  </h4>
                  <BulletList items={companyAnalysis.cultureSignals} dotColor="bg-violet-500" />
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Section title="Key Strengths" iconColor="bg-emerald-500" delay={100}>
          <BulletList items={result.strengths} dotColor="bg-emerald-500" />
        </Section>

        {/* Skill Gaps */}
        <Section title="Skill Gaps" iconColor="bg-amber-500" delay={150}>
          <BulletList items={result.skillGaps} dotColor="bg-amber-500" />
        </Section>
      </div>

      {/* Profile Updates */}
      <Section title="Profile Optimization" iconColor="bg-indigo-500" delay={200}>
        <div className="space-y-4">
          {result.profileUpdates.map((u, i) => (
            <div key={i} className="border-l-4 border-indigo-400 pl-4">
              <p className="font-medium text-indigo-700">{u.section}</p>
              <p className="text-slate-600 mt-1">{u.suggestion}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Interview Prep */}
      <Section title="Interview Preparation" iconColor="bg-violet-500" delay={250}>
        <div className="space-y-6">
          {result.interviewPrep.map((q, i) => (
            <div key={i} className="space-y-2">
              <p className="font-medium text-slate-800 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                {q.question}
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-4">
                <p className="text-sm font-medium text-indigo-700 mb-1">
                  How to answer:
                </p>
                <p className="text-slate-700 text-sm">{q.howToAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Additional Tips */}
      <Section title="Additional Recommendations" iconColor="bg-purple-500" delay={300}>
        <BulletList items={result.additionalTips} dotColor="bg-purple-500" />
      </Section>
    </div>
  );
}
