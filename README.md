# Tiny Link by Mulyawan

Tahap 1 dari aplikasi shortlink **Tiny Link by Mulyawan** dibangun dengan **Next.js App Router** dan **Tailwind CSS v4**. Fokus fase ini adalah fondasi UI publik, guest shortener tanpa penyimpanan permanen, serta struktur konten yang siap dikelola admin pada tahap berikutnya. Repo ini juga sudah disiapkan untuk deploy ke **Cloudflare Workers** lewat **OpenNext**.

## Yang dibangun pada Tahap 1

- Landing page modern dengan section **navbar**, **hero**, **features**, **CTA**, dan **footer**.
- UI responsif untuk mobile, tablet, dan desktop.
- Animasi halus melalui transition, hover state, dan reveal-on-scroll.
- Form shorten URL langsung dari landing page untuk **guest mode**.
- Guest short link disimpan terpisah dari fondasi data user. Saat deploy ke Cloudflare Workers, link guest menggunakan **Cloudflare KV** dengan TTL 24 jam; saat development biasa, aplikasi memakai fallback **in-memory**.
- **Dark mode** dan **read mode** dengan persistensi preferensi di `localStorage`.
- Struktur konten landing terpusat di file konfigurasi bertipe agar mudah dipakai admin CMS pada Tahap 2/3.

## Struktur proyek

```text
src/
  app/
    [code]/route.ts          # redirect short link guest
    api/shorten/route.ts     # endpoint generate short link guest
    globals.css              # global theme + read mode styling
    layout.tsx               # metadata + preference bootstrap
    not-found.tsx            # branded fallback for expired/missing links
    page.tsx                 # landing page public
  components/
    mode-toggles.tsx         # dark mode + read mode controls
    preference-script.tsx    # bootstrap theme preference from localStorage
    reveal.tsx               # reveal-on-scroll helper
    shorten-form.tsx         # hero shortener form + result state
  content/
    landing-content.ts       # central landing content config for future admin management
  lib/
    ephemeral-links.ts       # guest-only temporary short link registry
```

## Cara menjalankan

### 1. Install dependency

```bash
npm install
```

### 2. Jalankan development server

```bash
npm run dev
```

Buka `http://localhost:3000`.

### 3. Validasi

```bash
npm run lint
npm run build
```

## Deploy ke Cloudflare Workers

### 1. Install dependency

```bash
npm install
```

### 2. Siapkan Cloudflare

- Buat KV namespace untuk guest links.
- Ganti `id` dan `preview_id` pada `/tmp/workspace/ilhammulyawan/urll/wrangler.jsonc`.
- Jika ingin short URL selalu memakai domain tertentu, set `PUBLIC_APP_ORIGIN` di environment Cloudflare Worker.

### 3. Development / preview

```bash
cp .dev.vars.example .dev.vars
npm run preview
```

### 4. Deploy

```bash
npm run deploy
```

### 5. File konfigurasi penting

- `/tmp/workspace/ilhammulyawan/urll/wrangler.jsonc` — binding Worker, assets, dan KV.
- `/tmp/workspace/ilhammulyawan/urll/open-next.config.ts` — adapter OpenNext untuk Cloudflare.
- `/tmp/workspace/ilhammulyawan/urll/.dev.vars.example` — contoh env lokal untuk preview.

## Catatan arsitektur untuk Tahap 2 / Tahap 3

- **Auth & saved links:** guest link storage sudah dipisahkan dari storage user agar nanti link yang dibuat setelah login bisa disimpan ke database tanpa bercampur dengan link guest.
- **Admin-manageable landing content:** seluruh copy/section utama sudah dipusatkan di `src/content/landing-content.ts`, sehingga admin panel/CMS nanti cukup menulis ke layer yang menggantikan sumber konfigurasi ini.
- **QR code & analytics:** flow shorten dan redirect sudah dipisah ke route handler, sehingga penambahan QR generator, click tracking, chart, dan dashboard bisa dilakukan di layer route/service tanpa membongkar landing page.

## Scope yang belum masuk Tahap 1

- Login/register penuh.
- Penyimpanan link user permanen.
- QR code generator.
- Statistik klik dalam chart.
- Admin panel final.

Semua fitur di atas sudah dipersiapkan melalui struktur modular agar implementasinya lebih mudah pada tahap berikutnya.
