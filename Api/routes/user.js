const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user');
const Auth = require('../middleware/token');

const User = require('../models/user');

//POST /user
//EDITAR A VALIDAÇÃO!!!
router.post('/', [
    //Check if email already exists
    body('email').isEmail().withMessage('Enter a valid email.').custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(userF => {
                    if (userF) {
                        return Promise.reject('Email Already exists!')
                    }
                })
        }).normalizeEmail(),
    //Check if nickname already exists
    body('nickname').trim().custom((value, { req }) => {
            return User.findOne({ nickname: value }).then(userF => {
                if (userF) {
                    return Promise.reject('Nickname Already exists!')
                }
            })
        }),
],
    userController.NewUser);



//GET /user
router.get('/', userController.GetUsers);

//GET /user/profile
router.get('/profile', Auth, userController.Profile);

//GET /user/orders
router.get('/orders', Auth, userController.UserOrders);

//GET /user/confirmAccount
router.get('/confirmAccount/:nickname/:token', userController.ConfirmAccount);

//POST /user/login
router.post('/login', userController.Login);

//POST /user/editProfile
router.post('/editProfile', Auth, userController.EditProfile);

//POST /user/addAddress
router.post('/addAddress', Auth, userController.AddAddress);

//POST /user/cart
router.post('/cart', Auth, userController.Cart);

//POST /user/cart/:id
router.post('/removeq/:id', Auth, userController.RemoveProductQuantity);

//POST /user/fav/:id
router.post('/fav/:id', Auth, userController.Favorite);

//DELETE /user/cart/:productId
router.delete('/cart/:productId', Auth, userController.DeleteCart);

//DELETE /user/deleteAddress/:addressId
router.delete('/deleteAddress/:addressId', Auth, userController.DeleteAddress);

module.exports = router;