# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LinkedIn Profile Analyzer — a Next.js 16 app that uses OpenAI GPT-4o to analyze LinkedIn profiles against job descriptions. Users upload a PDF or paste profile text, provide a job description, and get a detailed analysis including match score, strengths, skill gaps, profile optimization tips, interview prep, and company intel.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Run production build
npm run lint     # ESLint
npx tsc --noEmit # Typecheck (no test runner configured yet)
```

## Architecture

**App Router (Next.js)** with two layers:

- **Client components** (`src/components/`) — `AnalyzerForm` handles input (PDF upload or text paste) and calls API routes; `ResultsPanel` renders the structured analysis; `LoadingSpinner` for loading state.
- **API routes** (`src/app/api/`) — two serverless endpoints:
  - `POST /api/parse-pdf` — accepts multipart FormData with a PDF file (max 5MB), extracts text via `pdf-parse`
  - `POST /api/analyze` — accepts `{ profileText, jobDescription }`, calls `analyzeProfile()` from `src/lib/openai.ts`, returns structured `AnalysisResult` JSON

**OpenAI integration** (`src/lib/openai.ts`) — uses GPT-4o with JSON response mode (temperature 0.7). The system prompt defines an HR consultant persona that returns a specific JSON schema.

**Types** (`src/lib/types.ts`) — core interfaces: `AnalysisResult`, `CompanyAnalysis`, `ProfileUpdate`, `InterviewQuestion`.

## Key Configuration

- `next.config.ts` marks `pdf-parse` as a server external package (CommonJS compatibility)
- Path alias: `@/*` → `./src/*`
- Environment variable: `OPENAI_API_KEY` (required, set in `.env.local` or Vercel dashboard)
- CI: `.github/workflows/ci.yml` runs typecheck + lint on push/PR to main
- Deployment: Vercel (auto-deploys on push to main)

## Styling

Tailwind CSS v4 with Geist font. Card-based UI with professional blue/gray palette. Responsive grid layouts using `md:` breakpoints.
