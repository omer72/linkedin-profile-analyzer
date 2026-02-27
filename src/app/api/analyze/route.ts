import { NextRequest, NextResponse } from "next/server";
import { analyzeProfile } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { profileText, jobDescription } = await request.json();

    if (!profileText?.trim()) {
      return NextResponse.json(
        { error: "Profile text is required" },
        { status: 400 }
      );
    }

    if (!jobDescription?.trim()) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const result = await analyzeProfile(profileText, jobDescription);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze profile. Please check your OpenAI API key." },
      { status: 500 }
    );
  }
}
