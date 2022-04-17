import mongoose from "mongoose";
import config from "./config/index.js";
const { connect } = mongoose;
// connecting to Mongo
const connetToMongo = () => {
  connect(config.MONGOURI, () => {
    console.log("Connected To Mongo Sucessfully");
  });
};

export default connetToMongo;
