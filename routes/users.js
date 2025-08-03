import express from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser} from '../controllers/usersController.js';

// Create a new router instance
const router = express.Router();

// Define a route to get all data or a limited number of items example: /api?limit=5
router.get('/', getUsers);

// Define a route to get a specific user by ID example: /api/1
router.get('/:id', getUser);

// Define a route to create a new user
router.post('/', postUser);

// Define a route to update a user by ID
router.put('/:id', putUser);

// Define a route to delete a user by ID
router.delete('/:id', deleteUser);

export default router;