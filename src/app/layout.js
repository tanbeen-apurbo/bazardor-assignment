import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Suspense } from "react";
import MarqueePage from "../components/Marquee";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

function HeaderSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-[116px] animate-pulse border-b border-[#e5ebe6] bg-[#fbfdfc]"
    />
  );
}

function TickerSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-10 animate-pulse border-y border-[#e5ebe6] bg-[#f6faf7]"
    />
  );
}

function PageSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="পৃষ্ঠা লোড হচ্ছে"
      className="min-h-[400px] flex-1 bg-[#f1f6f2] px-4 py-8"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-6 h-6 w-44 rounded bg-[#dce9df]" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#e0eae3] bg-[#fbfdfc] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-[#e8efea]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/5 rounded bg-[#e2ebe5]" />
                  <div className="h-3 w-2/5 rounded bg-[#edf2ee]" />
                </div>
              </div>
              <div className="mt-5 h-3 w-1/4 rounded bg-[#edf2ee]" />
              <div className="mt-2 h-5 w-24 rounded bg-[#e2ebe5]" />
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">পৃষ্ঠা লোড হচ্ছে…</p>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={<HeaderSkeleton />}>
          <Navbar />
        </Suspense>

        <Suspense fallback={<TickerSkeleton />}>
          <MarqueePage />
        </Suspense>

        <Suspense fallback={<PageSkeleton />}>
          <main className="flex-1">{children}</main>
        </Suspense>

        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="h-14 animate-pulse border-t border-[#e5ebe6] bg-[#fbfdfc]"
            />
          }
        >
          <Footer />
        </Suspense>

        <Toaster />
      </body>
    </html>
  );
}