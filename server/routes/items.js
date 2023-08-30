// Express Route to GET all Items - Tier 1 #3

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
  try {
    const newItem = await Item.create(req.body);
    console.log('New item recieved:', newItem);
    res.json(newItem);
  } catch (error) {
    next(error)
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



// const router = require('express').Router();
// const { Item } = require("../models");
// const { validationResult } = require('express-validator');

// // GET - items
// router.get('/', async (req, res, next) => {
//   try {
//     const items = await Item.findAll(); // Fetch items from database
//     res.json(items);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     const item = await Item.findByPk(req.params.id);
//     if (item) {
//       res.json(item);
//     } else {
//       res.status(404).send('Item not found');
//     }
//   } catch (error) {
//     next(error)
//   }
// });

// // POST - request to add items
// router.post('/addItem', [
//   check('name').notEmpty(),
//   check('image').notEmpty().isURL(),
//   check('description').notEmpty(),
//   check('price').notEmpty().isFloat({ min: 0 }),
//   check('category').notEmpty(),
// ], async (req, res, next) => {
//   const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const newItem = await Item.create(req.body);
//       console.log('New item received:', newItem);
//       res.json(newItem);
//     } catch (error) {
//       next(error)
//     }
// });

// // PUT
// router.put('/:id', [
//   check('name').notEmpty(),
//   check('image').notEmpty().isURL(),
//   check('description').notEmpty(),
//   check('price').notEmpty().isFloat({ min: 0 }),
//   check('category').notEmpty(),
// ], async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const item = await Item.findByPk(req.params.id);
//     if (item) {
//       await item.update(req.body);
//       res.send(item);
//     } else {
//       res.status(404).send('Item not found');
//     }
//   } catch (error) {
//     next(error)
//   }
// });

// // DELETE
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const item = await Item.findByPk(req.params.id);
//     if (item) {
//       await item.destroy(req.body)
//       res.send("Item deleted")
//     } else {
//       res.status(404).send('Item not found');
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// module.exports = router;