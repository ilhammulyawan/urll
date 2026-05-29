const GUEST_LINK_TTL_MS = 1000 * 60 * 60 * 24;

type GuestLinkRecord = {
  code: string;
  targetUrl: string;
  createdAt: number;
  expiresAt: number;
  source: "guest";
};

type GuestRegistry = Map<string, GuestLinkRecord>;

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

  for (let index = 0; index < CODE_LENGTH; index += 1) {
    const randomIndex = Math.floor(Math.random() * CODE_ALPHABET.length);
    code += CODE_ALPHABET[randomIndex];
  }

  return code;
}

export function createGuestShortLink(targetUrl: string) {
  const now = Date.now();
  cleanupExpiredLinks(now);

  let code = generateCode();
  while (guestRegistry.has(code)) {
    code = generateCode();
  }

  const record: GuestLinkRecord = {
    code,
    targetUrl,
    createdAt: now,
    expiresAt: now + GUEST_LINK_TTL_MS,
    source: "guest",
  };

  guestRegistry.set(code, record);
  return record;
}

export function findGuestShortLink(code: string) {
  const now = Date.now();
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
