import ProductCard from "./ProductCard";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

const ProductSections = async () => {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  const payload = res.ok ? await res.json() : [];

  const products = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.data?.products)
        ? payload.data.products
        : Array.isArray(payload?.products)
          ? payload.products
          : [];

  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) => Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0)
    )
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) => Number(a.change?.pct ?? 0) - Number(b.change?.pct ?? 0)
    )
    .slice(0, 6);

  const gridClass =
    "grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 min-[700px]:grid-cols-3";

  return (
    <div className="mx-auto w-[94%] max-w-[1200px] space-y-6 py-5 font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif]">
      <section aria-labelledby="risers-heading">
        <h2
          id="risers-heading"
          className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#202a23]"
        >
          <span className="text-[#078b45]">▲</span>
          আজ দাম বেড়েছে
        </h2>

        <div className={gridClass}>
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section aria-labelledby="fallers-heading">
        <h2
          id="fallers-heading"
          className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#202a23]"
        >
          <span className="text-[#d34747]">▼</span>
          আজ দাম কমেছে
        </h2>

        <div className={gridClass}>
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section aria-labelledby="all-products-heading">
        <h2
          id="all-products-heading"
          className="text-[15px] font-bold text-[#202a23]"
        >
          সব পণ্য
        </h2>
        <p className="mb-4 mt-1 text-[11px] text-[#77817a]">
          প্রতি পণ্যের বর্তমান বাজারদর ও দামের পরিবর্তন
        </p>

        {products.length > 0 ? (
          <div className={gridClass}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-[#e2e9e4] bg-[#fbfdfc] p-4 text-sm text-[#68716b]">
            পণ্যের তথ্য পাওয়া যাচ্ছে না।
          </p>
        )}
      </section>
    </div>
  );
};

export default ProductSections;