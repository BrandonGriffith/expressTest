// const express = require('express');
// const mongoose = require('mongoose');
// const route = require('./routes/route');
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import homeRouter from './routes/home.js';
import apiRouter from './routes/api.js';
import logger from './middleware/logger.js';


// require('dotenv').config();
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;

// Connect to MongoDB using the URI from the environment variable
mongoose.connect(
  process.env.MONGODB_URI
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware to log requests
app.use(logger);

// Use the router for all routes starting with '/'
app.use('/', homeRouter);

// Use the API router for all routes starting with '/api'
app.use('/api', apiRouter);

// Catch-all route for 404 errors
app.use((req, res) => {
  // res.status(404).send('404 - Page Not Found');
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});