import AppError from "../utils/appError.js";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log(result);
  if (!result.success) {
    const issue = result.error.issues[0];
    const message = issue ? `${issue.path[0]}: ${issue.message}` : "Validation failed";
    return next(new AppError(message, 422));
  }
  next();
};

export default validate;
