import Link from "next/link";

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

const ProductCard = ({ product }) => {
  const direction = product.change?.dir;
  const isUp = direction === "up";
  const isDown = direction === "down";

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
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত`}
      className="flex min-h-[96px] flex-col justify-between rounded-[11px] border border-[#e2e9e4] bg-[#fbfdfc] p-3 text-inherit no-underline transition-colors hover:border-[#b8d7c3]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-[8px] bg-[#f0f5f1] text-[20px]">
          {product.image || product.categoryIcon || "🛒"}
        </span>

        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-bold leading-[17px] text-[#202a23]">
            {product.nameBn}
          </span>
          <span className="mt-0.5 text-[10px] leading-[14px] text-[#77817a]">
            {units[product.unit] ?? `প্রতি ${product.unit ?? ""}`}
          </span>
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="flex flex-col">
          <span className="text-[10px] leading-[13px] text-[#77817a]">
            আজকের দাম
          </span>
          <span className="mt-0.5 text-[14px] font-bold leading-[18px] text-[#202a23]">
            {priceFormat.format(Number(product.today ?? 0))} টাকা
          </span>
        </span>

        <span
          className={`inline-flex flex-none items-center rounded-full px-2 py-1 text-[10px] font-semibold leading-3 ${badgeClass}`}
        >
          {arrow} {percentage}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;