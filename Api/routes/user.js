const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user');
const Auth = require('../middleware/token');

const User = require('../models/user');

//GET /user
router.get('/', userController.GetUsers);

//POST /user
//EDITAR A VALIDAÇÃO!!!
router.post('/', [
    //Check if email already exists
    body('email')
        .isEmail()
        .withMessage('Enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(userF => {
                    if (userF) {
                        return Promise.reject('Email Already exists!')
                    }
                })
        })
        .normalizeEmail(),
    //Check if nickname already exists
    body('nickname')
        .trim()
        .custom((value, { req }) => {
            return User.findOne({ nickname: value }).then(userF => {
                if (userF) {
                    return Promise.reject('Nickname Already exists!')
                }
            })
        }),
],
    userController.NewUser);

//GET /user/profile
router.get('/profile', Auth, userController.Profile);

//POST /user/login
router.post('/login', userController.Login);

//PUT /user/profile
router.post('/profile', Auth, userController.EditProfile);

//POST /user/cart
router.post('/cart', Auth, userController.Cart);

//POST /user/fav/:id
router.post('/fav/:id', Auth, userController.Favorite);




//
//TESTES
//

//GET /user/:id
router.get('/:id', userController.GetUserById);

//GET /user/:id
router.post('/ncart', userController.NewCart);

//GET /user/:id
router.delete('/cart/:userid/:productid', userController.DeleteCart);



module.exports = router;