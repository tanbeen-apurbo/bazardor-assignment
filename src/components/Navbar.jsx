import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import UserInfo from "./UserInfo";
import NavLinks from "./NavLinks";

async function DhakaDate() {
  await connection();

  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
}

function NavLinksFallback() {
  return (
    <div aria-hidden="true" className="border-y border-[#e9ece9] bg-white">
      <div className="mx-auto flex h-[48px] w-[calc(100%-32px)] max-w-[1248px] items-center gap-2 overflow-hidden sm:w-[calc(100%-48px)]">
        {[1, 2, 3, 4, 5].map((item) => (
          <span
            key={item}
            className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-[#f0f2f0]"
          />
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="w-full bg-[#fafafa] font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif]">
      <header className="h-[68px] w-full bg-[#fafafa] text-[#17221c]">
        <div className="mx-auto flex h-full w-[calc(100%-32px)] max-w-[1248px] items-center justify-between sm:w-[calc(100%-48px)] max-[380px]:w-[calc(100%-20px)]">
          <Link
            href="/"
            aria-label="বাজার দর"
            className="flex min-w-0 items-center gap-2 text-inherit no-underline max-[380px]:gap-1.5"
          >
            <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-[14px] bg-[#078b45] sm:h-11 sm:w-11 max-[380px]:h-9 max-[380px]:w-9">
              <Image
                src="/logo-icon.png"
                alt=""
                width={24}
                height={24}
                className="object-contain"
              />
            </span>

            <span className="flex min-w-0 flex-col justify-center">
              <span className="whitespace-nowrap text-[18px] font-bold leading-[22px] tracking-[-0.3px] sm:text-[20px] sm:leading-6 max-[380px]:text-[15px] max-[380px]:leading-[19px]">
                বাজার দর
              </span>
              <span className="whitespace-nowrap text-[11px] font-normal leading-[15px] text-[#646d67] sm:text-xs sm:leading-4 max-[380px]:text-[10px] max-[380px]:leading-3">
                <Suspense fallback={<>&nbsp;</>}>
                  <DhakaDate />
                </Suspense>
              </span>
            </span>
          </Link>

          <UserInfo />
        </div>
      </header>

      <Suspense fallback={<NavLinksFallback />}>
        <NavLinks />
      </Suspense>
    </div>
  );
}