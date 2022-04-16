import { validationResult } from "express-validator";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import config from "../config/index.js";

const register = async (req, res) => {
  let success = false;
  //if any error occur show error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    //check if your with same email exists
    let user = await findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success, errors: [{ msg: "Email Already Exists" }] });
    }
    //hasing the user's given password then sending data go MongoDB
    let password = await hash(req.body.password, 12);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password,
    });

    const newUser = {
      user: {
        id: user.id,
      },
    };
    //generating token for user using JWT
    const authtoken = jwt.sign(newUser, config.SECRECT_KEY);
    success = true;
    res.json({ success, authtoken });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("An Error Occur");
  }
};

const login = async (req, res) => {
  let success = false;
  //if any error occur show error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //destruturing email & password from body
  const { email, password } = req.body;
  try {
    //checking if user's provided email exists in our DB.
    let user = await User.findOne({ email });
    // if email not exist's
    if (!user) {
      return res.status(400).json({
        success,
        errors: [{ msg: "Please login with correct credentials" }],
      });
    }

    //compareing passwords by the hashed password of DB.
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        success,
        errors: [{ msg: "Please login with correct credentials" }],
      });
    }

    const newUser = {
      user: {
        id: user.id,
      },
    };

    //generating auth token
    const authtoken = jwt.sign(newUser, config.SECRECT_KEY);
    success = true;
    res.json({ success, authtoken, user });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("An Error Occur");
  }
};

export { login, register };
