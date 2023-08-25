import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import axios from "axios";
import jsdom from "jsdom";

const router = express.Router();

const UNIDENTIFIED = "unidentified-persons";
const cache = {};

router.get("/", async (req, res) => {
  let collection = await db.collection(UNIDENTIFIED);
  let results = await collection.find({}).toArray();

  // if (results.length !== Object.keys(cache).length) {
  //   for (const row of results) {
  //     cache[row["Case Number"]] = row;
  //   }
  // }
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  const cached = cache[req.params.id];
  if (cached && cached.updated) {
    console.log("returning cached", cached);
  }

  let collection = await db.collection(UNIDENTIFIED);
  let query = { Case: req.params.id };
  let result = await collection.findOne(query);

  if (!result.updated) {
    const response = await axios.get(
      `https://www.namus.gov/api/CaseSets/NamUs/UnidentifiedPersons/Cases/${req.params.id.slice(
        2
      )}?forReport=false`
    );

    result = { ...result, ...response.data, updated: true };
    console.log("doing update");
    await collection.replaceOne({ Case: req.params.id }, result);
    cache[req.params.id] = result;
  }

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add many new docs
router.post("/bulk", async (req, res) => {
  let collection = await db.collection(UNIDENTIFIED);
  let newDocuments = req.body;
  let result = await collection.insertMany(newDocuments);
  res.send(result).status(204);
});

export default router;
