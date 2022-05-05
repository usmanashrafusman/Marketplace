import { Router } from "express";

import {
  signUpValidator,
  loginValidator,
} from "../validators/authValidator.js";
import { register, login, getUser } from "../controllers/auth.js";
import upload from "../middlewares/uploadImage.js";
import authenticate from "../middlewares/authenticate.js";
const router = Router();

//Route : 1 Create a user using POST : 'api/auth/register'. Doesn't require auth.
router.post("/register", upload.single("file"), register);

//Route : 2 Logging in a user using POST : 'api/auth/login'. Doesn't require auth.
router.post("/login", loginValidator, login);

//Route : 3 Gettng Logged in user using GET : 'api/auth/getUser'. Require auth.
router.get("/getUser", authenticate, getUser);

export default router;
