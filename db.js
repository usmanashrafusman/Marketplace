import mongoose from "mongoose";
const { connect } = mongoose;
// connecting to Mongo
const connetToMongo = () => {
  connect("mongodb://127.0.0.1:27017/myDB", () => {
    console.log("Connected To Mongo Sucessfully");
  });
};

export default connetToMongo;
