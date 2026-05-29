import { notFound, redirect } from "next/navigation";

import { findGuestShortLink } from "@/lib/ephemeral-links";

export async function GET(
  _request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code } = await context.params;
  const shortLink = await findGuestShortLink(code);

  if (!shortLink) {
    notFound();
  }

  redirect(shortLink.targetUrl);
}
