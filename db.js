import mongoose from "mongoose";
const { connect } = mongoose;
// connecting to Mongo
const connetToMongo = () => {
  connect(
    "mongodb+srv://usman:aaa123+++@cluster0.w9dqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    () => {
      console.log("Connected To Mongo Sucessfully");
    }
  );
};

export default connetToMongo;
