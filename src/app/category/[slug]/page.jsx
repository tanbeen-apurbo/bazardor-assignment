import { Suspense } from "react";
import CategoryItems from "../../../components/CategoryItems";

async function CategoryPageContent({ params, searchParams }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  return <CategoryItems slug={slug} sort={query?.sort} />;
}

export default function CategoryPage({ params, searchParams }) {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-[400px] bg-[#f0f6f1]"
          aria-hidden="true"
        />
      }
    >
      <CategoryPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}