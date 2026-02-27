"use client";

import { useState, useRef } from "react";
import { AnalysisResult } from "@/lib/types";
import LoadingSpinner from "./LoadingSpinner";
import ResultsPanel from "./ResultsPanel";

type InputMethod = "pdf" | "paste";

export default function AnalyzerForm() {
  const [inputMethod, setInputMethod] = useState<InputMethod>("pdf");
  const [profileText, setProfileText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsingPdf, setParsingPdf] = useState(false);
  const [pdfFileName, setPdfFileName] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setParsingPdf(true);
    setError("");
    setPdfFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to parse PDF");
        setPdfFileName("");
      } else {
        setProfileText(data.text);
      }
    } catch {
      setError("Failed to parse PDF. Please try pasting your profile manually.");
      setPdfFileName("");
    } finally {
      setParsingPdf(false);
    }
  }

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();

    if (!profileText.trim()) {
      setError("Please provide your LinkedIn profile content");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please provide the job description");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileText, jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const methodTabs: { key: InputMethod; label: string; desc: string }[] = [
    { key: "pdf", label: "Upload PDF", desc: "LinkedIn profile export" },
    { key: "paste", label: "Paste Text", desc: "Copy & paste manually" },
  ];

  return (
    <div className="space-y-8">
      <form onSubmit={handleAnalyze} className="space-y-6">
        {/* Input Method Tabs */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            How would you like to provide your LinkedIn profile?
          </label>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {methodTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setInputMethod(tab.key)}
                className={`relative px-4 py-3 rounded-lg border-2 text-center transition-all duration-200 ${
                  inputMethod === tab.key
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <span className="block text-sm font-semibold">{tab.label}</span>
                <span className="block text-xs mt-0.5 opacity-70">{tab.desc}</span>
                {inputMethod === tab.key && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </button>
            ))}
          </div>

          {/* PDF Upload */}
          {inputMethod === "pdf" && (
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  pdfFileName
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50"
                }`}
              >
                {parsingPdf ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-3 border-indigo-200 rounded-full animate-spin border-t-indigo-600" />
                    <p className="text-sm text-slate-600">Parsing PDF...</p>
                  </div>
                ) : pdfFileName ? (
                  <div>
                    <svg className="w-10 h-10 mx-auto mb-2 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-emerald-700 font-medium">{pdfFileName}</p>
                    <p className="text-xs text-emerald-600 mt-1">
                      PDF parsed successfully. Click to upload a different file.
                    </p>
                  </div>
                ) : (
                  <div>
                    <svg className="w-10 h-10 mx-auto mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <p className="text-slate-700 font-medium">
                      Click to upload your LinkedIn PDF
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Go to LinkedIn &rarr; Your profile &rarr; More &rarr; Save to
                      PDF
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Paste Text */}
          {inputMethod === "paste" && (
            <textarea
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              placeholder={`Paste your LinkedIn profile here. Include:\n- Name and headline\n- About/Summary\n- Work experience (titles, companies, descriptions)\n- Education\n- Skills`}
              rows={10}
              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-y"
            />
          )}

          {/* Show extracted text preview for PDF method */}
          {inputMethod === "pdf" && profileText && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">
                  Extracted profile text (editable)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setProfileText("");
                    setPdfFileName("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              </div>
              <textarea
                value={profileText}
                onChange={(e) => setProfileText(e.target.value)}
                rows={8}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-y"
              />
            </div>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here including requirements, responsibilities, and qualifications..."
            rows={10}
            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-y"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-500 hover:to-violet-500 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 shadow-lg shadow-indigo-200 animate-pulse-glow"
        >
          {loading ? "Analyzing..." : "Analyze My Profile"}
        </button>
      </form>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Results */}
      {result && !loading && (
        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Your Analysis Results
          </h2>
          <ResultsPanel result={result} />
        </div>
      )}
    </div>
  );
}
