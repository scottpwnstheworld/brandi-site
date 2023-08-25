import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import missing from "./routes/missing.mjs";
import unidentified from "./routes/unidentified.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/missing", missing);
app.use("/unidentified", unidentified);

// Global error handling
app.use((err, _req, res, next) => {
  console.log("problem", err);
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
