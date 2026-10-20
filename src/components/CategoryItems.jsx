import Link from "next/link";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

const units = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const priceFormat = new Intl.NumberFormat("bn-BD");
const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const CategoryItems = async ({ slug, sort = "default" }) => {
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

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  const sortedProducts = [...categoryProducts];

  if (sort === "price-asc") {
    sortedProducts.sort((a, b) => Number(a.today) - Number(b.today));
  } else if (sort === "price-desc") {
    sortedProducts.sort((a, b) => Number(b.today) - Number(a.today));
  }

  const category = categoryProducts[0];
  const categoryName = category?.categoryNameBn || slug;
  const categoryIcon = category?.categoryIcon || category?.image || "🛒";
  const unitLabel = units[category?.unit] || "পণ্যের বাজারদর";

  const sortLabel =
    sort === "price-asc"
      ? "দাম: কম থেকে বেশি"
      : sort === "price-desc"
        ? "দাম: বেশি থেকে কম"
        : "নির্বাচন";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f0f6f1] font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] text-[#202a23]">
      <div className="mx-auto w-[92%] max-w-[1200px] pb-10 pt-3 sm:w-[80%]">
        <section className="flex min-h-[47px] items-center gap-2 rounded-[10px] border border-[#e2e9e4] bg-[#fbfdfc] px-2.5 py-2">
          <span className="grid h-7 w-7 flex-none place-items-center rounded-[7px] bg-[#f0f5f1] text-[17px]">
            {categoryIcon}
          </span>

          <div className="min-w-0">
            <h1 className="text-[13px] font-bold leading-4">
              {categoryName}
            </h1>
            <p className="text-[9px] leading-3 text-[#77817a]">
              {priceFormat.format(categoryProducts.length)}টি পণ্যের আজকের দাম
              ও পরিবর্তন
            </p>
          </div>
        </section>

        <div className="mt-3 flex h-[34px] items-center justify-end rounded-[9px] border border-[#e2e9e4] bg-[#fbfdfc] px-2.5">
          <span className="mr-2 text-[9px] text-[#68716b]">সাজান</span>

          <details className="relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-[5px] border border-[#dce4de] px-2 py-1 text-[9px] text-[#4f5a53]">
              {sortLabel}
              <span aria-hidden="true" className="text-[8px]">
                ▼
              </span>
            </summary>

            <div className="absolute right-0 top-full z-10 mt-1 min-w-[150px] overflow-hidden rounded-md border border-[#e2e9e4] bg-white py-1 text-[10px] shadow-md">
              <Link
                href={`/category/${slug}`}
                className="block px-3 py-2 text-inherit no-underline hover:bg-[#f0f6f1]"
              >
                নির্বাচন
              </Link>
              <Link
                href={`/category/${slug}?sort=price-asc`}
                className="block px-3 py-2 text-inherit no-underline hover:bg-[#f0f6f1]"
              >
                দাম: কম থেকে বেশি
              </Link>
              <Link
                href={`/category/${slug}?sort=price-desc`}
                className="block px-3 py-2 text-inherit no-underline hover:bg-[#f0f6f1]"
              >
                দাম: বেশি থেকে কম
              </Link>
            </div>
          </details>
        </div>

        <p className="mb-2 mt-2 text-[9px] leading-3 text-[#77817a]">
          {unitLabel} পণ্যের বাজারদর
        </p>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 min-[700px]:grid-cols-3">
            {sortedProducts.map((product) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              const badgeClass = isUp
                ? "bg-[#eaf5ee] text-[#078b45]"
                : isDown
                  ? "bg-[#fbefef] text-[#d34747]"
                  : "bg-[#eef1ef] text-[#77817a]";

              const arrow = isUp ? "▲" : isDown ? "▼" : "—";
              const percentage = percentFormat.format(
                Math.abs(Number(product.change?.pct ?? 0))
              );

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="flex min-h-[70px] flex-col justify-between rounded-[9px] border border-[#e2e9e4] bg-[#fbfdfc] p-2 text-inherit no-underline transition-colors hover:border-[#b8d7c3]"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="grid h-[26px] w-[26px] flex-none place-items-center rounded-[6px] bg-[#f0f5f1] text-[15px]">
                      {product.image || product.categoryIcon || "🛒"}
                    </span>

                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[10px] font-bold leading-[13px]">
                        {product.nameBn}
                      </span>
                      <span className="text-[8px] leading-[11px] text-[#77817a]">
                        {units[product.unit] || `প্রতি ${product.unit || ""}`}
                      </span>
                    </span>
                  </div>

                  <div className="mt-2 flex items-end justify-between gap-2">
                    <span className="flex flex-col">
                      <span className="text-[8px] leading-[10px] text-[#77817a]">
                        আজকের দাম
                      </span>
                      <span className="text-[11px] font-bold leading-[14px]">
                        {priceFormat.format(Number(product.today ?? 0))} টাকা
                      </span>
                    </span>

                    <span
                      className={`inline-flex flex-none items-center rounded-full px-1.5 py-0.5 text-[8px] font-semibold leading-[10px] ${badgeClass}`}
                    >
                      {arrow} {percentage}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[9px] border border-[#e2e9e4] bg-[#fbfdfc] p-4 text-[11px] text-[#68716b]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryItems;