const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/user')
const Product = require('../controllers/product')
const SAuth = require('../middleware/storetoken');

//GET /product
router.get('/', Product.GetProducts)

//GET /product/:id
router.get('/:id', Product.GetTheProduct)

//POST /product
router.post('/', Product.NewProduct)

//POST /product/upd/:id
router.post('/upd/:id', Product.UpdateProduct)


module.exports = router;

