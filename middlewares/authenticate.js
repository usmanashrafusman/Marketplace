import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { notAuthorized } from "../utils/index.js";
import User from "../models/User.js";

// middleware to get logged in user data
const authenticate = async (req, res, next) => {
  //getting JWT token from header
  const token = req.header("authorization-token");
  if (!token) {
    //if token is not received
    return notAuthorized(res, "Invalid Token");
  }
  try {
    //verifying token with secrect key
    const { _id } = jwt.verify(token, config.SECRECT_KEY);
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (error) {
    //on catch showing error
    return notAuthorized(res, "Invalid Token");
  }
};

export default authenticate;
