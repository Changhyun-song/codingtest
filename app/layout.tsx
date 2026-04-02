import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codility Practice",
  description: "Local coding test practice platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen bg-[#0d1117] text-[#e6edf3] antialiased">
        <header className="border-b border-[#30363d] bg-[#161b22]">
          <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-6">
            <a href="/" className="flex items-center gap-2 font-semibold text-[#e6edf3] hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Codility Practice
            </a>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
