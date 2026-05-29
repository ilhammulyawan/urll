import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <span className="rounded-full border border-black/10 px-4 py-2 text-sm text-slate-500 dark:border-white/10 dark:text-slate-300">
        Tiny Link by Mulyawan
      </span>
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">Short link not found</h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          The guest link may have expired or never existed. Create a new one from the landing page.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950"
      >
        Return home
      </Link>
    </main>
  );
}
