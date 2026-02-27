"use client";

import { AnalysisResult } from "@/lib/types";

interface ResultsPanelProps {
  result: AnalysisResult;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 70
      ? "bg-green-100 text-green-800 border-green-300"
      : score >= 40
        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
        : "bg-red-100 text-red-800 border-red-300";

  const barColor =
    score >= 70 ? "bg-green-500" : score >= 40 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="text-center">
      <div
        className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${color} text-3xl font-bold`}
      >
        {score}%
      </div>
      <div className="mt-3 w-full max-w-xs mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${barColor} transition-all duration-500`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const { companyAnalysis } = result;

  return (
    <div className="space-y-6">
      {/* Match Score */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Match Score
        </h3>
        <ScoreBadge score={result.matchScore} />
        <p className="text-gray-600 mt-4 text-center max-w-2xl mx-auto">
          {result.matchExplanation}
        </p>
      </div>

      {/* Company Intel */}
      {companyAnalysis && (
        <Section title="Company Intel" icon="🏢">
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                {companyAnalysis.companyName}
              </h4>
              <p className="text-gray-600 text-sm">{companyAnalysis.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  Financial Status
                </h4>
                <p className="text-gray-600 text-sm">
                  {companyAnalysis.financialStatus}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  Growth Trajectory
                </h4>
                <p className="text-gray-600 text-sm">
                  {companyAnalysis.growthTrajectory}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recent News */}
              {companyAnalysis.recentNews.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Recent News
                  </h4>
                  <ul className="space-y-1.5">
                    {companyAnalysis.recentNews.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-blue-500 mt-0.5 shrink-0">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concerns */}
              {companyAnalysis.concerns.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Concerns
                  </h4>
                  <ul className="space-y-1.5">
                    {companyAnalysis.concerns.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-red-500 mt-0.5 shrink-0">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Culture Signals */}
              {companyAnalysis.cultureSignals.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Culture Signals
                  </h4>
                  <ul className="space-y-1.5">
                    {companyAnalysis.cultureSignals.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-indigo-500 mt-0.5 shrink-0">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Section title="Key Strengths" icon="✅">
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-green-500 mt-1 shrink-0">●</span>
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* Skill Gaps */}
        <Section title="Skill Gaps" icon="⚠️">
          <ul className="space-y-2">
            {result.skillGaps.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 mt-1 shrink-0">●</span>
                {g}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Profile Updates */}
      <Section title="Profile Optimization" icon="📝">
        <div className="space-y-4">
          {result.profileUpdates.map((u, i) => (
            <div key={i} className="border-l-4 border-blue-400 pl-4">
              <p className="font-medium text-blue-800">{u.section}</p>
              <p className="text-gray-600 mt-1">{u.suggestion}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Interview Prep */}
      <Section title="Interview Preparation" icon="🎯">
        <div className="space-y-6">
          {result.interviewPrep.map((q, i) => (
            <div key={i} className="space-y-2">
              <p className="font-medium text-gray-800">
                Q{i + 1}: {q.question}
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-700 mb-1">
                  How to answer:
                </p>
                <p className="text-gray-700 text-sm">{q.howToAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Additional Tips */}
      <Section title="Additional Recommendations" icon="💡">
        <ul className="space-y-2">
          {result.additionalTips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-purple-500 mt-1 shrink-0">→</span>
              {t}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
