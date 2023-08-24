// Express Route to GET all Items - Tier 1 #3

const router = require('express').Router();
const { Item } = require('./routes'); // Sequelize

// GET / items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll(); // Fetch items from database
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});