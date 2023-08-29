const router = require('express').Router();
const { Item } = require("../models");
const { Op } = require('sequelize');

// GET / items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll(); // Fetch items from database
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get('/filter', async (req, res, next) => {
  console.log('filter');
  try {
    const { criteria, query } = req.query;

    const items = await Item.findAll({
      where: {
        [criteria]: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.json(items);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    next(error)
  }
});


// POST request to add items
router.post('/addItem', async (req, res) => {
  const newItem = await Item.create(req.body);
  console.log('New item recieved:', newItem);
  res.json(newItem);
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
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy(req.body)
      res.send("Item deleted")
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;
