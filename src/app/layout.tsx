import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Talk - AI 챗봇",
  description: "Next.js와 OpenAI를 활용한 AI 챗봇 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav className="nav-container">
          <div className="nav-content">
            <h1 className="nav-brand">Open Talk</h1>
            <div className="space-x-2">
              <a href="/" className="nav-link">홈</a>
              <a href="/chat" className="nav-link">챗봇</a>
              <a href="/role" className="nav-link">역할 AI</a>
              <a href="/blog-writer" className="nav-link">블로그 작성</a>
              <a href="/json-ui" className="nav-link">JSON UI</a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
