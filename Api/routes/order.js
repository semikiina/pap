const express = require('express');
const router = express.Router();
const Order = require('../controllers/order')
const Auth = require('../middleware/token');


//GET /order/:email
router.get('/:email', Auth, Order.GetOrder)

//POST /order
router.post('/', Auth, Order.Checkout)

//POST /order/stock
router.post('/stock', Auth, Order.VerifyStock)

module.exports = router;
