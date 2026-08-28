import { MongoClient, type Db } from "mongodb";

const dbName = process.env.MONGODB_DB || "sripavantejb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {
  // Surface an unreachable cluster in seconds rather than after the 30s default,
  // so a request fails fast instead of hanging the whole render.
  serverSelectionTimeoutMS: 5_000,
  connectTimeoutMS: 5_000,
};

// In development the promise lives on `global` so it survives HMR module
// reloads; in production a module-level binding is enough.
let clientPromise: Promise<MongoClient> | undefined;

function getCached(): Promise<MongoClient> | undefined {
  return process.env.NODE_ENV === "development" ? global._mongoClientPromise : clientPromise;
}

function setCached(promise: Promise<MongoClient> | undefined): void {
  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise = promise;
  } else {
    clientPromise = promise;
  }
}

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  const promise = new MongoClient(uri, options).connect();
  // A rejected promise must not stay cached, or every later request reuses the
  // same failure and the app can never recover without a restart.
  promise.catch(() => {
    if (getCached() === promise) setCached(undefined);
  });
  setCached(promise);
  return promise;
}

export async function getDb(): Promise<Db> {
  const client = await (getCached() ?? connect());
  return client.db(dbName);
}
