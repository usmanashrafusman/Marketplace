import express from "express";
import cors from "cors";
import upload from "./middlewares/uploadImage.js";
//MongoDB connection Function
import connetToMongo from "./db.js";
//Routes for auth
import authRoutes from "./routes/auth.js";

import imageRoutes from "./routes/images.js";

// connecting to mongo
connetToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome User");
});

//middleware to user JSON
app.use(express.json());

// middleware for all routes to api/auth
app.use("/api/auth", authRoutes);

app.use("/api/images", imageRoutes);

//creating server
app.listen(port, () => {
  console.log(`Backend Server listening at http://localhost:${port}`);
});
