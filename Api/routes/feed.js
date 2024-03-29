const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');

//GET /store
router.get('/', feedController.GetAll)

//GET /store
router.get('/users', feedController.GetAllUsers)

//GET /pricesRange
router.get('/pricesRange' , feedController.GetPricesRange)

//GET /similarStoreProducts
router.get('/stores' , feedController.GetAllStores)

//GET /newStores
router.get('/newStores' , feedController.LastWeekStores)

//GET /similarStoreProducts
router.get('/similarProducts/:strid/:prid' , feedController.SimilarProducts)



//GET /featuredProducts
router.get('/featuredProducts' , feedController.FeaturedProducts)

//GET /store/:id
router.get('/store/:id' , feedController.GetTheStore)

// //GET /store/:id
router.get('/product/:id' , feedController.GetTheProduct)






// //GET /store/login
// router.get('/login' , feedController.Login)


module.exports = router;