import { sendResponse, serverError } from "../utils/index.js";
import Products from "../models/Product.js";

export const uploadProduct = async (req, res) => {
  let success = false;
  try {
    const images = req.files.map(({ id }) => {
      return id;
    });

    success = true;
    sendResponse(res, 200, { success, images });
  } catch (error) {
    return serverError(error, res);
  }
};
