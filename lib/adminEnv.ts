export type AdminEnvStatus = {
  ok: boolean;
  missing: string[];
};

export function getAdminEnvStatus(): AdminEnvStatus {
  const required = ["MONGODB_URI", "ADMIN_PASSWORD", "SESSION_SECRET"] as const;
  const missing = required.filter((key) => !process.env[key]?.trim());
  return { ok: missing.length === 0, missing: [...missing] };
}
