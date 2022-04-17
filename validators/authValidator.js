import { body } from "express-validator";

const signUpValidator = [
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("password", "Password must be atlest 5 characters").isLength({
    min: 5,
  }),
  body("email", "Enter a valid email").isEmail(),
];

const loginValidator = [
  body("password", "Incorrect Password").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
];

export { signUpValidator, loginValidator };
