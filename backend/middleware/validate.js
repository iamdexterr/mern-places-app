import AppError from "../utils/appError.js";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log(result);
  if (!result.success) {
    return next(new AppError(result.error.message, 422));
  }
  next();
};

export default validate;
