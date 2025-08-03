import express from 'express';
import data from '../data/data.js'; // Import the data

// Create a new router instance
const router = express.Router();

// Define a route to get all data or a limited number of items example: /api?limit=5
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit < data.length && limit > 0) {
        return res.json(data.slice(0, limit));
    };
    res.json(data);
});

// Define a route to get a specific user by ID example: /api/1
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = data.find((x) => x.id === id);
    const error = Object.assign(new Error(`no user with id ${id} found`), { status: 404 });
    // error.status = 404;
    user ? res.json(user): next(error);
});

// Define a route to create a new user
router.post('/', (req, res, next) => {
    if (!req.body || !req.body.name) {
        const error = Object.assign(new Error(`name is required`), { status: 400 });
        return next(error);
    };
    const newPost = {
        id: data.count,
        name: req.body.name
    };
    data.count += 1;
    data.push(newPost);
    res.status(201).json(data);
});

// Define a route to update a user by ID
router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = data.find((userData) => userData.id === id);
    if (user && req.body && req.body.name) {
        user.name = req.body.name;
        return res.json(user);
    };
    const error = Object.assign(new Error(`missing data or user ${id} not found`), { status: 404 });
    next(error);
});

// Define a route to delete a user by ID
router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((userData) => userData.id === id);
    if (index !== -1) {
        data.splice(index, 1); // Modify the array in place
        return res.json(data);
    };
    const error = Object.assign(new Error(`missing data or user ${id} not found`), { status: 404 });
    next(error);
});

export default router;