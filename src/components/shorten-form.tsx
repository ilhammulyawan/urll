"use client";

import { FormEvent, useMemo, useState } from "react";

type ApiSuccess = {
  shortUrl: string;
  code: string;
  expiresAt: number;
  storage: "cloudflare-kv" | "memory-fallback";
};

type ApiFailure = {
  error: string;
};

export function ShortenForm() {
  const [targetUrl, setTargetUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ApiSuccess | null>(null);
  const [error, setError] = useState<string | null>(null);

  const expiryLabel = useMemo(() => {
    if (!result) {
      return null;
    }

    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(result.expiresAt);
  }, [result]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      const payload = (await response.json()) as ApiSuccess | ApiFailure;

      if (!response.ok) {
        setResult(null);
        setError("error" in payload ? payload.error : "Unable to shorten the URL.");
        return;
      }

      setResult(payload as ApiSuccess);
      setTargetUrl("");
    } catch {
      setResult(null);
      setError("Unable to reach the shortener service right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="space-y-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Paste your long URL
          <input
            required
            type="url"
            name="url"
            placeholder="https://example.com/very/long/link"
            autoComplete="url"
            value={targetUrl}
            onChange={(event) => setTargetUrl(event.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 dark:border-white/10 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            {isSubmitting ? "Generating..." : "Generate guest short link"}
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Guest links stay separate from future user dashboards and use Cloudflare KV in deployed Workers with a safe local fallback during development.
          </p>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-4 space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
          <p className="font-semibold">Your Tiny Link is ready.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a className="break-all font-medium underline decoration-emerald-400 underline-offset-4" href={result.shortUrl} target="_blank" rel="noreferrer">
              {result.shortUrl}
            </a>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(result.shortUrl);
              }}
              className="rounded-full border border-emerald-300 px-4 py-2 font-medium transition hover:bg-emerald-100 dark:border-emerald-400/40 dark:hover:bg-emerald-400/10"
            >
              Copy link
            </button>
          </div>
          <p>
            Code: <span className="font-semibold">{result.code}</span> · Storage: <span className="font-semibold">{result.storage}</span>
          </p>
          {expiryLabel ? <p>Available until approximately {expiryLabel}.</p> : null}
        </div>
      ) : null}
    </div>
  );
}
