import express from "express";
import cors from "cors";
import upload from "./middlewares/uploadImage.js"; // Upload Image Middleware
import connetToMongo from "./db.js"; //MongoDB connection Function
import authRoutes from "./routes/auth.js"; //Routes for auth
import imageRoutes from "./routes/images.js"; //Routes for images
import productRoutes from "./routes/product.js"; //Routes for images
// connecting to mongo
connetToMongo();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

//middleware to use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome User");
});

// middleware for all routes to api/auth
app.use("/api/auth", authRoutes);

app.use("/api/product", productRoutes);

app.use("/api/images", imageRoutes);

//creating server
app.listen(port, () => {
  console.log(`Backend Server listening at http://localhost:${port}`);
});
