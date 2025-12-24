import { body, validationResult } from "express-validator";
export const validate = (rules) => async (req, res, next) => {
    for (const rule of rules)
        await rule.run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
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
//# sourceMappingURL=validators.js.map