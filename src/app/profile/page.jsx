"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const user = session?.user;
  const displayName = user?.name || user?.email || "ব্যবহারকারী";

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result?.error) {
        throw new Error(result.error.message || "সাইন আউট করা যায়নি।");
      }

      toast.success("সাইন আউট হয়েছে।");
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <main className="min-h-[calc(100svh-160px)] bg-[#f0f5f1] px-4 pt-20 font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif]">
        <p className="mx-auto max-w-[550px] text-sm text-[#68716b]">
          প্রোফাইল লোড হচ্ছে…
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[calc(100svh-160px)] bg-[#f0f5f1] px-4 pt-20 font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif]">
        <div className="mx-auto max-w-[550px] rounded-xl border border-[#e1eae4] bg-[#fbfdfc] p-6 text-center">
          <p className="text-sm text-[#68716b]">প্রোফাইল দেখতে সাইন ইন করুন।</p>
          <Link
            href="/sign-in"
            className="mt-4 inline-flex h-9 items-center rounded-md bg-[#078b45] px-4 text-sm font-semibold text-white no-underline"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100svh-160px)] bg-[#f0f5f1] px-4 pb-16 pt-[88px] font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] text-[#202a23] sm:px-6">
      <div className="mx-auto w-full max-w-[550px]">
        <header>
          <h1 className="text-[19px] font-bold leading-7">আমার প্রোফাইল</h1>
          <p className="text-[11px] leading-[18px] text-[#758078]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <section className="mt-[18px] flex min-h-[89px] items-center justify-between gap-3 rounded-[12px] border border-[#e1eae4] bg-[#fbfdfc] p-4 sm:px-[18px]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-[54px] w-[58px] flex-none place-items-center overflow-hidden rounded-[12px] bg-[#eef1ef]">
              {user.image && !avatarFailed ? (
                <Image
                  src={user.image}
                  alt={`${displayName}-এর ছবি`}
                  width={58}
                  height={54}
                  unoptimized
                  onError={() => setAvatarFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold text-[#078b45]">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-semibold leading-5">
                {user.name || "নাম দেওয়া হয়নি"}
              </h2>
              <p className="truncate text-[12px] leading-[18px] text-[#68716b]">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex h-[31px] flex-none items-center justify-center rounded-[6px] border border-[#f04b4b] px-[10px] text-[11px] font-medium text-[#e34141] hover:bg-[#fff4f4] disabled:opacity-60"
          >
            {signingOut ? "অপেক্ষা করুন…" : "↩ সাইন আউট"}
          </button>
        </section>

        <section className="mt-[18px] rounded-[12px] border border-[#e1eae4] bg-[#fbfdfc] p-[14px]">
          <h2 className="text-[13px] font-semibold leading-5">তথ্য</h2>
          <p className="mt-3 text-[11px] leading-5 text-[#68716b]">
            আপনার প্রোফাইলের নাম পরিবর্তন করতে নিচের বাটনে চাপ দিন।
          </p>

          <Link
            href="/profile/update"
            className="mt-4 inline-flex h-[32px] w-full items-center justify-center rounded-[6px] bg-[#078b45] text-[12px] font-semibold text-white no-underline shadow-[0_2px_4px_rgba(0,70,34,0.28)] hover:bg-[#06783c]"
          >
            তথ্য আপডেট করুন
          </Link>
        </section>
      </div>
    </main>
  );
}