import Image from "next/image";
import AnalyzerForm from "@/components/AnalyzerForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
          <Image
            src="/Gemini_Generated_Image_i3s2ufi3s2ufi3s2.png"
            alt="LinkedIn Profile Analyzer logo"
            width={56}
            height={56}
            className="rounded-xl"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              LinkedIn Profile Analyzer
            </h1>
            <p className="text-gray-600 mt-1">
              AI-powered HR consultant that analyzes your profile against any job
              description
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnalyzerForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          Powered by OpenAI GPT-4o. Your data is not stored.
        </div>
      </footer>
    </div>
  );
}
