export const ADMIN_COOKIE = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuf(hex: string): Uint8Array {
  const bytes = new Uint8Array(Math.floor(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function getKey(usages: KeyUsage[]): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Missing SESSION_SECRET environment variable");
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usages
  );
}

export async function createSessionToken(): Promise<{ token: string; maxAge: number }> {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expires);
  const key = await getKey(["sign"]);
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return { token: `${payload}.${bufToHex(sigBuf)}`, maxAge: MAX_AGE_SECONDS };
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, signatureHex] = token.split(".");
  if (!payload || !signatureHex) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  try {
    const key = await getKey(["verify"]);
    return await crypto.subtle.verify(
      "HMAC",
      key,
      hexToBuf(signatureHex) as BufferSource,
      new TextEncoder().encode(payload)
    );
  } catch {
    return false;
  }
}

export async function verifyPassword(input: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) throw new Error("Missing ADMIN_PASSWORD environment variable");

  // Compare HMAC digests (both under the session secret) rather than raw strings,
  // and diff every byte, so timing doesn't leak how much of the password matched.
  const key = await getKey(["sign"]);
  const [a, b] = await Promise.all([
    crypto.subtle.sign("HMAC", key, new TextEncoder().encode(input)),
    crypto.subtle.sign("HMAC", key, new TextEncoder().encode(adminPassword)),
  ]);
  const aHex = bufToHex(a);
  const bHex = bufToHex(b);
  if (aHex.length !== bHex.length) return false;
  let diff = 0;
  for (let i = 0; i < aHex.length; i++) diff |= aHex.charCodeAt(i) ^ bHex.charCodeAt(i);
  return diff === 0;
}
