import { hash, compare } from "bcrypt";

// Error Utils
export const serverError = (error, res) => {
  console.error(error);
  return res.status(500).send({ error: "Server Error" });
};

export const notAuthorized = (res) => {
  return res.status(401).send({ error: "Not Authorized" });
};

export const badRequest = (res, data) => {
  return res.status(400).send(data ? data : { error: "Something Went Wrong" });
};

export const sendResponse = (res, status, data) => {
  return res.status(status).send(data);
};

// Passoword Hasher
export const hashPassword = async (password) => {
  const hashed = await hash(password, 12);
  return hashed;
};

// Password Compare
export const comparePassword = async (password, hashedPassword) => {
  const passwordCompare = await compare(password, hashedPassword);
  if (!passwordCompare) {
    return sendResponse(res, 400, {
      success,
      errors: [{ msg: "Incorrect Password" }],
    });
  }
};

export const userImage = (image) => {
  if (image) {
    return image.id;
  }
  return "62724fd9480717bec70c3d34";
};
