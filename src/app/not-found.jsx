import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-160px)] items-center justify-center overflow-hidden bg-[#f1f6f2] px-4 py-12 font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] text-[#202a23]">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-[#dff1e5] opacity-70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-16 -z-10 h-72 w-72 rounded-full bg-[#e4f0e8] opacity-80 blur-3xl"
      />

      <section className="w-full max-w-[560px] rounded-[28px] border border-white/80 bg-[#fbfdfc]/90 p-7 text-center shadow-[0_20px_60px_rgba(33,61,42,0.10)] backdrop-blur sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#e6f4ea] text-4xl shadow-inner">
          🛒
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-[#078b45]">
          404 · পৃষ্ঠা পাওয়া যায়নি
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          এই ঠিকানায় কোনো পৃষ্ঠা নেই
        </h1>

        <p className="mx-auto mt-4 max-w-[390px] text-sm leading-7 text-[#68716b] sm:text-base">
          ঠিকানাটি পরীক্ষা করে আবার চেষ্টা করুন, অথবা বাজার দর-এর হোম পেজে ফিরে
          যান।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#078b45] px-6 py-3 text-sm font-semibold text-white no-underline shadow-[0_5px_12px_rgba(7,139,69,0.22)] transition hover:-translate-y-0.5 hover:bg-[#06783c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078b45]"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}