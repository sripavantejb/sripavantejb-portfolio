import { ObjectId } from "mongodb";
import { cache } from "react";
import { getDb } from "@/lib/mongodb";
import type { Project } from "@/lib/data";
import seedProjects from "@/lib/projects.seed.json";

export type ProjectDoc = {
  _id?: ObjectId;
  id: number;
  order: number;
  title: string;
  dates: string;
  org: string;
  slug?: string;
  category?: string;
  role?: string;
  link?: string;
  linkLabel?: string;
  liveUrl?: string;
  stack: string[];
  description: string;
  highlights: string[];
  outcome: string;
};

export type ProjectAdmin = Project & { _id: string; order: number };

const COLLECTION = "projects";

function toAdmin(doc: ProjectDoc): ProjectAdmin {
  return {
    _id: doc._id!.toString(),
    id: doc.id,
    order: doc.order,
    title: doc.title,
    dates: doc.dates,
    org: doc.org,
    slug: doc.slug,
    category: doc.category,
    role: doc.role,
    link: doc.link,
    linkLabel: doc.linkLabel,
    liveUrl: doc.liveUrl,
    stack: doc.stack,
    description: doc.description,
    highlights: doc.highlights,
    outcome: doc.outcome,
  };
}

export async function getProjectsCollection() {
  const db = await getDb();
  return db.collection<ProjectDoc>(COLLECTION);
}

export async function listProjects(): Promise<ProjectAdmin[]> {
  const col = await getProjectsCollection();
  const docs = await col.find({}).sort({ order: 1 }).toArray();
  return docs.map(toAdmin);
}

function toPublic(p: Omit<ProjectDoc, "_id">): Project {
  return {
    id: p.id,
    title: p.title,
    dates: p.dates,
    org: p.org,
    slug: p.slug,
    category: p.category,
    role: p.role,
    link: p.link,
    linkLabel: p.linkLabel,
    liveUrl: p.liveUrl,
    stack: p.stack,
    description: p.description,
    highlights: p.highlights,
    outcome: p.outcome,
  };
}

export function getSeedProjects(): Project[] {
  return [...seedProjects].sort((a, b) => a.order - b.order).map(toPublic);
}

/**
 * Public-facing read. The portfolio catalog is the seed file so unpublished
 * or leftover database rows cannot appear on the site. Admin reads still go
 * to MongoDB.
 */
export const listPublicProjects = cache(async (): Promise<Project[]> => {
  return getSeedProjects();
});

export async function createProject(input: Omit<ProjectDoc, "_id" | "id" | "order">): Promise<ProjectAdmin> {
  const col = await getProjectsCollection();
  const last = await col.find({}).sort({ order: -1 }).limit(1).toArray();
  const lastIdDoc = await col.find({}).sort({ id: -1 }).limit(1).toArray();
  const nextOrder = last.length ? last[0].order + 1 : 0;
  const nextId = lastIdDoc.length ? lastIdDoc[0].id + 1 : 1;

  const doc: ProjectDoc = { ...input, id: nextId, order: nextOrder };
  const result = await col.insertOne(doc);
  return toAdmin({ ...doc, _id: result.insertedId });
}

export async function updateProject(
  _id: string,
  input: Partial<Omit<ProjectDoc, "_id" | "id" | "order">>
): Promise<ProjectAdmin | null> {
  const col = await getProjectsCollection();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    { $set: input },
    { returnDocument: "after" }
  );
  return result ? toAdmin(result) : null;
}

export async function deleteProject(_id: string): Promise<boolean> {
  const col = await getProjectsCollection();
  const result = await col.deleteOne({ _id: new ObjectId(_id) });
  return result.deletedCount > 0;
}

export async function reorderProjects(orderedIds: string[]): Promise<void> {
  const col = await getProjectsCollection();
  await Promise.all(
    orderedIds.map((id, index) => col.updateOne({ _id: new ObjectId(id) }, { $set: { order: index } }))
  );
}
