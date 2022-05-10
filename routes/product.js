import { Router } from "express";

import upload from "../middlewares/uploadImage.js";
import authenticate from "../middlewares/authenticate.js";
import { uploadProduct } from "../controllers/product.js";
const router = Router();

//Route : 1 Upload Product using POST : 'api/product/upload'. Require auth.
router.post("/upload", upload.array("file"), uploadProduct);

export default router;
