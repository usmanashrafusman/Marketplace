import { Router } from "express";
const router = Router();
import mongoose from "mongoose";
import { gridfsBucket } from "../middlewares/uploadImage";

const getRequestedImage = (req, res) => {
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
      file[0].contentType === "img/png"
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

//retriving image from DB
router.get("/", (req, res) => {
  res.send("Hello From Images Route");
});

//retriving image from DB
router.get("/:id", getRequestedImage);
