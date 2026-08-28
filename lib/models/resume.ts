import { GridFSBucket, ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

const BUCKET = "resumes";
const SETTINGS_KEY = "resume";

export type ResumeMeta = {
  filename: string;
  uploadedAt: string;
  size: number;
};

type ResumeSettings = {
  key: typeof SETTINGS_KEY;
  filename: string;
  uploadedAt: string;
  size: number;
  fileId: string;
};

async function getBucket() {
  const db = await getDb();
  return new GridFSBucket(db, { bucketName: BUCKET });
}

async function getSettingsCollection() {
  const db = await getDb();
  return db.collection<ResumeSettings>("site_settings");
}

export async function getResumeMetadata(): Promise<ResumeMeta | null> {
  const col = await getSettingsCollection();
  const doc = await col.findOne({ key: SETTINGS_KEY });
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
  if (!doc?.fileId) return null;

  const bucket = await getBucket();
  const chunks: Buffer[] = [];

  await new Promise<void>((resolve, reject) => {
    bucket
      .openDownloadStream(new ObjectId(doc.fileId))
      .on("data", (chunk: Buffer) => chunks.push(chunk))
      .on("error", reject)
      .on("end", resolve);
  });

  return {
    buffer: Buffer.concat(chunks),
    filename: doc.filename,
  };
}

export async function uploadResume(buffer: Buffer, filename: string): Promise<ResumeMeta> {
  await deleteResume();

  const bucket = await getBucket();
  const safeName = filename.replace(/[^\w.\-() ]+/g, "_").slice(0, 120) || "resume.pdf";

  const uploadStream = bucket.openUploadStream(safeName, {
    metadata: { contentType: "application/pdf" },
  });

  await new Promise<void>((resolve, reject) => {
    uploadStream.on("error", reject);
    uploadStream.on("finish", resolve);
    uploadStream.end(buffer);
  });

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
        fileId: uploadStream.id.toString(),
      },
    },
    { upsert: true }
  );

  return meta;
}

export async function deleteResume(): Promise<boolean> {
  const col = await getSettingsCollection();
  const doc = await col.findOne({ key: SETTINGS_KEY });
  if (!doc) return false;

  const bucket = await getBucket();
  if (doc.fileId) {
    try {
      await bucket.delete(new ObjectId(doc.fileId));
    } catch {
      // File may already be gone; still clear settings.
    }
  }

  await col.deleteOne({ key: SETTINGS_KEY });
  return true;
}

export async function getResumeAvailability(): Promise<boolean> {
  try {
    const resume = await getResumeMetadata();
    return Boolean(resume);
  } catch {
    return false;
  }
}
