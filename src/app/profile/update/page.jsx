"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const user = session?.user;

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();

    if (!name) {
      const message = "আপনার নাম লিখুন।";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({ name });

      if (result?.error) {
        throw new Error(result.error.message || "তথ্য আপডেট করা যায়নি।");
      }

      await refetch();
      toast.success("প্রোফাইলের তথ্য আপডেট হয়েছে।");
      router.replace("/profile");
      router.refresh();
    } catch (error) {
      const message = error.message || "তথ্য আপডেট করা যায়নি।";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setSaving(false);
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
          <p className="text-sm text-[#68716b]">এই তথ্য পরিবর্তন করতে সাইন ইন করুন।</p>
          <Link
            href="/signin"
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
        <h1 className="text-[19px] font-bold leading-7">তথ্য আপডেট</h1>
        <p className="text-[11px] leading-[18px] text-[#758078]">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>

        <section className="mt-[18px] rounded-[12px] border border-[#e1eae4] bg-[#fbfdfc] p-4 sm:p-[18px]">
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="profile-name"
              className="mb-[6px] block text-[12px] font-medium"
            >
              নাম
            </label>

            <input
              id="profile-name"
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={user.name || ""}
              className="h-[36px] w-full rounded-[7px] border border-[#dfe8e1] bg-transparent px-3 text-[12px] outline-none focus:border-[#078b45] focus:ring-2 focus:ring-[#078b45]/10"
            />

            {errorMessage && (
              <p role="alert" className="mt-2 text-[11px] text-[#d34747]">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-4 inline-flex h-[36px] w-full items-center justify-center rounded-[6px] bg-[#078b45] text-[12px] font-semibold text-white shadow-[0_2px_4px_rgba(0,70,34,0.28)] hover:bg-[#06783c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
            </button>
          </form>

          <Link
            href="/profile"
            className="mt-4 inline-block text-[11px] text-[#68716b] no-underline hover:text-[#078b45]"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </section>
      </div>
    </main>
  );
}