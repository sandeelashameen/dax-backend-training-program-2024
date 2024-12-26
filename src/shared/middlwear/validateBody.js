import { ZodError } from "zod";

/**
 * Middleware for validating the request body using a Zod schema.
 * @param {ZodSchema} schema - The Zod schema to validate the request body against.
 * @returns Middleware function for Express.
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.errors.map((error) => ({
          path: error.path.join("."),
          message: error.message,
        }));
        res.status(400).json({
          status: "error",
          error: "Validation Error",
          details: formattedErrors,
        });
      } else {
        next(err);
      }
    }
  };
};

export default validateBody;
