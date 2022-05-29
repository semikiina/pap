const express = require('express');
const router = express.Router();
const Order = require('../controllers/order')
const Auth = require('../middleware/token');

//POST /order/stock
router.get('/stock', Auth, Order.VerifyStock)

//GET /order/:email
router.get('/:email', Auth, Order.GetOrder)

//POST /order
router.post('/', Auth, Order.Checkout)



module.exports = router;
