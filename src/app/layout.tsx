import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Profile Analyzer - AI HR Consultant",
  description:
    "Analyze your LinkedIn profile against any job description. Get AI-powered feedback on match score, skill gaps, profile optimization, and interview preparation.",
  icons: {
    icon: "/Gemini_Generated_Image_85738v85738v8573.png",
    apple: "/Gemini_Generated_Image_85738v85738v8573.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 bg-dot-pattern`}
      >
        {children}
      </body>
    </html>
  );
}
