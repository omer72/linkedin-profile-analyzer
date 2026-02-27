"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600" />
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">
          Analyzing your profile...
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Our AI HR consultant is reviewing your profile against the job
          description
        </p>
      </div>
    </div>
  );
}
