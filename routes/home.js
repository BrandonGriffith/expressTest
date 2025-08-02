// const express = require('express');
// const router = express.Router();
// const path = require('path');
import express from 'express';
import path from 'path';
import __dirname from '../util/dirname.js'; // Import the dirname utility

// Create a new router instance
const router = express.Router();

// Serve static files from the "public" directory
router.use(express.static(path.join(__dirname, '../public')));

// Define a route for the homepage
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// module.exports = router;
export default router;