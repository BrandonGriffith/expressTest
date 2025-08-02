import express from 'express';
import data from '../data/data.js'; // Import the data

// Create a new router instance
const router = express.Router();

// Define a route to get all data or a limited number of items example: /api?limit=5
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit < data.length && limit > 0) {
        return res.json(data.slice(0, limit));
    }
    res.json(data);
});

// Define a route to get a specific user by ID example: /api/1
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = data.find((x) => x.id === id);
    if (user) res.json(user)
    else res.status(404).json({error: 'error'});
});

// Define a route to create a new user
router.post('/', (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    };
    const newPost = {
        id: data.length + 1,
        name: req.body.name
    };
    data.push(newPost);
    res.status(201).json(data);
});

// Define a route to update a user by ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = data.find((x) => x.id === id);
    if (user && req.body && req.body.name) {
        user.name = req.body.name;
        return res.json(user);
    };
    res.status(404).json({error: 'error'});
});

// Define a route to delete a user by ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((x) => x.id === id);
    if (index !== -1) {
        data.splice(index, 1); // Modify the array in place
        return res.json(data);
    };
    res.status(404).json({ error: 'error' });
});

export default router;