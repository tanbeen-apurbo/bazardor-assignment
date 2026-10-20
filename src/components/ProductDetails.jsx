import Link from "next/link";

const units = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const priceFormat = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const formatPrice = (value) => `${priceFormat.format(Number(value ?? 0))} টাকা`;

const ProductDetails = ({ product }) => {
  const markets = Array.isArray(product.markets) ? product.markets : [];

  const marketRows = markets.map((market) => {
    const min = Number(market.min ?? product.today ?? 0);
    const max = Number(market.max ?? product.today ?? 0);

    return {
      ...market,
      min,
      max,
      average: (min + max) / 2,
    };
  });

  const minimumPrice = marketRows.length
    ? Math.min(...marketRows.map((market) => market.min))
    : Number(product.today ?? 0);

  const maximumPrice = marketRows.length
    ? Math.max(...marketRows.map((market) => market.max))
    : Number(product.today ?? 0);

  const averagePrice = marketRows.length
    ? marketRows.reduce((sum, market) => sum + market.average, 0) /
      marketRows.length
    : Number(product.today ?? 0);

  const direction = product.change?.dir;
  const isUp = direction === "up";
  const isDown = direction === "down";

  const changeClass = isUp
    ? "bg-[#eaf5ee] text-[#078b45]"
    : isDown
      ? "bg-[#fbefef] text-[#d34747]"
      : "bg-[#eef1ef] text-[#77817a]";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";
  const percent = priceFormat.format(
    Math.abs(Number(product.change?.pct ?? 0))
  );

  const summary = [
    { label: "সর্বনিম্ন দাম", value: minimumPrice, color: "text-[#078b45]" },
    { label: "সর্বোচ্চ দাম", value: maximumPrice, color: "text-[#d34747]" },
    { label: "গড় দাম", value: averagePrice, color: "text-[#078b45]" },
  ];

  return (
    <main className="min-h-screen bg-[#f0f6f1] font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] text-[#202a23]">
      <div className="mx-auto w-[92%] max-w-[1120px] py-5 sm:w-[82%]">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 text-[10px] text-[#68716b]"
        >
          <Link href="/" className="text-inherit no-underline hover:underline">
            হোম
          </Link>
          <span>/</span>
          <span>{product.categoryNameBn || "পণ্য"}</span>
          <span>/</span>
          <span className="text-[#202a23]">{product.nameBn}</span>
        </nav>

        <section className="flex items-center gap-3 rounded-[12px] border border-[#e2e9e4] bg-[#fbfdfc] p-3 sm:gap-4 sm:p-4">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-[9px] bg-[#f0f5f1] text-[23px] sm:h-12 sm:w-12 sm:text-[26px]">
            {product.image || product.categoryIcon || "🛒"}
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="text-[15px] font-bold leading-5 sm:text-[18px]">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-[10px] text-[#68716b] sm:text-[11px]">
              {units[product.unit] ?? `প্রতি ${product.unit ?? ""}`}
              {markets.length > 0 && ` · ${priceFormat.format(markets.length)}টি বাজারে আজকের দাম`}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.categoryNameBn && (
                <span className="rounded-full bg-[#eaf5ee] px-2 py-0.5 text-[9px] text-[#078b45]">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
              )}
              <span className="rounded-full bg-[#f0f3f1] px-2 py-0.5 text-[9px] text-[#68716b]">
                {units[product.unit] ?? product.unit}
              </span>
            </div>
          </div>

          <div className="flex w-[68px] flex-none flex-col items-center justify-center rounded-[9px] bg-[#f0f5f1] px-2 py-2 text-center sm:w-[82px]">
            <span className="text-[8px] text-[#68716b] sm:text-[9px]">
              আজকের দাম
            </span>
            <span className="text-[15px] font-bold leading-5 sm:text-[17px]">
              {priceFormat.format(Number(product.today ?? 0))}
            </span>
            <span className="text-[8px] text-[#68716b]">
              {units[product.unit] ?? product.unit}
            </span>
            <span className={`mt-1 rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${changeClass}`}>
              {arrow} {percent}%
            </span>
          </div>
        </section>

        <section className="mt-3 rounded-[12px] border border-[#e2e9e4] bg-[#fbfdfc] p-3 sm:p-4">
          <h2 className="mb-3 text-[12px] font-bold sm:text-[13px]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2 min-[440px]:grid-cols-3">
            {summary.map((item) => (
              <div
                key={item.label}
                className="rounded-[9px] border border-[#e2e9e4] px-3 py-2"
              >
                <p className="text-[9px] text-[#68716b] sm:text-[10px]">
                  {item.label}
                </p>
                <p className={`mt-1 text-[13px] font-bold sm:text-[15px] ${item.color}`}>
                  {formatPrice(item.value)}
                </p>
                <p className="mt-0.5 text-[8px] text-[#879089]">
                  বাজারভিত্তিক দামের তথ্য
                </p>
              </div>
            ))}
          </div>

          <h2 className="mb-2 mt-4 text-[12px] font-bold sm:text-[13px]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {marketRows.length > 0 ? (
            <div className="overflow-x-auto rounded-[9px] border border-[#e2e9e4]">
              <table className="w-full min-w-[580px] border-collapse text-left text-[9px] sm:text-[10px]">
                <thead className="bg-[#f7faf8] text-[#68716b]">
                  <tr>
                    <th className="px-2 py-2 font-medium sm:px-3">বাজার</th>
                    <th className="px-2 py-2 font-medium sm:px-3">বিভাগ</th>
                    <th className="px-2 py-2 text-right font-medium sm:px-3">
                      সর্বনিম্ন
                    </th>
                    <th className="px-2 py-2 text-right font-medium sm:px-3">
                      সর্বোচ্চ
                    </th>
                    <th className="px-2 py-2 text-right font-medium sm:px-3">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketRows.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className={
                        index % 2 === 0
                          ? "border-t border-[#e2e9e4] bg-[#fbfdfc]"
                          : "border-t border-[#e2e9e4] bg-[#f1f6f2]"
                      }
                    >
                      <td className="px-2 py-2 sm:px-3">{market.market}</td>
                      <td className="px-2 py-2 text-[#68716b] sm:px-3">
                        {market.division}
                      </td>
                      <td className="px-2 py-2 text-right sm:px-3">
                        {formatPrice(market.min)}
                      </td>
                      <td className="px-2 py-2 text-right sm:px-3">
                        {formatPrice(market.max)}
                      </td>
                      <td className="px-2 py-2 text-right font-semibold sm:px-3">
                        {formatPrice(market.average)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-lg bg-[#f7faf8] p-3 text-[10px] text-[#68716b]">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;