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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            How would you like to provide your LinkedIn profile?
          </label>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {methodTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setInputMethod(tab.key)}
                className={`px-4 py-3 rounded-lg border-2 text-center transition ${
                  inputMethod === tab.key
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <span className="block text-sm font-semibold">{tab.label}</span>
                <span className="block text-xs mt-0.5 opacity-70">{tab.desc}</span>
              </button>
            ))}
          </div>

          {/* PDF Upload */}
          {inputMethod === "pdf" && (
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                  pdfFileName
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {parsingPdf ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-3 border-blue-200 rounded-full animate-spin border-t-blue-600" />
                    <p className="text-sm text-gray-600">Parsing PDF...</p>
                  </div>
                ) : pdfFileName ? (
                  <div>
                    <p className="text-green-700 font-medium">{pdfFileName}</p>
                    <p className="text-xs text-green-600 mt-1">
                      PDF parsed successfully. Click to upload a different file.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-gray-700 font-medium">
                      Click to upload your LinkedIn PDF
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-y"
            />
          )}

          {/* Show extracted text preview for PDF method */}
          {inputMethod === "pdf" && profileText && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-y"
              />
            </div>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here including requirements, responsibilities, and qualifications..."
            rows={10}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-y"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-200"
        >
          {loading ? "Analyzing..." : "Analyze My Profile"}
        </button>
      </form>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Results */}
      {result && !loading && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Analysis Results
          </h2>
          <ResultsPanel result={result} />
        </div>
      )}
    </div>
  );
}
