"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinksClient({ items }) {
  const pathname = usePathname();
  const match = pathname?.match(/^\/category\/([^/]+)\/?$/);
  const selectedSlug = match ? decodeURIComponent(match[1]) : null;

  return (
    <nav
      aria-label="বিভাগসমূহ"
      className="w-full border-y border-[#e5ebe6] bg-[#fafcfb]"
    >
      <div className="mx-auto flex min-h-[48px] max-w-[1248px] items-center gap-3 overflow-x-auto px-4 py-2 sm:px-6">
        {items.map((item) => {
          const selected = item.slug === selectedSlug;

          return (
            <Link
              key={item.id ?? item.slug}
              href={`/category/${encodeURIComponent(item.slug)}`}
              aria-current={selected ? "page" : undefined}
              className={`inline-flex h-8 shrink-0 items-center gap-2 whitespace-nowrap rounded-[8px] px-3 text-[15px] font-semibold no-underline transition-colors ${
                selected
                  ? "bg-[#078b45] text-white"
                  : "bg-transparent text-[#17221c] hover:bg-[#eef6f0]"
              }`}
            >
              {item.icon}
              {item.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}