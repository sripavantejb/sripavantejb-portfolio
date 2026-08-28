import { Binary } from "mongodb";
import { getDb } from "@/lib/mongodb";

const SETTINGS_KEY = "resume";

export type ResumeMeta = {
  filename: string;
  uploadedAt: string;
  size: number;
};

type ResumeDoc = ResumeMeta & {
  key: typeof SETTINGS_KEY;
  data: Binary;
};

async function getSettingsCollection() {
  const db = await getDb();
  return db.collection<ResumeDoc>("site_settings");
}

export async function getResumeMetadata(): Promise<ResumeMeta | null> {
  const col = await getSettingsCollection();
  const doc = await col.findOne(
    { key: SETTINGS_KEY },
    { projection: { filename: 1, uploadedAt: 1, size: 1 } }
  );
  if (!doc) return null;
  return {
    filename: doc.filename,
    uploadedAt: doc.uploadedAt,
    size: doc.size,
  };
}

export async function getResumeDownload(): Promise<{ buffer: Buffer; filename: string } | null> {
  const col = await getSettingsCollection();
  const doc = await col.findOne({ key: SETTINGS_KEY });
  if (!doc?.data) return null;

  return {
    buffer: Buffer.from(doc.data.buffer),
    filename: doc.filename,
  };
}

export async function uploadResume(buffer: Buffer, filename: string): Promise<ResumeMeta> {
  const safeName = filename.replace(/[^\w.\-() ]+/g, "_").slice(0, 120) || "resume.pdf";
  const meta: ResumeMeta = {
    filename: safeName,
    uploadedAt: new Date().toISOString(),
    size: buffer.length,
  };

  const col = await getSettingsCollection();
  await col.updateOne(
    { key: SETTINGS_KEY },
    {
      $set: {
        key: SETTINGS_KEY,
        ...meta,
        data: new Binary(buffer),
      },
    },
    { upsert: true }
  );

  return meta;
}

export async function deleteResume(): Promise<boolean> {
  const col = await getSettingsCollection();
  const result = await col.deleteOne({ key: SETTINGS_KEY });
  return result.deletedCount > 0;
}

export async function getResumeAvailability(): Promise<boolean> {
  try {
    const resume = await getResumeMetadata();
    return Boolean(resume);
  } catch {
    return false;
  }
}
