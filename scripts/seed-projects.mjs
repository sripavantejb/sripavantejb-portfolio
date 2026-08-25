import { MongoClient } from "mongodb";
import projects from "../lib/projects.seed.json" with { type: "json" };

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "sripavantejb";

if (!uri) {
  console.error("Missing MONGODB_URI. Run with: node --env-file=.env.local scripts/seed-projects.mjs");
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection("projects");

  for (const p of projects) {
    await col.updateOne({ id: p.id }, { $set: p }, { upsert: true });
  }

  const count = await col.countDocuments();
  console.log(`Seeded ${projects.length} projects. Collection now has ${count} documents.`);
} finally {
  await client.close();
}
