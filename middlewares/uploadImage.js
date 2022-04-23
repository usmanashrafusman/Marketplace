import mongoose from "mongoose";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import config from "../config/index.js";
//conneting to mongoDB
const conn = mongoose.createConnection(config.MONGOURI, () => {
  console.log("Grid FS Connected");
});
export let gridfsBucket;

//initilizing gridfsBucket
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

//making gridFsStorage
const storage = new GridFsStorage({
  url: config.MONGOURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      //generating random string
      crypto.randomBytes(16, (err, buff) => {
        if (err) {
          return reject(err);
        }
        //giving unique filenamem with extension
        const filename = buff.toString("hex") + path.extname(file.originalname);
        const fileinfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileinfo);
      });
    });
  },
});

const upload = multer({ storage });
export default upload;
