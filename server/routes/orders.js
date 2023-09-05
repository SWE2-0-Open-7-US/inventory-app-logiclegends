const router = require('express').Router();
const { User, Order } = require('../models');

router.post('/', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const cartItems = req.body.cartItems; 

        const newOrder = await Order.create({ });
        const user = await User.findByPk(userId)

        await user.addOrder(newOrder)
        await newOrder.addItems(cartItems);

        res.json(newOrder.id);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
