import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

const HeroBanner = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="bg-[#f1f6f2] px-4 py-[18px] font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] sm:px-6">
      <div className="mx-auto grid min-h-[214px] w-full max-w-[848px] grid-cols-1 items-center gap-3 rounded-[20px] border border-[#e0eae3] bg-[#fbfdfc] px-3 py-4 sm:grid-cols-[minmax(0,1fr)_190px] sm:gap-6 sm:py-2">
        <div className="min-w-0">
          <span className="inline-flex rounded-full bg-[#e3f2e9] px-[10px] py-[3px] text-[11px] leading-4 text-[#078b45]">
            {date}
          </span>

          <h1 className="mt-2 text-[23px] font-bold leading-[1.35] tracking-[-0.3px] text-[#202a23] sm:text-[26px] sm:leading-[1.25]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-[440px] text-[12px] leading-[1.65] text-[#68716b]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম—বাজারভিত্তিক
            বর্তমান তথ্য এবং দামের পরিবর্তন এক জায়গায়!
          </p>

          <Link
            href="/products"
            className="mt-[18px] inline-flex h-[33px] items-center justify-center rounded-[6px] bg-[#078b45] px-4 text-[12px] font-semibold text-white no-underline shadow-[0_2px_4px_rgba(0,70,34,0.28)] transition-colors hover:bg-[#06783c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078b45]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex justify-center sm:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের সবজির ঝুড়ি"
            width={280}
            height={240}
            priority
            className="h-auto w-[150px] object-contain sm:w-[180px]"
            sizes="(max-width: 640px) 150px, 180px"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;