const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');

//GET /store
router.get('/', feedController.GetAll)

// //GET /store/:id
router.get('/:id' , feedController.GetTheProduct)

// //GET /store/:id
// router.get('/profile' , feedController.GetTheStore)


// //GET /store/login
// router.get('/login' , feedController.Login)


module.exports = router;