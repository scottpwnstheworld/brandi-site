import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import axios from "axios";
import jsdom from "jsdom";

const router = express.Router();

const MISSING = "missing-persons";
const cache = {};

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection(MISSING);
  let results = await collection.find({}).toArray();

  if (results.length !== Object.keys(cache).length) {
    for (const row of results) {
      cache[row["Case Number"]] = row;
    }
  }
  res.send(results).status(200);
});

// // Fetches the latest posts
// router.get("/latest", async (req, res) => {
//   let collection = await db.collection("posts");
//   let results = await collection
//     .aggregate([
//       { $project: { author: 1, title: 1, tags: 1, date: 1 } },
//       { $sort: { date: -1 } },
//       { $limit: 3 },
//     ])
//     .toArray();
//   res.send(results).status(200);
// });

// Get a single post
router.get("/:id", async (req, res) => {
  const cached = cache[req.params.id];
  if (cached && cached.updated) {
    console.log("returning cached", cached);
  }

  let collection = await db.collection(MISSING);
  let query = { "Case Number": req.params.id };
  let result = await collection.findOne(query);

  if (!result.updated) {
    const response = await axios.get(
      `https://www.namus.gov/api/CaseSets/NamUs/MissingPersons/Cases/${req.params.id.slice(
        2
      )}?forReport=false`
    );

    result = { ...result, ...response.data, updated: true };
    console.log("doing update");
    await collection.replaceOne({ "Case Number": req.params.id }, result);
    cache[req.params.id] = result;
  }

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  console.log("post /", req.body);
  let collection = await db.collection("missing-persons");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Add many new docs
router.post("/bulk", async (req, res) => {
  let collection = await db.collection("missing-persons");
  let newDocuments = req.body;
  let result = await collection.insertMany(newDocuments);
  res.send(result).status(204);
});

router.delete("/", async (req, res) => {
  const collection = db.collection("missing-persons");
  let result = await collection.deleteMany({});

  res.send(result).status(200);
});

// Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body },
//   };

//   let collection = await db.collection("posts");
//   let result = await collection.updateOne(query, updates);

//   res.send(result).status(200);
// });

// // Delete an entry
// router.delete("/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };

//   const collection = db.collection("posts");
//   let result = await collection.deleteOne(query);

//   res.send(result).status(200);
// });

export default router;
