import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async(req, res) => {
  res.send("Hello from DALL-E!");
})

const startServer = async () => {

  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Server has started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();