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

//GET /store/orders/:id
router.get('/orders/:id', storeController.StoreOrders)

//GET /store/login
router.get('/login', Auth, storeController.Login)

//POST /store
router.post('/', Auth, storeController.NewStore)

//POST /store/confirmAccount/:email
router.post('/confirmAccount/:email', Auth, storeController.ConfirmAccount)

//POST /store/editStore
router.post('/editStore', Auth , SAuth, storeController.NewUpdateStore)

//POST /store/updateOrder/:id
router.post('/updateOrderState/:id', storeController.NewOrderState)







module.exports = router;
