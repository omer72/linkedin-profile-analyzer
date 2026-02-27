export interface AnalysisRequest {
  profileText: string;
  jobDescription: string;
}

export interface CompanyAnalysis {
  companyName: string;
  overview: string;
  financialStatus: string;
  recentNews: string[];
  concerns: string[];
  cultureSignals: string[];
  growthTrajectory: string;
}

export interface AnalysisResult {
  matchScore: number;
  matchExplanation: string;
  strengths: string[];
  skillGaps: string[];
  profileUpdates: ProfileUpdate[];
  interviewPrep: InterviewQuestion[];
  additionalTips: string[];
  companyAnalysis: CompanyAnalysis;
}

export interface ProfileUpdate {
  section: string;
  suggestion: string;
}

export interface InterviewQuestion {
  question: string;
  howToAnswer: string;
}

