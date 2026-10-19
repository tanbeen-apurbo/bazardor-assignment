import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NavLinks() {
  async function selectCategory(formData) {
    "use server";

    const slug = String(formData.get("slug") ?? "");
    if (!slug) return;

    const cookieStore = await cookies();
    cookieStore.set("selected-category", slug, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    redirect(`/category/${encodeURIComponent(slug)}`);
  }

  const [res, cookieStore] = await Promise.all([
    fetch("https://openapi.programming-hero.com/api/bazardor/categories"),
    cookies(),
  ]);

  if (!res.ok) return null;

  const payload = await res.json();
  const items =
    payload?.data?.categories ??
    payload?.data ??
    payload?.categories ??
    payload;
  const navItems = Array.isArray(items) ? items : [];
  const selectedSlug =
    cookieStore.get("selected-category")?.value ?? "chal";

  return (
    <nav
      aria-label="বিভাগসমূহ"
      className="w-full border-y border-[#e5ebe6] bg-[#fafcfb]"
    >
      <div className="mx-auto flex min-h-[48px] max-w-[1248px] items-center gap-3 overflow-x-auto px-4 py-2 sm:px-6">
        {navItems.map((item) => {
          const selected = item.slug === selectedSlug;

          return (
            <form key={item.id ?? item.slug} action={selectCategory}>
              <input type="hidden" name="slug" value={item.slug} />
              <button
                type="submit"
                aria-pressed={selected}
                className={`inline-flex h-8 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-[8px] px-3 text-[15px] font-semibold transition-colors ${
                  selected
                    ? "bg-[#078b45] text-white"
                    : "bg-transparent text-[#17221c] hover:bg-[#eef6f0]"
                }`}
              >
                {item.icon}
                {item.nameBn}
              </button>
            </form>
          );
        })}
      </div>
    </nav>
  );
}