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
let gridfsBucket;

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
    if (!file) {
      return (res.file.id = "N/A");
    }
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

export const getRequestedImage = (req, res) => {
  const { id } = req.params;
  const _id = mongoose.Types.ObjectId(id);
  gridfsBucket.find({ _id }).toArray((err, file) => {
    if (file.length === 0) {
      return res.status(404).json({
        err: "No File Exist",
      });
    }

    if (
      //checking contentType
      file[0].contentType === "image/jpeg" ||
      file[0].contentType === "img/png" ||
      file[0].contentType === "image/png"
    ) {
      //showing image
      const readstream = gridfsBucket.openDownloadStream(file[0]._id);
      readstream.pipe(res);
    } else {
      return res.status(404).json({
        err: "Not an image",
      });
    }
  });
};

const upload = multer({ storage });
export default upload;
