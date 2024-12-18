// routes/api/user-routes.js
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// GET /users - Get all users (protected)
router.get('/', authenticateToken, getAllUsers);

// GET /users/:id - Get a user by id (protected)
router.get('/:id', authenticateToken, getUserById);

// POST /users - Create a new user (not protected)
router.post('/', createUser);

// PUT /users/:id - Update a user by id (protected)
router.put('/:id', authenticateToken, updateUser);

// DELETE /users/:id - Delete a user by id (protected)
router.delete('/:id', authenticateToken, deleteUser);

export { router as userRouter };
