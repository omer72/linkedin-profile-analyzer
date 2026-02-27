# LinkedIn Profile Analyzer

AI-powered HR consultant that analyzes your LinkedIn profile against any job description. Upload a PDF or paste your profile text, provide a job description, and get a detailed analysis with actionable feedback.

## Features

- **Match Score** — Animated score ring showing how well your profile aligns with the role
- **Key Strengths** — What already makes you a strong candidate
- **Skill Gaps** — Areas to improve before applying
- **Profile Optimization** — Section-by-section suggestions for your LinkedIn profile
- **Interview Preparation** — Likely questions with guidance on how to answer
- **Company Intel** — Financial status, growth trajectory, culture signals, and recent news

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: OpenAI GPT-4o with JSON response mode
- **Styling**: Tailwind CSS v4 with Geist font
- **PDF Parsing**: pdf-parse
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Setup

```bash
git clone https://github.com/omer72/linkedin-profile-analyzer.git
cd linkedin-profile-analyzer
npm install
```

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=sk-your-key-here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build      # Production build
npm start          # Run production build
npm run lint       # ESLint
npx tsc --noEmit   # Type check
```

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts      # POST — sends profile + JD to GPT-4o
│   │   └── parse-pdf/route.ts    # POST — extracts text from uploaded PDF
│   ├── globals.css               # Tailwind config, animations, dot-grid pattern
│   ├── layout.tsx                # Root layout with Geist fonts
│   └── page.tsx                  # Header, footer, main container
├── components/
│   ├── AnalyzerForm.tsx          # PDF upload / text paste form + submit
│   ├── LoadingSpinner.tsx        # Dual-ring spinner with step-by-step progress
│   └── ResultsPanel.tsx          # Score ring, sections, interview prep, company intel
└── lib/
    ├── openai.ts                 # GPT-4o integration with HR consultant prompt
    └── types.ts                  # TypeScript interfaces (AnalysisResult, etc.)
```

## How It Works

1. User uploads a LinkedIn PDF or pastes their profile text
2. PDF is parsed server-side via the `/api/parse-pdf` endpoint
3. Profile text + job description are sent to `/api/analyze`
4. GPT-4o (temperature 0.7) returns structured JSON following a defined schema
5. Results are rendered with animated score ring, colored indicators, and card-based layout

## License

MIT
