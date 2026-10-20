import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import ProductDetails from "../../../components/ProductDetails";
import { headers } from "next/headers";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

async function ProtectedProductPage({ params }) {
  const { slug } = await params;
const session = await auth.api.getSession({
  headers: await headers(),
});

  if (!session?.user) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

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
        <div className="min-h-screen bg-[#f0f6f1] px-4 py-8" aria-hidden="true">
          <div className="mx-auto h-24 w-full max-w-[1000px] animate-pulse rounded-xl bg-[#fbfdfc]" />
        </div>
      }
    >
      <ProtectedProductPage params={params} />
    </Suspense>
  );
}