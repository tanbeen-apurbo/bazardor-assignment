export default function Loading() {
  return (
    <main
      aria-label="লোড হচ্ছে"
      aria-busy="true"
      className="min-h-[calc(100svh-160px)] bg-[#f1f6f2] px-4 py-8 font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif]"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-[#dce9df]" />
          <div className="h-5 w-40 rounded-md bg-[#dce9df]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="min-h-[132px] rounded-xl border border-[#e0eae3] bg-[#fbfdfc] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 flex-none rounded-xl bg-[#e8efea]" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-3/5 rounded bg-[#e2ebe5]" />
                  <div className="h-3 w-2/5 rounded bg-[#edf2ee]" />
                </div>
              </div>

              <div className="mt-5 h-3 w-1/4 rounded bg-[#edf2ee]" />

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="h-5 w-24 rounded bg-[#e2ebe5]" />
                <div className="h-6 w-14 rounded-full bg-[#e8f4ec]" />
              </div>
            </div>
          ))}
        </div>

        <p className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</p>
      </div>
    </main>
  );
}