import AnalyzerForm from "@/components/AnalyzerForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            LinkedIn Profile Analyzer
          </h1>
          <p className="text-gray-600 mt-1">
            AI-powered HR consultant that analyzes your profile against any job
            description
          </p>
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
