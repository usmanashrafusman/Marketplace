import { Router } from "express";
import { getRequestedImage } from "../middlewares/uploadImage.js";

const router = Router();
//retriving image from DB
router.get("/:id", getRequestedImage);

export default router;
