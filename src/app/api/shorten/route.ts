import { NextResponse } from "next/server";

import { createGuestShortLink } from "@/lib/ephemeral-links";

function normalizeUrl(value: string) {
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { url?: string };
  const normalizedUrl = normalizeUrl(payload.url ?? "");

  if (!normalizedUrl) {
    return NextResponse.json(
      { error: "Please provide a valid http or https URL." },
      { status: 400 },
    );
  }

  const shortLink = createGuestShortLink(normalizedUrl);
  const shortUrl = new URL(`/${shortLink.code}`, request.url).toString();

  return NextResponse.json({
    code: shortLink.code,
    shortUrl,
    expiresAt: shortLink.expiresAt,
    storage: "ephemeral-guest",
  });
}
