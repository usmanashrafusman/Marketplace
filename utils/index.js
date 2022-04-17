import { hash, compare } from "bcrypt";

// Error Utils
export const serverError = (error, res) => {
  console.error(error);
  return res.status(500).send("Internal Server Error");
};

export const notAuthorized = (res) => {
  return res.status(401).send("Not Authorized");
};

export const badRequest = (res, msg) => {
  return res.status(400).send(msg);
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
