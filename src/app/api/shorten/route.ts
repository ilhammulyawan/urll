import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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

async function resolveAppOrigin(request: Request) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const configuredOrigin = env.PUBLIC_APP_ORIGIN?.trim();

    if (configuredOrigin) {
      return new URL(configuredOrigin).origin;
    }
  } catch {
    // fall back to the request origin outside the Cloudflare worker runtime
  }

  return new URL(request.url).origin;
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

  const shortLink = await createGuestShortLink(normalizedUrl);
  const shortUrl = new URL(`/${shortLink.code}`, `${await resolveAppOrigin(request)}/`).toString();

  return NextResponse.json({
    code: shortLink.code,
    shortUrl,
    expiresAt: shortLink.expiresAt,
    storage: shortLink.storage,
  });
}
