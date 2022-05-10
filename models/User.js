import mongoose from "mongoose";
const { Schema, model } = mongoose;
import config from "../config/index.js";
import jwt from "jsonwebtoken";
// createing a schema to add user data in db

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Schema.Types.ObjectId,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

//method to generate JWT Token to authenticate user
UserSchema.methods.getAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, config.SECRECT_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const User = model("user", UserSchema);
export default User;
