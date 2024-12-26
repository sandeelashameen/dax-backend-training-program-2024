import { z } from 'zod';

const paramsSchema = z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId format"),
});

export { paramsSchema };
