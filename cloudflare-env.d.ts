/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    GUEST_LINKS_KV?: KVNamespace;
    PUBLIC_APP_ORIGIN?: string;
  }
}

export {};
