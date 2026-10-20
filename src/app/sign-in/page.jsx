"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const { error } = await authClient.signIn.email({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      router.push("/");
    } catch {
      setErrorMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setErrorMessage("");

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "সাইন ইন করা যায়নি।");
      }
    } catch {
      setErrorMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="min-h-[calc(100svh-160px)] bg-[#f1f6f2] px-4 pb-8 pt-7 font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] text-[#202a23]">
      <div className="mx-auto flex w-full flex-col items-center">
        <h1 className="text-center text-[18px] font-bold leading-6">
          সাইন ইন
        </h1>

        <p className="mt-1 text-center text-[10px] leading-4 text-[#77817a]">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <div className="mt-[18px] w-full max-w-[310px] rounded-[12px] border border-[#e0eae3] bg-[#fbfdfc] p-4 sm:p-[18px]">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[10px] font-medium leading-3"
              >
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="h-[30px] w-full rounded-[7px] border border-[#e0eae3] bg-[#fbfdfc] px-2 text-[10px] outline-none placeholder:text-[#68716b] focus:border-[#078b45]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[10px] font-medium leading-3"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="h-[30px] w-full rounded-[7px] border border-[#e0eae3] bg-[#fbfdfc] px-2 text-[10px] outline-none placeholder:text-[#68716b] focus:border-[#078b45]"
              />
            </div>

            {errorMessage && (
              <p role="alert" className="text-[10px] leading-4 text-[#d34747]">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-[32px] w-full items-center justify-center rounded-[6px] bg-[#078b45] px-3 text-[10px] font-semibold text-white shadow-[0_2px_4px_rgba(0,70,34,0.28)] transition-colors hover:bg-[#06783c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-3 flex items-center gap-3 text-[9px] text-[#77817a]">
            <span className="h-px flex-1 bg-[#e0eae3]" />
            অথবা
            <span className="h-px flex-1 bg-[#e0eae3]" />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              className="inline-flex h-[32px] min-w-0 flex-1 items-center justify-center gap-1 rounded-[6px] border border-[#e0eae3] bg-[#fbfdfc] px-1.5 text-[9px] font-medium hover:bg-[#f4f8f5]"
            >
              <svg aria-hidden="true" viewBox="0 0 48 48" className="h-3 w-3 flex-none">
                <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11c-.5 2.5-1.9 4.6-4.1 6l6.5 5c3.8-3.5 6.2-8.7 6.2-14.6Z" />
                <path fill="#34A853" d="M24 44c5.5 0 10.2-1.8 13.6-4.9l-6.5-5c-1.8 1.2-4.1 2-7.1 2-5.4 0-10-3.7-11.7-8.6l-6.7 5.2C9 39.4 16 44 24 44Z" />
                <path fill="#FBBC05" d="M12.3 27.5a12 12 0 0 1 0-7l-6.7-5.2a20 20 0 0 0 0 17.4l6.7-5.2Z" />
                <path fill="#EA4335" d="M24 12.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.8 29.5 5 24 5 16 5 9 9.6 5.6 16.3l6.7 5.2c1.7-4.9 6.3-8.6 11.7-8.6Z" />
              </svg>
              <span className="truncate">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              className="inline-flex h-[32px] min-w-0 flex-1 items-center justify-center gap-1 rounded-[6px] border border-[#e0eae3] bg-[#fbfdfc] px-1.5 text-[9px] font-medium hover:bg-[#f4f8f5]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3 w-3 flex-none fill-current"
              >
                <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.22-1.65-1.22-1.65-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.91.1-.71.38-1.2.7-1.48-2.5-.28-5.12-1.25-5.12-5.57 0-1.23.44-2.23 1.13-3.02-.12-.28-.49-1.43.1-2.98 0 0 .92-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.06-1.15 3.06-1.15.6 1.55.23 2.7.11 2.98.7.79 1.12 1.79 1.12 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.75 1.03.75 2.08v3.1c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" />
              </svg>
              <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-3 text-center text-[9px] leading-4">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#078b45] no-underline hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-4 text-[10px] text-[#77817a] no-underline hover:text-[#078b45]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;