// Express Route to GET all Items - Tier 1 #3

const router = require('express').Router();
const { Item } = require("../models");

// GET / items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll(); // Fetch items from database
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






router.put('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.update(req.body)
      res.send(item)
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error('Error updating item:', error);
    next(error)
  }
})

module.exports = router;