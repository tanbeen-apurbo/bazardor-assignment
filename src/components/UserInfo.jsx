"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

const SOCIAL_TOAST_KEY = "bazardor-social-auth-toast";

export default function UserInfo() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;

    const storedToast = sessionStorage.getItem(SOCIAL_TOAST_KEY);
    if (!storedToast) return;

    sessionStorage.removeItem(SOCIAL_TOAST_KEY);

    try {
      const pendingToast = JSON.parse(storedToast);

      if (!pendingToast.expiresAt || pendingToast.expiresAt < Date.now()) {
        return;
      }

      toast.success(
        pendingToast.flow === "sign-up"
          ? "সাইন আপ সফল হয়েছে।"
          : "সাইন ইন সফল হয়েছে।"
      );
    } catch {
      // Ignore invalid session storage data.
    }
  }, [user?.id]);

 async function handleSignOut() {
  setSigningOut(true);

  try {
    const result = await authClient.signOut();

    if (result?.error) {
      throw new Error(result.error.message || "সাইন আউট করা যায়নি।");
    }

    window.location.replace("/");
  } catch (error) {
    toast.error(error.message || "সাইন আউট করা যায়নি।");
    setSigningOut(false);
  }
}

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-[#eef2ef]" />;
  }

  if (!user) {
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

  const displayName =
    user.name?.trim() || user.email?.split("@")[0] || "প্রোফাইল";

  return (
    <nav aria-label="অ্যাকাউন্ট" className="flex flex-none items-center">
      <details className="group relative">
        <summary
          aria-label="প্রোফাইল মেনু খুলুন"
          className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-1 py-1 text-[#17221c] marker:hidden [&::-webkit-details-marker]:hidden"
        >
          <span className="relative grid h-[29px] w-[29px] flex-none place-items-center overflow-hidden rounded-[8px] bg-[#eef2ef]">
            {user.image && !avatarFailed ? (
              <Image
                src={user.image}
                alt={`${displayName}-এর প্রোফাইল ছবি`}
                width={29}
                height={29}
                unoptimized
                onError={() => setAvatarFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-[#078b45]">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </span>

          <span className="max-w-[110px] truncate text-[11px] font-medium sm:text-xs">
            {displayName.split(" ")[0]}
          </span>

          <span
            aria-hidden="true"
            className="text-[9px] text-[#68716b] transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>

        <div className="absolute right-0 top-full z-50 mt-2 w-[192px] rounded-[14px] border border-[#e1eae4] bg-[#fbfdfc] p-3 shadow-[0_5px_14px_rgba(25,45,32,0.16)]">
          <p className="truncate text-[12px] font-semibold leading-[18px] text-[#202a23]">
            {user.name || displayName}
          </p>

          <p className="truncate text-[10px] leading-4 text-[#758078]">
            {user.email}
          </p>

          <div className="my-2 h-px bg-[#edf1ee]" />

          <Link
            href="/profile"
            className="block rounded-md py-1.5 text-[11px] font-medium text-[#26352b] no-underline hover:bg-[#f0f5f1]"
          >
            👤 আমার প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="block w-full rounded-md py-1.5 text-left text-[11px] font-medium text-[#e34141] hover:bg-[#fff4f4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {signingOut ? "অপেক্ষা করুন…" : "↩ সাইন আউট"}
          </button>
        </div>
      </details>
    </nav>
  );
}