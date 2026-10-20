import NavLinksClient from "./NavLinksClient";

export default async function NavLinks() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  const payload = await res.json();
  const items =
    payload?.data?.categories ??
    payload?.data ??
    payload?.categories ??
    payload;

  const navItems = Array.isArray(items) ? items : [];

  return <NavLinksClient items={navItems} />;
}