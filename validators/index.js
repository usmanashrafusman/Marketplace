import { validationResult } from "express-validator";

const errorChecker = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
};

export default errorChecker;
