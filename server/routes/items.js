// Express Route to GET all Items - Tier 1 #3

const router = require('express').Router();
const { Item } = require("../models");
// Sequelize

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

// router.use(bodyParser.json());

// POST request to add items
router.post('/addItem', async (req, res) => {
  const newItem = await Item.create(req.body);
  console.log('New item recieved:', newItem);
  // res.status(200).json({ message: 'Item added successfully' });
  res.json(newItem);
});

module.exports = router;