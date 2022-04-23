import { validationResult } from "express-validator";
import { compare } from "bcrypt";
//UserModel
import User from "../models/User.js";
//Utils Fucntions
import {
  sendResponse,
  hashPassword,
  badRequest,
  serverError,
} from "../utils/index.js";

import config from "../config/index.js";

const register = async (req, res) => {
  let success = false;
  console.log(req.file);
  const { name, email, password } = req.body;
  console.log(name, email, password);
  //if any error occur show error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, { success, error: errors.array() });
  }
  try {
    //check if your with same email exists

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return badRequest(res, { success, error: "User already exists" });
    }
    //creating user

    user = await User.create({
      name,
      email,
      password: await hashPassword(password),
      image: req.file.id,
    });
    //generating token for user using JWT
    const authtoken = await user.getAuthToken();
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: `${config.SERVER_URL}/${user.image}`,
    };
    success = true;
    return sendResponse(res, 200, { success, authtoken, data });
  } catch (error) {
    return serverError(error, res);
  }
};

const login = async (req, res) => {
  let success = false;
  //if any error occur show error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, { success, error: errors.array() });
  }
  //destruturing email & password from body
  const { email, password } = req.body;
  try {
    //checking if user's provided email exists in our DB.
    let user = await User.findOne({ email });
    // if email not exist's
    if (!user) {
      return sendResponse(res, 400, {
        success,
        error: "Please login with correct credentials",
      });
    }

    // compareing passwords by the hashed password of DB.
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      return sendResponse(res, 400, {
        success,
        error: [{ msg: "Incorrect Password" }],
      });
    }
    //generating auth token
    const authtoken = await user.getAuthToken();
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: `${config.SERVER_URL}/${user.image}`,
    };
    success = true;
    return sendResponse(res, 200, { success, authtoken, data });
  } catch (error) {
    return serverError(error, res);
  }
};

export { login, register };
