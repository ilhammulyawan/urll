import type { Metadata } from "next";

import { PreferenceScript } from "@/components/preference-script";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tiny Link by Mulyawan",
  description:
    "Responsive shortlink landing page with guest shortening, dark mode, read mode, and a modular content foundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <PreferenceScript />
        {children}
      </body>
    </html>
  );
}
