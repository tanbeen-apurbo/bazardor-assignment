import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import CategoryItems from "../../../components/CategoryItems";
import { auth } from "../../../lib/auth";

async function CategoryPageContent({ params, searchParams }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const categorySlug = String(slug ?? "").trim().toLowerCase();

  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("বিভাগের তথ্য লোড করা যায়নি।");
  }

  const payload = await response.json();
  const categoryData =
    payload?.data?.categories ??
    payload?.data ??
    payload?.categories ??
    payload;

  const categories = Array.isArray(categoryData) ? categoryData : [];
  const category = categories.find(
    (item) => String(item?.slug ?? "").trim().toLowerCase() === categorySlug
  );

  // Only genuinely unknown category slugs show the 404 page.
  if (!category) {
    notFound();
  }

  // A real category requires a session.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <CategoryItems slug={categorySlug} sort={query?.sort} />;
}

function CategoryLoading() {
  return (
    <main className="min-h-[400px] bg-[#f1f6f2] px-4 py-8">
      <div className="mx-auto grid max-w-6xl animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      <p className="sr-only">বিভাগের পণ্য লোড হচ্ছে…</p>
    </main>
  );
}

export default function CategoryPage({ params, searchParams }) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}