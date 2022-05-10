import { hash } from "bcrypt";

// Server Error Response
export const serverError = (error, res) => {
  console.error(error);
  return res.status(500).send({ error: "Server Error" });
};

//Not Authorized Response
export const notAuthorized = (res, error) => {
  return res.status(401).send({ error: error ? error : "Not Authorized" });
};

//Bad Request Response
export const badRequest = (res, data) => {
  return res.status(400).send(data ? data : { error: "Something Went Wrong" });
};

//Send Reponse Function
export const sendResponse = (res, status, data) => {
  return res.status(status).send(data);
};

// Passoword Hasher
export const hashPassword = async (password) => {
  const hashed = await hash(password, 12);
  return hashed;
};

//User Placeholder Image
export const userImage = (image) => {
  if (image) {
    return image.id;
  }
  return "62724fd9480717bec70c3d34";
};
