import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Project } from "@/lib/data";

export type ProjectDoc = {
  _id?: ObjectId;
  id: number;
  order: number;
  title: string;
  dates: string;
  org: string;
  link?: string;
  linkLabel?: string;
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
    link: doc.link,
    linkLabel: doc.linkLabel,
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

export async function listPublicProjects(): Promise<Project[]> {
  const admins = await listProjects();
  return admins.map((p) => ({
    id: p.id,
    title: p.title,
    dates: p.dates,
    org: p.org,
    link: p.link,
    linkLabel: p.linkLabel,
    stack: p.stack,
    description: p.description,
    highlights: p.highlights,
    outcome: p.outcome,
  }));
}

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
