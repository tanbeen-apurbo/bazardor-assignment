import Link from "next/link";

const MarqueePage = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  if (!res.ok) return null;

  const payload = await res.json();

  const products = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.data?.products)
        ? payload.data.products
        : [];

  if (products.length === 0) return null;

  const formatPrice = new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  });

  const formatPercent = new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return (
    <>
      <style>{`
        @keyframes bazardor-price-marquee {
          to {
            transform: translateX(-50%);
          }
        }

        .bazardor-price-marquee-track {
          animation: bazardor-price-marquee 50s linear infinite;
        }

        .bazardor-price-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .bazardor-price-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className=" h-9 w-full overflow-hidden border-y border-[#e6eae7] bg-[#fafcfb] font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] text-[#26302a]">
        <div className="bazardor-price-marquee-track flex w-max">
          {[false, true].map((isDuplicate) => (
            <div
              key={String(isDuplicate)}
              aria-hidden={isDuplicate ? "true" : undefined}
              className="flex shrink-0 pr-3"
            >
              {products.map((product) => {
                const direction = product.change?.dir;
                const isUp = direction === "up";
                const isDown = direction === "down";

                const color = isUp
                  ? "text-[#d83a42]"
                  : isDown
                    ? "text-[#159451]"
                    : "text-[#7b817d]";

                const arrow = isUp ? "▲" : isDown ? "▼" : "•";
                const percentage = formatPercent.format(
                  Math.abs(product.change?.pct ?? 0)
                );

                const item = (
                  <>
                    <span aria-hidden="true">{product.image}</span>
                    <span>{product.nameBn}</span>
                    <span>
                      {formatPrice.format(product.today)} টাকা/
                      {units[product.unit] ?? product.unit}
                    </span>
                    <span className={`font-semibold ${color}`}>
                      {arrow} {percentage}%
                    </span>
                  </>
                );

                const className =
                  "inline-flex h-9 items-center gap-1.5 whitespace-nowrap border-r border-[#e3e8e4] px-3 text-[11px] text-inherit no-underline sm:px-4 sm:text-xs";

                return isDuplicate ? (
                  <span key={product.id} className={className}>
                    {item}
                  </span>
                ) : (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className={className}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarqueePage;