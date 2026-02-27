import Image from "next/image";
import AnalyzerForm from "@/components/AnalyzerForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950">
        {/* Blurred mesh orbs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-10 flex items-center gap-5">
          <Image
            src="/Gemini_Generated_Image_i3s2ufi3s2ufi3s2.png"
            alt="LinkedIn Profile Analyzer logo"
            width={72}
            height={72}
            className="rounded-2xl ring-2 ring-white/20 shadow-xl"
          />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="text-white">LinkedIn Profile </span>
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Analyzer
              </span>
            </h1>
            <p className="text-slate-400 mt-1.5 text-lg">
              AI-powered HR consultant that analyzes your profile against any job
              description
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnalyzerForm />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-center gap-3 text-sm text-slate-500">
          <Image
            src="/Gemini_Generated_Image_i3s2ufi3s2ufi3s2.png"
            alt="Logo"
            width={20}
            height={20}
            className="rounded"
          />
          <span>&middot;</span>
          <span>Powered by OpenAI GPT-4o. Your data is not stored.</span>
        </div>
      </footer>
    </div>
  );
}
