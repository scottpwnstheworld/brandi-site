import { MongoClient } from "mongodb";

const ATLAS_URI = "";

// const connectionString = ATLAS_URI || "";

const client = new MongoClient(ATLAS_URI);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;
