// routes/resources.js
const express = require('express');
const Resource = require('../models/Resource');
const router = express.Router();

// Create a new resource
router.post('/', async (req, res) => {
  const { name, description, owner, location } = req.body;

  try {
    const newResource = new Resource({ name, description, owner, location });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find({ available: true });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
