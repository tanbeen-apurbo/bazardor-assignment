import { Suspense } from "react";
import HeroBanner from "../components/Banner";
import ProductSections from "../components/ProductSection";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f0f6f1]">
      <Suspense
        fallback={
          <div className="min-h-[270px] bg-[#f1f6f2]" aria-hidden="true" />
        }
      >
        <HeroBanner />
      </Suspense>

      <Suspense
        fallback={
          <div
            className="mx-auto min-h-[700px] w-[92%] animate-pulse bg-[#f0f6f1] sm:w-[82%]"
            aria-hidden="true"
          />
        }
      >
        <ProductSections />
      </Suspense>
    </main>
  );
}