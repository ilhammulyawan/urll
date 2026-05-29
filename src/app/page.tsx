import Link from "next/link";

import { ModeToggles } from "@/components/mode-toggles";
import { Reveal } from "@/components/reveal";
import { ShortenForm } from "@/components/shorten-form";
import { landingContent } from "@/content/landing-content";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />

      <section className="border-b border-black/5 bg-white/75 backdrop-blur dark:border-white/5 dark:bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              {landingContent.brand.name}
            </Link>
            <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300">
              Tahap 1
            </span>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
              {landingContent.navigation.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-slate-950 dark:hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
            <ModeToggles />
          </div>
        </div>
      </section>

      <section className="content-shell mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <Reveal className="space-y-8">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              {landingContent.brand.tagline}
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Modern short links with a clean guest experience.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {landingContent.brand.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#shorten"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              {landingContent.brand.ctaPrimary}
            </a>
            <a
              href="#features"
              className="rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {landingContent.brand.ctaSecondary}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {landingContent.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:justify-self-end">
          <div id="shorten" className="space-y-4">
            <ShortenForm />
            <div className="rounded-[2rem] border border-dashed border-black/10 bg-white/55 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <p className="font-semibold text-slate-950 dark:text-white">Prepared for Tahap 2/3</p>
              <p className="mt-2">
                Guest links now target Cloudflare KV for deployed Workers while keeping a local fallback for development. This still leaves a clear path for future login-based saved links, QR codes, click analytics, and admin-managed content workflows.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="features" className="content-shell mx-auto w-full max-w-7xl px-6 py-8 lg:py-12">
        <Reveal className="space-y-4 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">Features</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Built as a polished landing page first, with future product layers in mind.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {landingContent.featureCards.map((feature) => (
            <Reveal key={feature.title} className="h-full">
              <article className="card-panel h-full rounded-[2rem] p-6 transition hover:-translate-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="content-shell mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {landingContent.steps.map((step, index) => (
            <Reveal key={step.title} className="h-full">
              <div className="card-panel h-full rounded-[2rem] p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white dark:bg-sky-500 dark:text-slate-950">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="faq" className="content-shell mx-auto w-full max-w-5xl px-6 py-8 lg:py-12">
        <Reveal className="rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                What is included in Tahap 1?
              </h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              <p>
                This phase focuses on the public experience: responsive landing page sections, subtle motion, guest shortening, theme toggles, and a modular content structure.
              </p>
              <p>
                Full authentication, permanent saved links, QR generation, analytics charts, and a complete admin panel are intentionally reserved for Tahap 2 and Tahap 3.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="content-shell mx-auto w-full max-w-6xl px-6 py-12 lg:py-18">
        <Reveal className="rounded-[2rem] border border-sky-500/20 bg-sky-500/10 p-8 text-center shadow-sm dark:border-sky-400/20 dark:bg-sky-400/10">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {landingContent.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-200">
            {landingContent.cta.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="#shorten"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            >
              {landingContent.cta.primary}
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {landingContent.cta.secondary}
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-black/5 py-8 dark:border-white/5">
        <div className="content-shell mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 dark:text-slate-300 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-semibold text-slate-950 dark:text-white">{landingContent.brand.name}</p>
            <p className="mt-1 max-w-2xl">{landingContent.footer.note}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {landingContent.footer.links.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-slate-950 dark:hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
