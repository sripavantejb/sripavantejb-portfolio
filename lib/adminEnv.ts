export type AdminEnvStatus = {
  ok: boolean;
  missing: string[];
};

export function getAdminEnvStatus(): AdminEnvStatus {
  const required = ["MONGODB_URI", "ADMIN_PASSWORD", "SESSION_SECRET"] as const;
  const missing = required.filter((key) => !process.env[key]?.trim());

  const uri = process.env.MONGODB_URI?.trim();
  if (uri && !/^mongodb(\+srv)?:\/\//.test(uri)) {
    return {
      ok: false,
      missing: [...missing, "MONGODB_URI (invalid — must be mongodb:// or mongodb+srv://)"],
    };
  }

  return { ok: missing.length === 0, missing: [...missing] };
}
