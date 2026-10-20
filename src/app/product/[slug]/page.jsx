import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "../../../components/ProductDetails";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

async function ProductPageContent({ params }) {
  const { slug } = await params;

  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) notFound();

  const payload = await res.json();

  const products = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.data?.products)
        ? payload.data.products
        : Array.isArray(payload?.products)
          ? payload.products
          : [];

  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}

export default function ProductPage({ params }) {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen bg-[#f0f6f1] px-4 py-8"
          aria-hidden="true"
        >
          <div className="mx-auto h-24 w-full max-w-[1000px] animate-pulse rounded-xl bg-[#fbfdfc]" />
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}