import { Router } from "express";
const router = Router();
import mongoose from "mongoose";
import { getRequestedImage } from "../middlewares/uploadImage.js";

//retriving image from DB
router.get("/:id", getRequestedImage);

export default router;
