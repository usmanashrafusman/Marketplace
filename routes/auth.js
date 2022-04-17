import { Router } from "express";

import {
  signUpValidator,
  loginValidator,
} from "../validators/authValidator.js";
import { register, login } from "../controllers/auth.js";
import upload from "../middlewares/uploadImage.js";
const router = Router();

//Route : 1 Create a user using POST : 'api/auth/register'. Doesn't require auth.
router.post("/register", signUpValidator, upload.single("file"), register);

//Route : 2 Logging in a user using POST : 'api/auth/login'. Doesn't require auth.
router.post("/login", loginValidator, login);

export default router;
