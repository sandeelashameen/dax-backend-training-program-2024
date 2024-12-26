import { ZodError } from 'zod';

/**
 * Middleware for validating the route parameters using a Zod schema.
 * @param {ZodSchema} schema - The Zod schema to validate the route parameters against.
 * @returns Middleware function for Express.
 */
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            // Validate the route parameters
            schema.parse(req.params);
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            // Handle validation errors
            if (err instanceof ZodError) {
                // Format Zod validation errors
                const formattedErrors = err.errors.map((error) => ({
                    path: error.path.join('.'),
                    message: error.message,
                }));

                res.status(400).json({
                    status: 'error',
                    error: 'Validation Error',
                    details: formattedErrors,
                });
            } else {
                // Handle non-validation errors
                next(err);
            }
        }
    };
};

export default validateParams;
