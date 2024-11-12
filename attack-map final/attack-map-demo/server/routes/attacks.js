const express = require('express');
const Attack = require('../models/Attack');
const router = express.Router();

// Get all attacks
router.get('/', async (req, res) => {
  const attacks = await Attack.find();
  res.json(attacks);
});

// Get attacks by filter (e.g., severity, type)
router.get('/filter', async (req, res) => {
  const filters = req.query;
  const attacks = await Attack.find(filters);
  res.json(attacks);
});

module.exports = router;
