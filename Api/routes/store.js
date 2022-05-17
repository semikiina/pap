const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const storeController = require('../controllers/store');
const Store = require('../models/store');
const Auth = require('../middleware/token');
const SAuth = require('../middleware/storetoken');

//GET /store
router.get('/', storeController.GetStores)

//GET /store/:id
router.get('/profile', Auth, SAuth, storeController.GetTheStore)

//GET /store/products
router.get('/products', Auth, SAuth, storeController.GetProductsByStore)

//GET /store/orders
router.get('/orders', Auth, SAuth, storeController.StoreOrders)

//GET /store/login/:id
router.get('/login/:id', Auth, storeController.Login)

//POST /store
router.post('/', Auth, storeController.NewStore)

//POST /store/confirmAccount/:email
router.post('/confirmAccount/:email', Auth, storeController.ConfirmAccount)

//POST /store/editStore
router.post('/editStore', Auth , SAuth, storeController.NewUpdateStore)

//POST /store/updateOrder/:id
router.post('/updateOrderState/:id', storeController.NewOrderState)







module.exports = router;
