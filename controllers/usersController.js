import data from '../data/data.js'; // Import the data

// Get all users or a limited number of users
export const getUsers = (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit < data.length && limit > 0) {
        return res.json(data.slice(0, limit));
    };
    res.json(data);
};

// Get a single user by ID
export const getUser = (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = data.find((x) => x.id === id);
    const error = Object.assign(new Error(`no user with id ${id} found`), { status: 404 });
    // error.status = 404;
    user ? res.json(user): next(error);
};

// Create a new user
export const postUser = (req, res, next) => {
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
};

// Update an existing user
export const putUser = (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = data.find((userData) => userData.id === id);
    if (user && req.body && req.body.name) {
        user.name = req.body.name;
        return res.json(user);
    };
    const error = Object.assign(new Error(`missing data or user ${id} not found`), { status: 404 });
    next(error);
};

// Delete a user
export const deleteUser = (req, res, next) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((userData) => userData.id === id);
    if (index !== -1) {
        data.splice(index, 1); // Modify the array in place
        return res.json(data);
    };
    const error = Object.assign(new Error(`missing data or user ${id} not found`), { status: 404 });
    next(error);
};