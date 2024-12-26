import express from 'express';
import BlogController from './blog.controller.js';
import validateBody from '../../shared/middleware/validateBody.js';
import { createBlogSchema } from './schema/create-blog.validator.js';
import validateParams from '../../shared/middleware/validateParams.js';
import { paramsSchema } from './schema/blog-params.validator.js';

const router = express.Router();

// Create a blog
router.post('/', validateBody(createBlogSchema), BlogController.createBlog);

// Get all blogs
router.get('/', BlogController.getAllBlogs);

// Get a single blog by ID
router.get('/:id', validateParams(paramsSchema), BlogController.getBlogById);

// Update a blog by ID
router.put('/:id', validateParams(paramsSchema), BlogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', validateParams(paramsSchema), BlogController.deleteBlog);

export default router;
