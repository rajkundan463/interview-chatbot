import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (rules: any[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (const rule of rules) await rule.run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors.array());
  next();
};

export const loginValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const signupValidator = [
  body("name").notEmpty(),
  ...loginValidator,
];
