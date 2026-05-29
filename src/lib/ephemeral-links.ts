import { getCloudflareContext } from "@opennextjs/cloudflare";

const GUEST_LINK_TTL_SECONDS = 60 * 60 * 24;
const GUEST_LINK_TTL_MS = GUEST_LINK_TTL_SECONDS * 1000;
const GUEST_LINKS_KV_PREFIX = "guest:";

type GuestLinkRecord = {
  code: string;
  targetUrl: string;
  createdAt: number;
  expiresAt: number;
  source: "guest";
};

type GuestRegistry = Map<string, GuestLinkRecord>;
type GuestLinkStorage = "cloudflare-kv" | "memory-fallback";

declare global {
  var __tinyLinkGuestRegistry__: GuestRegistry | undefined;
}

const guestRegistry = globalThis.__tinyLinkGuestRegistry__ ?? new Map<string, GuestLinkRecord>();

globalThis.__tinyLinkGuestRegistry__ = guestRegistry;

const CODE_LENGTH = 7;
const CODE_ALPHABET = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function cleanupExpiredLinks(now: number) {
  for (const [code, entry] of guestRegistry.entries()) {
    if (entry.expiresAt <= now) {
      guestRegistry.delete(code);
    }
  }
}

function generateCode() {
  let code = "";
  const randomValues = crypto.getRandomValues(new Uint8Array(CODE_LENGTH));

  for (let index = 0; index < CODE_LENGTH; index += 1) {
    const randomIndex = randomValues[index] % CODE_ALPHABET.length;
    code += CODE_ALPHABET[randomIndex];
  }

  return code;
}

function getGuestLinkKey(code: string) {
  return `${GUEST_LINKS_KV_PREFIX}${code}`;
}

async function getGuestLinksKv() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.GUEST_LINKS_KV ?? null;
  } catch {
    return null;
  }
}

export async function createGuestShortLink(targetUrl: string): Promise<GuestLinkRecord & { storage: GuestLinkStorage }> {
  const now = Date.now();
  const expiresAt = now + GUEST_LINK_TTL_MS;
  const kv = await getGuestLinksKv();

  if (kv) {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = generateCode();
      const existing = await kv.get(getGuestLinkKey(code), "json");

      if (existing) {
        continue;
      }

      const record: GuestLinkRecord = {
        code,
        targetUrl,
        createdAt: now,
        expiresAt,
        source: "guest",
      };

      await kv.put(getGuestLinkKey(code), JSON.stringify(record), {
        expirationTtl: GUEST_LINK_TTL_SECONDS,
      });

      return {
        ...record,
        storage: "cloudflare-kv",
      };
    }

    throw new Error("Unable to allocate a unique guest short code.");
  }

  cleanupExpiredLinks(now);

  let code = generateCode();
  while (guestRegistry.has(code)) {
    code = generateCode();
  }

  const record: GuestLinkRecord = {
    code,
    targetUrl,
    createdAt: now,
    expiresAt,
    source: "guest",
  };

  guestRegistry.set(code, record);
  return {
    ...record,
    storage: "memory-fallback",
  };
}

export async function findGuestShortLink(code: string) {
  const now = Date.now();
  const kv = await getGuestLinksKv();

  if (kv) {
    const record = await kv.get<GuestLinkRecord>(getGuestLinkKey(code), "json");

    if (!record || record.expiresAt <= now) {
      if (record) {
        await kv.delete(getGuestLinkKey(code));
      }

      return null;
    }

    return record;
  }

  cleanupExpiredLinks(now);

  const record = guestRegistry.get(code);
  if (!record || record.expiresAt <= now) {
    if (record) {
      guestRegistry.delete(code);
    }

    return null;
  }

  return record;
}
