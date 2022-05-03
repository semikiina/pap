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

//POST /store
router.post('/', Auth, [
    //Check if store email already exists
    body('store_email')
        .isEmail()
        .withMessage('Valid email please!')
        .custom((value, { req }) => {
            return Store.findOne({ store_email: value })
                .then(storeF => {
                    if (storeF) {
                        return Promise.reject('Email Already exists!')
                    }
                })
        })
        .normalizeEmail()
], storeController.NewStore)

//GET /store/login
router.get('/login', Auth, storeController.Login)

//PUT /store/:id
router.put('/:id', Auth, SAuth, [
    //Check if store exists
    body('id')
        .trim()
        .custom((value, { req }) => {
            return Store.findOne({ _id: value }).then(storeF => {
                if (!storeF) {
                    return Promise.reject("id store doesn't exist!")
                }
            })
        })
], storeController.UpdateStore)

//GET /store/:id
router.get('/:id', storeController.GetTheStoreNew)




//POST /store/editStore/:id
router.post('/editStore/:id', storeController.NewUpdateStore)


module.exports = router;
