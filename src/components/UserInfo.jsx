import Link from "next/link";

export default function UserInfo() {
  return (
    <nav
      aria-label="অ্যাকাউন্ট"
      className="flex flex-none items-center gap-3 sm:gap-8 max-[380px]:gap-2"
    >
      <Link
        href="/sign-in"
        className="whitespace-nowrap text-sm font-semibold leading-6 text-[#17221c] no-underline sm:text-base max-[380px]:text-xs"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="inline-flex h-[41px] items-center justify-center whitespace-nowrap rounded-[11px] bg-[#078b45] px-[13px] text-sm font-medium text-white no-underline shadow-[0_3px_5px_rgba(0,70,34,0.30)] sm:h-[45px] sm:min-w-[103px] sm:px-[18px] sm:text-[15px] max-[380px]:h-[38px] max-[380px]:px-[9px] max-[380px]:text-xs"
      >
        সাইন আপ
      </Link>
    </nav>
  );
}